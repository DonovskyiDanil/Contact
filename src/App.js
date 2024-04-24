import React from 'react';
import './App.css';
import ContactForm from './components/ContactForm'; 
import ContactList from './components/ContactList'; 



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: JSON.parse(localStorage.getItem('contacts')) || [],
      contactForEdit: this.createEmptyContact(),
    };
  }

  createEmptyContact = () => ({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    this.setState({ contacts });
  };

  saveToStorage = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  deleteContact = (id) => {
    const contacts = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({ contacts });
    this.saveToStorage(contacts);
  };

  saveContact = (contact) => {
    contact.id ? this.updateContact(contact) : this.createContact(contact);
  };

  addNewContact = () => {
    this.setState({
      contactForEdit: this.createEmptyContact(),
    });
  };

  selectContact = (contact) => {
    this.setState({ contactForEdit: contact });
  };

  createContact = (contact) => {
    contact.id = Date.now();
    const contacts = [...this.state.contacts, contact];
    this.saveToStorage(contacts);
    this.setState({
      contacts,
      contactForEdit: this.createEmptyContact(),
    });
  };

  updateContact = (contact) => {
    const contacts = this.state.contacts.map(item =>
      item.id === contact.id ? contact : item
    );
    this.saveToStorage(contacts);
    this.setState({
      contacts, 
      contactForEdit: this.createEmptyContact(),
    });
  };

  render() {
    const { contacts, contactForEdit } = this.state;
    return (
      <div className='container'>
        <h1 className='header-app'>Contact List</h1>
        <div className='main'>
          <ContactList
            contacts={contacts}
            onDelete={this.deleteContact}
            onAddContact={this.addNewContact}
            onEditContact={this.selectContact}
          />
          <ContactForm
            key={contactForEdit.id}
            contactForEdit={contactForEdit}
            onSubmit={this.saveContact}
            onDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;

