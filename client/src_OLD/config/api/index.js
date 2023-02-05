import axios from "axios";

const API_URL = 'https://dall-e-hosm.onrender.com/api/v1/';// 'https://dalle-arbb.onrender.com/api/v1/dalle';

export const axios_api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});