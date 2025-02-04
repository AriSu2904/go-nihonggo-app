import axios from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";

export const api = axios.create({
  baseURL: "https://3hebgzton4.execute-api.ap-southeast-2.amazonaws.com//go-nihongo",
});