import {
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  ADD_CONTACT,
  UPDATE_CONTACT,
  REMOVE_CONTACT,
  SET_CONTACT_FOR_EDIT,
  CLEAR_EDIT_CONTACT,
} from './actions';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
  contactForEdit: null, 
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
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    case SET_CONTACT_FOR_EDIT:
      return {
        ...state,
        contactForEdit: action.payload,
      };
    case CLEAR_EDIT_CONTACT:
      return {
        ...state,
        contactForEdit: null,
      };
    default:
      return state;
  }
};

export default reducer;
