import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true, // Envia cookies junto com as requisições
  });
  

export default api;

