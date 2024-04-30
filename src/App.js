import React, { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact() {
    return { id: null, firstName: '', lastName: '', email: '', phone: '' };
  }

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(contacts);
  }, []);

  function saveToStorage(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  function deleteContact(id) {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    saveToStorage(updatedContacts);
  }

  function saveContact(contact) {
    contact.id ? updateContact(contact) : createContact(contact);
  }

  function addNewContact() {
    setContactForEdit(createEmptyContact());
  }

  function selectContact(contact) {
    setContactForEdit(contact);
  }

  function createContact(contact) {
    contact.id = Date.now();
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    saveToStorage(updatedContacts);
    setContactForEdit(createEmptyContact());
  }

  function updateContact(contact) {
    const updatedContacts = contacts.map(item =>
      item.id === contact.id ? contact : item
    );
    setContacts(updatedContacts);
    saveToStorage(updatedContacts);
    setContactForEdit(createEmptyContact());
  }

  return (
    <div className='container'>
      <h1 className='header-app'>Contact List</h1>
      <div className='main'>
        <ContactList
          contacts={contacts}
          onDelete={deleteContact}
          onAddContact={addNewContact}
          onEditContact={selectContact}
        />
        <ContactForm
          key={contactForEdit.id}
          contactForEdit={contactForEdit}
          onSubmit={saveContact}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
