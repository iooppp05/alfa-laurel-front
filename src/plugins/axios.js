import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://office.alfalaurel.com"
    : "http://localhost:8000";
axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    config.headers.Accept = "application/json";
    // config.headers.ContentType = "application/json";
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
