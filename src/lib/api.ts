import axios from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";

export const api = axios.create({
  baseURL: "https://6vw2kgxauc.execute-api.us-east-2.amazonaws.com/api/v1",
});

// const refreshAuthLogic = (failedRequest) =>
//   api.post("/auth/refresh").then((tokenRefreshResponse) => {
//     localStorage.setItem("token", tokenRefreshResponse.data.token);
//     failedRequest.response.config.headers["Authorization"] =
//       "Bearer " + tokenRefreshResponse.data.token;
//     return Promise.resolve();
//   });
