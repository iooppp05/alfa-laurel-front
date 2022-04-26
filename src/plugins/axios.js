import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost";
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    config.headers.Accept = "application/json";
    config.headers.ContentType = "application/json";
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
