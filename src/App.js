import React from 'react';
import { useSelector } from 'react-redux';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

const App = () => {
  const { loading, error } = useSelector((state) => state.contacts);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='outer-container'>
      <div className='container'>
        <h1 className='header-app'>Contact List</h1>
        <div className='main'>
          <ContactList />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default App;
