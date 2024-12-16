import React from "react";
import ContactCard from "./ContactCard";

const ContactList = ({
  contacts,
  onEdit,
  onDelete,
  selectedIds,
  onSelect,
  addReview,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded">
      {contacts.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">
          No contacts found. Add a contact to get started.
        </p>
      ) : (
        contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={() => onEdit(contact)}
            onDelete={() => onDelete(contact.id)}
            isSelected={selectedIds.includes(contact.id)}
            onSelect={onSelect}
            addReview={addReview}
          />
        ))
      )}
    </div>
  );
};

export default ContactList;
