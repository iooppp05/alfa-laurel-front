import axios from "axios";
export class Users {
  async store({ userData }) {
    return await axios.post("/api/users", userData);
  }
  async all() {
    return await axios.get("/api/users");
  }
  async delete({ userId }) {
    return await axios.delete(`/api/users/${userId}`);
  }
  async get({ userId }) {
    return await axios.get(`/api/users/${userId}`);
  }
  async update({ userId, data }) {
    return await axios.post(`/api/users/${userId}`, { data, _method: "PUT" });
  }
}
