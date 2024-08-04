import axios from "axios";

const origin = "https://a5ef-2400-9800-6036-91f-3c90-1e86-2cd6-b240.ngrok-free.app";

const AXIOS_API = axios.create({
  baseURL: `/api`,
});

export default AXIOS_API;
