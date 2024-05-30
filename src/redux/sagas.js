import { call, put, takeEvery } from 'redux-saga/effects';
import axiosInstance from '../axiosInstance';
import {
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
  REMOVE_CONTACT_REQUEST,
  REMOVE_CONTACT_SUCCESS,
  REMOVE_CONTACT_FAILURE,
} from './actions';

function* fetchContactsSaga() {
  try {
    const response = yield call(axiosInstance.get, '/contacts');
    yield put({ type: FETCH_CONTACTS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_CONTACTS_FAILURE, error });
  }
}

function* addContactSaga(action) {
  try {
    const response = yield call(axiosInstance.post, '/contacts', action.payload);
    yield put({ type: ADD_CONTACT_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_CONTACT_FAILURE, error });
  }
}

function* removeContactSaga(action) {
  try {
    yield call(axiosInstance.delete, `/contacts/${action.payload}`);
    yield put({ type: REMOVE_CONTACT_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: REMOVE_CONTACT_FAILURE, error });
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_CONTACTS_REQUEST, fetchContactsSaga);
  yield takeEvery(ADD_CONTACT_REQUEST, addContactSaga);
  yield takeEvery(REMOVE_CONTACT_REQUEST, removeContactSaga);
}
