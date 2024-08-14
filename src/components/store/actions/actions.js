
export const SET_CONTACTS = 'SET_CONTACTS';
export const SET_CONTACT_FOR_EDIT = 'SET_CONTACT_FOR_EDIT';
export const CLEAR_EDIT_CONTACT = 'CLEAR_EDIT_CONTACT';
export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';


export const setContacts = (contacts) => ({ type: SET_CONTACTS, payload: contacts });
export const setContactForEdit = (contact) => ({ type: SET_CONTACT_FOR_EDIT, payload: contact });
export const clearEditContact = () => ({ type: CLEAR_EDIT_CONTACT });
export const addContact = (contact) => ({ type: ADD_CONTACT, payload: contact });
export const updateContact = (contact) => ({ type: UPDATE_CONTACT, payload: contact });
export const removeContact = (id) => ({ type: REMOVE_CONTACT, payload: id });
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });
export const setError = (error) => ({ type: SET_ERROR, payload: error });
