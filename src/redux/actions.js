export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';
export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const SET_CONTACT_FOR_EDIT = 'SET_CONTACT_FOR_EDIT';
export const CLEAR_EDIT_CONTACT = 'CLEAR_EDIT_CONTACT';

export const fetchContactsRequest = () => ({ type: FETCH_CONTACTS_REQUEST });
export const fetchContactsSuccess = (contacts) => ({ type: FETCH_CONTACTS_SUCCESS, payload: contacts });
export const fetchContactsFailure = (error) => ({ type: FETCH_CONTACTS_FAILURE, error });

export const addContact = (contact) => ({ type: ADD_CONTACT, payload: contact });
export const updateContact = (contact) => ({ type: UPDATE_CONTACT, payload: contact });
export const removeContact = (id) => ({ type: REMOVE_CONTACT, payload: id });

export const setContactForEdit = (contact) => ({ type: SET_CONTACT_FOR_EDIT, payload: contact });
export const clearEditContact = () => ({ type: CLEAR_EDIT_CONTACT });
