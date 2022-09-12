import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
});

export const clientApi = axios.create({ baseURL: 'http://localhost:3002/api' });
