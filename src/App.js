import React, { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { api } from './Api';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact() {
    return { id: nanoid(5), firstName: '', lastName: '', email: '', phone: '' };
  }

  useEffect(() => {
    const fetchContacts = async () => {
        try {
            const response = await api.get('/');
            console.log('Initial load of contacts:', response.data);  // Логирование начальной загрузки контактов
            setContacts(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };
    fetchContacts();
}, []);


  const deleteContact = async (id) => {
    if (!id) {
      console.error('Ошибка: ID контакта отсутствует');
      return;
    }
    try {
      await api.delete(`/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении контакта:', error);
    }
  };

  const saveContact = (contact) => {
    if (contact.id) {
      updateContact(contact);
    } else {
      createContact(contact);
    }
  };

  const addNewContact = () => {
    setContactForEdit(createEmptyContact());
  };

  const selectContact = (contact) => {
    setContactForEdit(contact);
  };

  const createContact = async (contact) => {
    // Удаляем ключ id для гарантии, что сервер сгенерирует его сам
    const { id, ...contactWithoutId } = contact;
    try {
        const response = await api.post('/', contactWithoutId);
        console.log('Contact created:', response.data);
        setContacts(prevContacts => [...prevContacts, response.data]);
        setContactForEdit(createEmptyContact());
    } catch (error) {
        console.error('Error creating contact:', error);
    }
};



const updateContact = async (contact) => {
  if (!contact.id) {
      console.error('Ошибка: контакт без идентификатора');
      return;
  }
  console.log('Updating contact with ID:', contact.id);  // Логирование ID перед обновлением
  try {
      const response = await api.put(`/${contact.id}`, contact);
      console.log('Update response:', response.data);  // Логирование ответа после обновления
      setContacts(prevContacts =>
          prevContacts.map(item => item.id === contact.id ? response.data : item)
      );
      setContactForEdit(createEmptyContact());
  } catch (error) {
      console.error('Ошибка при обновлении контакта:', error);
  }
};

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
