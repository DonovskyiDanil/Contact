import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactItem from './ContactItem'; // Импортируем ContactItem
import './ContactList.css';

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: JSON.parse(localStorage.getItem('contacts')) || [],
      currentContact: null,
      formKey: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    let updatedContacts = [];
    if (this.state.currentContact) {
      updatedContacts = this.state.contacts.map(c => c.id === contact.id ? contact : c);
    } else {
      const newContact = { ...contact, id: Date.now() };
      updatedContacts = [...this.state.contacts, newContact];
    }

    this.setState({ contacts: updatedContacts, currentContact: null, formKey: this.state.formKey + 1 });
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
      currentContact: null,
      formKey: prevState.formKey + 1
    }));
  };

  selectContact = (contact) => {
    this.setState({ currentContact: contact, formKey: this.state.formKey + 1 });
  };

  resetForm = () => {
    this.setState({ currentContact: null, formKey: this.state.formKey + 1 });
  };

  render() {
    return (
      <div className="contact-list-container">
        <h1>Contact List</h1>
        <div className="contacts-wrapper">
          <div className="contacts-left">
            {this.state.contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onSelect={this.selectContact}
                onDelete={this.deleteContact}
              />
            ))}
            <button type="button" className="new-button" onClick={this.resetForm}>New</button>
          </div>
          <div className="contacts-right">
            <ContactForm
              key={this.state.formKey}
              currentContact={this.state.currentContact}
              onSave={this.addContact}
              onDelete={this.deleteContact}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ContactList;
