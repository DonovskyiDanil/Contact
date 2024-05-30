export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';

export const ADD_CONTACT_REQUEST = 'ADD_CONTACT_REQUEST';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE';

export const REMOVE_CONTACT_REQUEST = 'REMOVE_CONTACT_REQUEST';
export const REMOVE_CONTACT_SUCCESS = 'REMOVE_CONTACT_SUCCESS';
export const REMOVE_CONTACT_FAILURE = 'REMOVE_CONTACT_FAILURE';


export const fetchContacts = () => ({
  type: FETCH_CONTACTS_REQUEST,
});

export const fetchContactsSuccess = (contacts) => ({
  type: FETCH_CONTACTS_SUCCESS,
  payload: contacts,
});

export const fetchContactsFailure = (error) => ({
  type: FETCH_CONTACTS_FAILURE,
  error,
});


export const addContact = (contact) => ({
  type: ADD_CONTACT_REQUEST,
  payload: contact,
});

export const addContactSuccess = (contact) => ({
  type: ADD_CONTACT_SUCCESS,
  payload: contact,
});

export const addContactFailure = (error) => ({
  type: ADD_CONTACT_FAILURE,
  error,
});


export const removeContact = (id) => ({
  type: REMOVE_CONTACT_REQUEST,
  payload: id,
});

export const removeContactSuccess = (id) => ({
  type: REMOVE_CONTACT_SUCCESS,
  payload: id,
});

export const removeContactFailure = (error) => ({
  type: REMOVE_CONTACT_FAILURE,
  error,
});
