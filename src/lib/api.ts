import axios from "axios";

export const api = axios.create({
  baseURL: "http://ec2-3-129-73-109.us-east-2.compute.amazonaws.com:3002/api/v1",
});
