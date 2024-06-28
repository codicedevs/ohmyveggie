import axios from 'axios';

export const proshopAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL || 'https://67.205.136.19:4000', 
});
// 
// 'https://codice.dev:3029'
