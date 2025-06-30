import axios from 'axios';

const api = axios.create({
  baseURL: "https://codewearapi-c5ggd4ajfreghaan.canadacentral-01.azurewebsites.net/",
});

export default api;
