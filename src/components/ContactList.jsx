import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);
  const [currentContact, setCurrentContact] = useState(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    let updatedContacts = [];
    if (currentContact) {
      updatedContacts = contacts.map(c => c.id === contact.id ? contact : c);
    } else {
      const newContact = { ...contact, id: Date.now() };
      updatedContacts = [...contacts, newContact];
    }

    setContacts(updatedContacts);
    setCurrentContact(null);
    setFormKey(formKey + 1);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setCurrentContact(null);
    setFormKey(formKey + 1);
  };

  const selectContact = (contact) => {
    setCurrentContact(contact);
    setFormKey(formKey + 1);
  };

  const resetForm = () => {
    setCurrentContact(null);
    setFormKey(formKey + 1);
  };

  return (
    <div className="contact-list-container">
      <h1>Contact List</h1>
      <div className="contacts-wrapper">
        <div className="contacts-left">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="contact-item"
              onDoubleClick={() => selectContact(contact)} 
            >
              <input
                type="text"
                value={`${contact.firstName} ${contact.lastName}`}
                readOnly
              />
              <button onClick={(event) => {
                event.stopPropagation(); 
                deleteContact(contact.id);
              }}>X</button>
            </div>
          ))}
          <button type="button" className="new-button" onClick={resetForm}>New</button>
        </div>
        <div className="contacts-right">
          <ContactForm
            key={formKey}
            currentContact={currentContact}
            onSave={addContact}
            onDelete={deleteContact}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactList;
