import React from "react";
import { FiUser } from "react-icons/fi";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 mb-4 flex flex-col md:flex-row items-center">
      <FiUser className="text-3xl text-gray-700 dark:text-gray-300 mr-0 md:mr-4 mb-4 md:mb-0" />
      <div className="flex-grow text-center md:text-left mb-4 md:mb-0 text-gray-900 dark:text-gray-300">
        <h2 className="text-xl font-bold mb-2">{contact.name}</h2>
        <p className="mb-2">
          <strong>Email:</strong> {contact.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {contact.phone}
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-start w-full md:w-auto">
        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mb-2 md:mb-0 md:mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
