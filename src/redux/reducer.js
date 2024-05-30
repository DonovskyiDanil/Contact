import {
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  ADD_CONTACT_SUCCESS,
  REMOVE_CONTACT_SUCCESS,
} from './actions';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };
    case FETCH_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case REMOVE_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
