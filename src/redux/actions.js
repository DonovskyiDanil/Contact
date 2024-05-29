import axiosInstance from '../axiosInstance';

export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';
export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const fetchContacts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CONTACTS_REQUEST });
    try {
      const response = await axiosInstance.get('/contacts');
      dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_CONTACTS_FAILURE, error });
    }
  };
};

export const addContact = (contact) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post('/contacts', contact);
      dispatch({ type: ADD_CONTACT, payload: response.data });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };
};

export const removeContact = (id) => {
  return async (dispatch) => {
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      dispatch({ type: REMOVE_CONTACT, payload: id });
    } catch (error) {
      console.error('Error removing contact:', error);
    }
  };
};
