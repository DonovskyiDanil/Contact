import React from 'react';
import ContactItem from './ContactItem';
import './ContactList.css';

const ContactList = ({ contacts, onDelete, onEditContact, onAddContact }) => {
  return (
    <div className='list-container'>
      <div className='item-container'>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={onDelete}
            onSelect={onEditContact}
          />
        ))}
      </div>
      <button id='new' onClick={onAddContact}>New</button>
    </div>
  );
};

export default ContactList;
