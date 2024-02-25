import React, { Component } from 'react';
import './ContactForm.css';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.currentContact ? props.currentContact.firstName : '',
            lastName: props.currentContact ? props.currentContact.lastName : '',
            email: props.currentContact ? props.currentContact.email : '',
            phone: props.currentContact ? props.currentContact.phone : '',
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentContact && this.props.currentContact.id !== prevProps.currentContact?.id) {
            this.setState({
                firstName: this.props.currentContact.firstName,
                lastName: this.props.currentContact.lastName,
                email: this.props.currentContact.email,
                phone: this.props.currentContact.phone,
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const contactData = {
            ...this.state,
            id: this.props.currentContact ? this.props.currentContact.id : undefined,
        };
        if (typeof this.props.onSave === 'function') {
            this.props.onSave(contactData);
            this.resetFormAll();
        }
    };

    resetFormAll = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        });
    };

    resetField = (fieldName) => {
        this.setState({
            [fieldName]: '',
        });
    };

    handleDelete = () => {
        if (this.props.currentContact && typeof this.props.onDelete === 'function') {
            this.props.onDelete(this.props.currentContact.id);
            this.resetFormAll();
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="contact-form">
                {['firstName', 'lastName', 'email', 'phone'].map((field) => (
                    <div key={field} className="input-field">
                        <input 
                            type="text" 
                            name={field} 
                            value={this.state[field]} 
                            onChange={this.handleChange} 
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)} 
                        />
                        <button 
                            type="button" 
                            className='clear-button' 
                            onClick={() => this.resetField(field)}
                        >
                            X
                        </button>
                    </div>
                ))}
                <div className="form-buttons">
                    <button type="submit" className="save-button">Save</button>
                    {this.props.currentContact && (
                        <button 
                            type="button" 
                            className="delete-button" 
                            onClick={this.handleDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        );
    }
}

export default ContactForm;
