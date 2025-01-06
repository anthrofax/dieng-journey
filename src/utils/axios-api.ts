import axios from "axios";

const AXIOS_API = axios.create({
  baseURL: `/api`,
});

export default AXIOS_API;
