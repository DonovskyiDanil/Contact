import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsRequest, fetchContactsSuccess, fetchContactsFailure, setContactForEdit, clearEditContact, addContact, updateContact, removeContact } from './redux/actions';
import axiosInstance from './axiosInstance';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const contactForEdit = useSelector((state) => state.contactForEdit);

  useEffect(() => {
    const fetchContacts = async () => {
      dispatch(fetchContactsRequest());
      try {
        const response = await axiosInstance.get('/contacts');
        dispatch(fetchContactsSuccess(response.data));
      } catch (error) {
        dispatch(fetchContactsFailure(error));
      }
    };

    fetchContacts();
  }, [dispatch]);

  const saveContact = async (contact) => {
    try {
      if (contact.id) {
        const response = await axiosInstance.put(`/contacts/${contact.id}`, contact);
        dispatch(updateContact(response.data));
      } else {
        const response = await axiosInstance.post('/contacts', contact);
        dispatch(addContact(response.data));
      }
      dispatch(clearEditContact());
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      dispatch(removeContact(id));
      if (contactForEdit && contactForEdit.id === id) {
        dispatch(clearEditContact());
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const addNewContact = () => {
    dispatch(setContactForEdit({ firstName: '', lastName: '', email: '', phone: '' }));
  };

  const editContact = (contact) => {
    dispatch(setContactForEdit(contact));
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
          <ContactForm onSave={saveContact} /> {/* Example where saveContact is used */}
        </div>
      </div>
    </div>
  );
};

export default App;
