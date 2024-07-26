import axios from "axios";

const origin = "http://localhost:3000";

const AXIOS_API = axios.create({
  baseURL: `${origin}/api`,
});

export default AXIOS_API;
