import React, { useState, useEffect } from 'react';
import './ContactForm.css';

const ContactForm = ({ currentContact, onSave, onDelete }) => {
    const [contact, setContact] = useState({
        firstName: currentContact ? currentContact.firstName : '',
        lastName: currentContact ? currentContact.lastName : '',
        email: currentContact ? currentContact.email : '',
        phone: currentContact ? currentContact.phone : '',
    });

    useEffect(() => {
        if (currentContact) {
            setContact({
                firstName: currentContact.firstName,
                lastName: currentContact.lastName,
                email: currentContact.email,
                phone: currentContact.phone,
            });
        }
    }, [currentContact]);

    const handleChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const contactData = {
            ...contact,
            id: currentContact ? currentContact.id : undefined,
        };

        if (onSave) {
            onSave(contactData);
            resetFormAll();
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

    const resetField = (fieldName) => {
        setContact({
            ...contact,
            [fieldName]: '',
        });
    };

    const handleDelete = () => {
        if (currentContact && onDelete) {
            onDelete(currentContact.id);
            resetFormAll();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            {['firstName', 'lastName', 'email', 'phone'].map((field) => (
                <div key={field} className="input-field">
                    <input 
                        type="text" 
                        name={field} 
                        value={contact[field]} 
                        onChange={handleChange} 
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
                    />
                    <button 
                        type="button" 
                        className='clear-button' 
                        onClick={() => resetField(field)}
                    >
                        X
                    </button>
                </div>
            ))}
            <div className="form-buttons">
                <button type="submit" className="save-button">Save</button>
                {currentContact && (
                    <button 
                        type="button" 
                        className="delete-button" 
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
};

export default ContactForm;
