import axios from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";

export const api = axios.create({
  baseURL: "http://192.168.1.10:3002/api/v1",
});

// const refreshAuthLogic = (failedRequest) =>
//   api.post("/auth/refresh").then((tokenRefreshResponse) => {
//     localStorage.setItem("token", tokenRefreshResponse.data.token);
//     failedRequest.response.config.headers["Authorization"] =
//       "Bearer " + tokenRefreshResponse.data.token;
//     return Promise.resolve();
//   });
