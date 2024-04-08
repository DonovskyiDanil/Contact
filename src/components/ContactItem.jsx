import React from 'react';
import './ContactItem.css';

function ContactItem({ contact, onSelect, onDelete }) {
  return (
    <div className="contact-item" onDoubleClick={() => onSelect(contact)}>
      <input
        type="text"
        value={`${contact.firstName} ${contact.lastName}`}
        readOnly
      />
      <button onClick={(event) => {
        event.stopPropagation(); 
        onDelete(contact.id);
      }}>X</button>
    </div>
  );
}

export default ContactItem;
