import axios from "axios";
export class RolesPermissions {
  async setPermission({ name }) {
    return await axios.post("/api/permissions", { name: name.toLowerCase() });
  }
  async getPermissions() {
    return await axios.get("/api/permissions");
  }
}
