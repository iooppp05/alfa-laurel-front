import axios from "axios";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "true";
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded ";
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://office.alfalaurel.com"
    : "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
      const token = window.localStorage.getItem("token");
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
