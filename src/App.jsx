import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";
import { FiPhone, FiMoon, FiSun } from "react-icons/fi"; // Import ikon telepon, mode gelap, dan terang

function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State untuk mode gelap
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [errorMessage, setErrorMessage] = useState(""); // State untuk pesan kesalahan

  // Fungsi untuk menambah kontak baru atau mengedit kontak yang ada
  const addContact = (contact) => {
    // Cek apakah nama kontak sudah ada
    const isDuplicate = contacts.some(
      (c) => c.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage("Contact name already exists."); // Set pesan kesalahan
      return;
    } else {
      setErrorMessage(""); // Reset pesan kesalahan
    }

    if (editContact) {
      setContacts(contacts.map((c) => (c.id === editContact.id ? contact : c)));
      setEditContact(null);
    } else {
      setContacts([...contacts, { ...contact, id: Date.now() }]);
    }
  };

  // Fungsi untuk menangani pengeditan kontak
  const handleEdit = (contact) => {
    setEditContact(contact);
    setErrorMessage(""); // Reset pesan kesalahan saat mengedit
  };

  // Fungsi untuk menghapus kontak
  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Fungsi untuk mengubah status mode gelap
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter kontak berdasarkan pencarian
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`App container mx-auto p-4 ${darkMode ? "dark" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-3xl font-bold flex items-center cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <FiPhone className="mr-1" />
          Contact Manager
        </h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      {/* Input Pencarian */}
      <input
        type="text"
        placeholder="Search Contacts..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border rounded p-2 mb-4 w-full"
      />

      {/* Tampilkan pesan kesalahan jika ada */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* Komponen Form Kontak */}
      <ContactForm addContact={addContact} editContact={editContact} />

      {/* Komponen Daftar Kontak */}
      <ContactList
        contacts={filteredContacts} // Menggunakan kontak yang sudah difilter
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
