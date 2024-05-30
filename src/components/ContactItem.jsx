import React from 'react';
import './ContactItem.css';

const ContactItem = ({ contact, onSelect, onDelete }) => {
  const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();

  const handleDelete = async () => {
    console.log('Deleting contact with ID:', contact.id);
    onDelete(contact.id);
  };

  return (
    <div className="contact-item" onDoubleClick={() => onSelect(contact)}>
      <input type="text" value={fullName} readOnly />
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default ContactItem;
