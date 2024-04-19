import React, { Component } from 'react';
import './ContactItem.css';

class ContactItem extends Component {
  render() {
    const { contact, onSelect, onDelete } = this.props;
    const fullName = `${contact.firstName || ''} ${contact.lastName || ''}`.trim();
    
    return (
      <div
        className="contact-item"
        onDoubleClick={() => onSelect(contact)}
      >
        <input
          type="text"
          value={fullName}
          readOnly
        />
        <button onClick={() => onDelete(contact.id)}>X</button>
      </div>
    );
  }
}

export default ContactItem;

