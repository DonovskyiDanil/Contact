import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error("Ошибка при получении контактов:", error);
      }
    };

    fetchContacts();
  }, []);

  const addOrUpdateContact = async (contactData) => {
    if (contactData.id) {
      try {
        await axios.put(`http://localhost:3001/contacts/${contactData.id}`, contactData);
      } catch (error) {
        console.error("Ошибка при обновлении контакта:", error);
      }
    } else {
      try {
        await axios.post('http://localhost:3001/contacts', contactData);
      } catch (error) {
        console.error("Ошибка при добавлении контакта:", error);
      }
    }

    const response = await axios.get('http://localhost:3001/contacts');
    setContacts(response.data);
    setCurrentContact(null);
    setFormKey(prevKey => prevKey + 1);
  };


  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
      setCurrentContact(null);
      setFormKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Ошибка при удалении контакта:", error);
    }
  };

  const selectContact = (contact) => {
    setCurrentContact(contact);
    setFormKey(prevKey => prevKey + 1);
  };

  const resetForm = () => {
    setCurrentContact(null);
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div className="contact-list-container">
      <h1>Contact List</h1>
      <div className="contacts-wrapper">
        <div className="contacts-left">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-item" onDoubleClick={() => selectContact(contact)}>
              <input type="text" value={`${contact.firstName} ${contact.lastName}`} readOnly />
              <button onClick={() => deleteContact(contact.id)}>X</button>
            </div>
          ))}
          <button type="button" className="new-button" onClick={resetForm}>New</button>
        </div>
        <div className="contacts-right">
          <ContactForm
            key={formKey}
            currentContact={currentContact}
            onSave={addOrUpdateContact}
            onDelete={deleteContact}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactList;
