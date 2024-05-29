import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, removeContact } from './redux/actions';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [contactForEdit, setContactForEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const saveContact = async (contact) => {
    await dispatch(addContact(contact));
    setContactForEdit(null); // Reset form after save
  };

  const deleteContact = async (id) => {
    await dispatch(removeContact(id));
    if (contactForEdit && contactForEdit.id === id) {
      setContactForEdit(null); // Reset form if deleted contact was being edited
    }
  };

  const addNewContact = () => {
    setContactForEdit({ firstName: '', lastName: '', email: '', phone: '' });
  };

  const editContact = (contact) => {
    setContactForEdit(contact);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='outer-container'>
      <div className='container'>
        <h1 className='header-app'>Contact List</h1>
        <div className='main'>
          <ContactList
            contacts={contacts}
            onDelete={deleteContact}
            onAddContact={addNewContact}
            onEditContact={editContact}
          />
          <ContactForm
            contactForEdit={contactForEdit}
            onSubmit={saveContact}
            onDelete={deleteContact}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
