import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { FiPhone, FiMoon, FiSun } from "react-icons/fi";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedContacts) {
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    const isDuplicate = contacts.some(
      (c) => c.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage("Contact name already exists.");
      return;
    } else {
      setErrorMessage("");
    }

    if (editContact) {
      setContacts(contacts.map((c) => (c.id === editContact.id ? contact : c)));
      setEditContact(null);
    } else {
      setContacts([...contacts, { ...contact, id: Date.now(), reviews: [] }]);
    }
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setErrorMessage("");
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleMultiDelete = () => {
    setContacts(
      contacts.filter((contact) => !selectedIds.includes(contact.id))
    );
    setSelectedIds([]);
  };

  const addReview = (id, review) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, reviews: [...contact.reviews, review] }
          : contact
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  const toggleSelect = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "email") return a.email.localeCompare(b.email);
      return a.phone.localeCompare(b.phone);
    });

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div className={`App container mx-auto p-4 ${darkMode ? "dark" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center cursor-pointer">
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

      <input
        type="text"
        placeholder="Search Contacts..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border rounded p-2 mb-4 w-full"
      />

      <button
        onClick={resetSearch}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4 m-2"
      >
        Reset Search
      </button>

      <select
        onChange={handleSortChange}
        value={sortBy}
        className="mb-4 border rounded p-2"
      >
        <option value="name">Sort by Name</option>
        <option value="email">Sort by Email</option>
        <option value="phone">Sort by Phone</option>
      </select>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <ContactForm addContact={addContact} editContact={editContact} />

      <ContactList
        contacts={currentContacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        onSelect={toggleSelect}
        addReview={addReview}
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={handleMultiDelete}
          disabled={selectedIds.length === 0}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Delete Selected
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
