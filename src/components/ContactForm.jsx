import React, { Component } from 'react';
import './ContactForm.css';

export class ContactForm extends Component {
  state = {
    ...this.props.contactForEdit,
  };

  static getDerivedStateFromProps(props, state) {
    if (state.id === props.contactForEdit.id) {
      return {};
    }
    return {
      ...props.contactForEdit,
    };
  }

  createEmptyContact() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClearField = (e) => {
    const sibling = e.target.parentNode.firstChild;
    this.setState({
      [sibling.name]: '',
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      ...this.state,
    });
    this.setState(this.createEmptyContact());
  };

  onContactDelete = () => {
    this.props.onDelete(this.props.contactForEdit.id);
    this.setState(this.createEmptyContact());
  };

  render() {
    return (
      <form id='contact-form' onSubmit={this.onFormSubmit}>
        <div className='form-container'>
          <div className='contact-info'>
            <input
              type='text'
              className='text-field'
              placeholder='First Name'
              name='firstName'
              value={this.state.firstName}
              onChange={this.onInputChange}
            />
            <span className='clear' onClick={this.onClearField}>X</span>
          </div>
          <div className='contact-info'>
            <input
              type='text'
              className='text-field'
              placeholder='Last Name'
              name='lastName'
              value={this.state.lastName}
              onChange={this.onInputChange}
            />
            <span className='clear' onClick={this.onClearField}>X</span>
          </div>
          <div className='contact-info'>
            <input
              type='text'
              className='text-field'
              placeholder='Email'
              name='email'
              value={this.state.email}
              onChange={this.onInputChange}
            />
            <span className='clear' onClick={this.onClearField}>X</span>
          </div>
          <div className='contact-info'>
            <input
              type='text'
              className='text-field'
              placeholder='Phone'
              name='phone'
              value={this.state.phone}
              onChange={this.onInputChange}
            />
            <span className='clear' onClick={this.onClearField}>X</span>
          </div>
          <div className='btns'>
            <button id='save' type='submit'>
              Save
            </button>
            {this.state.id ? (
              <button
                id='delete'
                type='button'
                onClick={this.onContactDelete}
              >
                Delete
              </button>
            ) : null}
          </div>
        </div>
      </form>
    );
  }
}

export default ContactForm;
