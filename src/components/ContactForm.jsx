import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ClearButton = ({ onClick }) => (
  <button className="clear" type="button" onClick={onClick}>X</button>
);

const ContactForm = ({ contactForEdit, onSubmit, onDelete, showDelete }) => {
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [displayDeleteButton, setDisplayDeleteButton] = useState(false); 

  useEffect(() => {
    if (contactForEdit) {
      setContact(contactForEdit);
      setDisplayDeleteButton(!!contactForEdit.id); 
    } else {
      setContact({ firstName: '', lastName: '', email: '', phone: '' });
      setDisplayDeleteButton(false);
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
    await onSubmit(contact);
    setContact({ firstName: '', lastName: '', email: '', phone: '' });
  };

  const handleDelete = async () => {
    if (contact.id) {
      await onDelete(contact.id);
      setContact({ firstName: '', lastName: '', email: '', phone: '' });
      setDisplayDeleteButton(false); 
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
        {showDelete && displayDeleteButton && <button id="delete" type="button" onClick={handleDelete}>Delete</button>}
      </div>
    </form>
  );
};

export default ContactForm;
