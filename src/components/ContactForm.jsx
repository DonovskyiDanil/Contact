import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactForm.css';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001'
});

const ContactForm = ({ currentContact, updateContacts }) => {
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (currentContact) {
            setContact(currentContact);
        } else {
            resetFormAll();
        }
    }, [currentContact]);

    const handleChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (contact.id) {
                await apiClient.put(`/contacts/${contact.id}`, contact);
            } else {
                await apiClient.post('/contacts', contact);
            }
            updateContacts();
            resetFormAll();  
        } catch (error) {
            console.error("Ошибка при сохранении контакта:", error);
        }
    };

    const resetFormAll = () => {
        setContact({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-field">
                <input 
                    type="text" 
                    name="firstName" 
                    value={contact.firstName} 
                    onChange={handleChange} 
                    placeholder="First Name" 
                />
            </div>
            <div className="input-field">
                <input 
                    type="text" 
                    name="lastName" 
                    value={contact.lastName} 
                    onChange={handleChange} 
                    placeholder="Last Name" 
                />
            </div>
            <div className="input-field">
                <input 
                    type="email" 
                    name="email" 
                    value={contact.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                />
            </div>
            <div className="input-field">
                <input 
                    type="tel" 
                    name="phone" 
                    value={contact.phone} 
                    onChange={handleChange} 
                    placeholder="Phone" 
                />
            </div>
            <div className="form-buttons">
                <button type="submit" className="save-button">Save</button>
            </div>
        </form>
    );
};

export default ContactForm;
