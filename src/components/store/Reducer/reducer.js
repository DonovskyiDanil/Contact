import {
  SET_CONTACTS,
  SET_CONTACT_FOR_EDIT,
  CLEAR_EDIT_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  REMOVE_CONTACT,
  SET_LOADING,
  SET_ERROR
} from '../actions/actions';

const initialState = {
  contacts: [],
  loading: false,
  error: null,
  contactForEdit: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload, loading: false, error: null };
    case SET_CONTACT_FOR_EDIT:
      return { ...state, contactForEdit: action.payload };
    case CLEAR_EDIT_CONTACT:
      return { ...state, contactForEdit: null };
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
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
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default reducer;
