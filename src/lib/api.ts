import axios from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";

export const api = axios.create({
  baseURL: "http://ec2-3-129-73-109.us-east-2.compute.amazonaws.com:3002/api/v1",
});

// const refreshAuthLogic = (failedRequest) =>
//   api.post("/auth/refresh").then((tokenRefreshResponse) => {
//     localStorage.setItem("token", tokenRefreshResponse.data.token);
//     failedRequest.response.config.headers["Authorization"] =
//       "Bearer " + tokenRefreshResponse.data.token;
//     return Promise.resolve();
//   });
