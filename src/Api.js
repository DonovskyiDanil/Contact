import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5001/contacts',
  headers: {
    'Content-Type': 'application/json',
  }
});
