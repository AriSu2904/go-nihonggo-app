import axios from "axios";

export const api = axios.create({
  baseURL: "https://3hebgzton4.execute-api.ap-southeast-2.amazonaws.com/go-nihongo",
  // baseURL: "http://10.0.2.2:3000/api/v1",
  // baseURL: "http://10.0.2.2:3002/api/v1",
});