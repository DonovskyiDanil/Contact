import React, { useState, useEffect } from 'react';
import './ContactForm.css';

function ContactForm({ contactForEdit, onSubmit, onDelete }) {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    id: null
  });

  useEffect(() => {
    setContact(contactForEdit || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      id: null
    });
  }, [contactForEdit]);

  const createEmptyContact = () => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    id: null
  });

  const onInputChange = (e) => {
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onClearField = (e) => {
    const fieldName = e.target.previousSibling.name; 
    setContact((prev) => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(contact);
    setContact(createEmptyContact());
  };

  const onContactDelete = () => {
    onDelete(contact.id);
    setContact(createEmptyContact());
  };

  return (
    <form id="contact-form" onSubmit={onFormSubmit}>
      <div className='form-container'>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='First Name'
            name='firstName'
            value={contact.firstName}
            onChange={onInputChange}
          />
          <span className='clear' onClick={onClearField}>X</span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Last Name'
            name='lastName'
            value={contact.lastName}
            onChange={onInputChange}
          />
          <span className='clear' onClick={onClearField}>X</span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Email'
            name='email'
            value={contact.email}
            onChange={onInputChange}
          />
          <span className='clear' onClick={onClearField}>X</span>
        </div>
        <div className='contact-info'>
          <input
            type='text'
            className='text-field'
            placeholder='Phone'
            name='phone'
            value={contact.phone}
            onChange={onInputChange}
          />
          <span className='clear' onClick={onClearField}>X</span>
        </div>
        <div className='btns'>
          <button id='save' type='submit'>
            Save
          </button>
          {contact.id ? (
            <button
              id='delete'
              type='button'
              onClick={onContactDelete}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
