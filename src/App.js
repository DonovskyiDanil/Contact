import React from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm'; 

import './App.css'; 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentContact: null,
      isFormVisible: false, 
    };
  }

  handleSelectContact = (contact) => {
    this.setState({ currentContact: contact, isFormVisible: true });
  };

  handleAddContact = () => {
    this.setState({ currentContact: null, isFormVisible: true });
  };

  handleFormClose = () => {
    this.setState({ isFormVisible: false });
  };

  render() {
    const { currentContact, isFormVisible } = this.state;

    return (
      <div className="App">
        {isFormVisible && (
          <ContactForm 
            currentContact={currentContact} 
            onClose={this.handleFormClose} 
          />
        )}
        <ContactList 
          onSelectContact={this.handleSelectContact} 
          onAddContact={this.handleAddContact}
        />
      </div>
    );
  }
}
export default App;
