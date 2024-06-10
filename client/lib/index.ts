import axios from 'axios';

export const proshopAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL || "https://codice.dev3029", 
});
// 'https://codice.dev:3029'
// 'https://codice.dev:3029'
