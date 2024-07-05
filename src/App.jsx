import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";
import { FiPhone } from "react-icons/fi"; // Import ikon telepon
import { FiMoon, FiSun } from "react-icons/fi"; // Import ikon untuk mode gelap dan terang

function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State untuk mode gelap

  // Fungsi untuk menambah kontak baru atau mengedit kontak yang ada
  const addContact = (contact) => {
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

  return (
    <div className={`App container mx-auto p-4 ${darkMode ? "dark" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-3xl font-bold flex items-center"
          onClick={() => window.location.reload()}
        >
          <FiPhone className="mr-1" /> {/* Tambahkan ikon telepon */}
          Contact Manager
        </h1>
        {/* <span className="text-xl font-semibold">Manager</span> */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
      {/* Komponen Form Kontak */}
      <ContactForm addContact={addContact} editContact={editContact} />
      {/* Komponen Daftar Kontak */}
      <ContactList
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
