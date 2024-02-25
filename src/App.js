import React from 'react';
import ContactList from './components/ContactList'; // Импортируем ContactList
import './App.css'; // Импортируем стили для App (если есть)

function App() {
  return (
    <div className="App">
      <ContactList /> {/* Используем компонент ContactList */}
    </div>
  );
}

export default App;
