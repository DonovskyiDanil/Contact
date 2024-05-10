import React from 'react';
import './ContactItem.css';

function ContactItem({ contact, onSelect, onDelete }) {
  const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();

  return (
    <div className="contact-item" onDoubleClick={() => onSelect(contact)}>
      <input type="text" value={fullName} readOnly />
      <button onClick={() => onDelete(contact.id)}>X</button>
    </div>
  );
}

export default ContactItem;