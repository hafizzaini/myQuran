import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
});

export const clientApi = axios.create({ baseURL: process.env.CLIENT_API_URL });
