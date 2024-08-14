import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContactForEdit, removeContact } from './store/actions/contactsSlice';
import ContactItem from './ContactItem';
import axiosInstance from '../axiosInstance';
import './ContactList.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);

  const handleEdit = (contact) => {
    dispatch(setContactForEdit(contact));
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      dispatch(removeContact(id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className='list-container'>
      <div className='item-container'>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
            onSelect={handleEdit}
          />
        ))}
      </div>
      <button id='new' onClick={() => dispatch(setContactForEdit({ firstName: '', lastName: '', email: '', phone: '' }))}>New</button>
    </div>
  );
};

export default ContactList;
