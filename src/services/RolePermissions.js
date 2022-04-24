import axios from "axios";
export class RolesPermissions {
  async setPermission({ data }) {
    try {
      return await axios.post("/api/permissions", { data });
    } catch (e) {
      // TODO IMPLEMENTAR MENSAJE DE ALERTA GLOBAL
      console.log(e.message);
    }
  }
  async getPermissions() {
    return await axios.get("/api/permissions");
  }
}
