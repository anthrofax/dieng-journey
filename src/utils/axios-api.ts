import axios from "axios";

const AXIOS_API = axios.create({
  baseURL: `${window.location.origin}/api`,
});

export default AXIOS_API;
