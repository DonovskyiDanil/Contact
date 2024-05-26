import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import axiosInstance from './axiosInstance';
import { nanoid } from 'nanoid';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactForEdit, setContactForEdit] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:4000/contacts');
        console.log('Initial load of contacts:', response.data);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const selectContact = (contact) => {
    setContactForEdit(contact);
  };

  const saveContact = async (contact) => {
    try {
      if (contact.id) {
        await updateContact(contact);
      } else {
        await createContact(contact);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const createContact = async (contact) => {
    try {
      const id = nanoid();
      const response = await axiosInstance.post('http://localhost:4000/contacts', { ...contact, id });
      console.log('Contact created:', response.data);
      setContacts(prevContacts => [...prevContacts, response.data]);
      setContactForEdit(null);
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  const updateContact = async (contact) => {
    try {
      const response = await axiosInstance.put(`http://localhost:4000/contacts/${contact.id}`, contact);
      console.log('Contact updated:', response.data);
      setContacts(prevContacts =>
        prevContacts.map(item => (item.id === contact.id ? response.data : item))
      );
      setContactForEdit(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    console.log('Deleting contact with ID:', id);
    if (!id) {
      console.error('Error: Contact ID is missing');
      return;
    }

    try {
      await axiosInstance.delete(`http://localhost:4000/contacts/${id}`);
      console.log('Contact deleted with ID:', id);
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
      setContactForEdit(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const clearForm = () => {
    setContactForEdit(null);
  };

  const addNewContact = () => {
    setContactForEdit({ id: '', firstName: '', lastName: '', email: '', phone: '' });
  };

  return (
    <div className='outer-container'>
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
            key={contactForEdit?.id}
            contactForEdit={contactForEdit}
            onSubmit={saveContact}
            onDelete={deleteContact}
            onClearForm={clearForm}
            showDelete={!!contactForEdit?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
