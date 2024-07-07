import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact, removeContact, clearEditContact } from '../redux/actions';
import './ContactForm.css';
import axiosInstance from '../axiosInstance'; // Поправленный путь к axiosInstance

const ClearButton = ({ onClick }) => (
  <button className="clear" type="button" onClick={onClick}>X</button>
);

const ContactForm = () => {
  const dispatch = useDispatch();
  const contactForEdit = useSelector((state) => state.contactForEdit);
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '' });

  useEffect(() => {
    if (contactForEdit) {
      setContact(contactForEdit);
    } else {
      setContact({ firstName: '', lastName: '', email: '', phone: '' });
    }
  }, [contactForEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleClearField = (fieldName) => {
    setContact({ ...contact, [fieldName]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contact.id) {
        const response = await axiosInstance.put(`/contacts/${contact.id}`, contact);
        dispatch(updateContact(response.data));
      } else {
        const response = await axiosInstance.post('/contacts', contact);
        dispatch(addContact(response.data));
      }
      setContact({ firstName: '', lastName: '', email: '', phone: '' });
      dispatch(clearEditContact());
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (contact.id) {
        await axiosInstance.delete(`/contacts/${contact.id}`);
        dispatch(removeContact(contact.id));
        dispatch(clearEditContact());
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-info">
        <input
          className="text-field"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={contact.firstName}
          onChange={handleChange}
        />
        <ClearButton onClick={() => handleClearField('firstName')} />
      </div>
      <div className="contact-info">
        <input
          className="text-field"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={contact.lastName}
          onChange={handleChange}
        />
        <ClearButton onClick={() => handleClearField('lastName')} />
      </div>
      <div className="contact-info">
        <input
          className="text-field"
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
        />
        <ClearButton onClick={() => handleClearField('email')} />
      </div>
      <div className="contact-info">
        <input
          className="text-field"
          type="tel"
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={handleChange}
        />
        <ClearButton onClick={() => handleClearField('phone')} />
      </div>
      <div className="button-container">
        <button id="save" type="submit">Save</button>
        {contact.id && (
          <button id="delete" type="button" onClick={handleDelete}>Delete</button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
