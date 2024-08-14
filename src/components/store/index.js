import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '/Users/danildonovskij/Desktop/program/React/ContactList/contact/Contact/src/components/store/actions/contactsSlice.js';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export default store;
