import React, { useState } from "react";
import { FiUser } from "react-icons/fi";

const ContactCard = ({
  contact,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
  addReview,
}) => {
  const [review, setReview] = useState("");

  const handleAddReview = () => {
    if (review) {
      addReview(contact.id, review);
      setReview("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 mb-4 flex flex-col md:flex-row items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(contact.id)}
        className="mr-2"
      />
      <FiUser className="text-3xl text-gray-700 dark:text-gray-300 mr-0 md:mr-4 mb-4 md:mb-0" />
      <div className="flex-grow text-center md:text-left mb-4 md:mb-0 text-gray-900 dark:text-gray-300">
        <h2 className="text-xl font-bold mb-2">{contact.name}</h2>
        <p className="mb-2">
          <strong>Email:</strong> {contact.email}
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> {contact.phone}
        </p>
        <p className="mb-2">
          <strong>Category:</strong> {contact.category || "Uncategorized"}
        </p>
        <div className="mt-2">
          <strong>Reviews:</strong>
          <ul className="list-disc pl-5">
            {contact.reviews.map((rev, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {rev}
              </li>
            ))}
          </ul>
        </div>
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Add a review"
          className="border rounded p-1 mb-2 w-full"
        />
        <button
          onClick={handleAddReview}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Add Review
        </button>
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
