import React, { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { api, apiEndpoint } from './Api';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact() {
    return { id: nanoid(), firstName: '', lastName: '', email: '', phone: '' };
  }

  useEffect(() => {
    api.get(apiEndpoint)
      .then(response => setContacts(response.data))
      .catch(error => console.error('Ошибка при получении данных:', error));
  }, []);

  function deleteContact(id) {
    api.delete(`${apiEndpoint}/${id}`)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch(error => console.error('Ошибка при удалении контакта:', error));
  }

  function saveContact(contact) {
    if (contact.id) {
      updateContact(contact);
    } else {
      createContact(contact);
    }
  }

  function addNewContact() {
    setContactForEdit(createEmptyContact());
  }

  function selectContact(contact) {
    setContactForEdit(contact);
  }

  function createContact(contact) {
    api.post(apiEndpoint, contact)
      .then(response => {
        setContacts([...contacts, response.data]);
        setContactForEdit(createEmptyContact());
      })
      .catch(error => console.error('Ошибка при добавлении контакта:', error));
  }

  function updateContact(contact) {
    api.put(`${apiEndpoint}/${contact.id}`, contact)
      .then(response => {
        const updatedContacts = contacts.map(item =>
          item.id === contact.id ? response.data : item
        );
        setContacts(updatedContacts);
        setContactForEdit(createEmptyContact());
      })
      .catch(error => console.error('Ошибка при обновлении контакта:', error));
  }

  return (
    <div className='container'>
      <h1 className='header-app'>Список контактов</h1>
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
