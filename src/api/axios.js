import axios from "axios";
import { AUTH_LOGOUT } from "../store/actions/auth/actionTypes";
import store from "../store/store";

//baseURL: 'http://192.168.77.244:4000',

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (request) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const isUserAuthenticated = user ? true : false;
  if (isUserAuthenticated) {
    request.headers["authorization"] = `Bearer ${user.token}`;
  } else {
    request.headers["authorization"] = `Bearer ${" "}`;
    store.dispatch({ type: AUTH_LOGOUT });
  }
  return request;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error) {
      store.dispatch({ type: AUTH_LOGOUT });
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default instance;
