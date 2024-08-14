import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '/Users/danildonovskij/Desktop/program/React/ContactList/contact/Contact/src/axiosInstance.js';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axiosInstance.get('/contacts');
  return response.data;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    contactForEdit: null,
    loading: false,
    error: null,
  },
  reducers: {
    setContactForEdit(state, action) {
      state.contactForEdit = action.payload;
    },
    clearEditContact(state) {
      state.contactForEdit = null;
    },
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action) {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    removeContact(state, action) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setContactForEdit,
  clearEditContact,
  addContact,
  updateContact,
  removeContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;
