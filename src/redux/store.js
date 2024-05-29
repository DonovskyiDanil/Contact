import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk'; // изменить импорт на именованный импорт `thunk`
import { createLogger } from 'redux-logger';
import reducer from './reducer';

const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
