import axios from "axios";

const API = axios.create({
  baseURL: "https://6a1686a71b90031f81b11e77.mockapi.io/api/v1/book",
});

export default API;