import axios from "axios";
export class RolesPermissions {
  async setPermission({ name }) {
    return await axios.post("/api/permissions", { name: name.toLowerCase() });
  }
  async getPermissions() {
    return await axios.get("/api/permissions");
  }
  async deletePermissions({ permissionId }) {
    return await axios.delete(`/api/permissions/${permissionId}`);
  }
  async setRole({ name, permissions }) {
    console.log({ name, permissions });
    return await axios.post("/api/roles", {
      name: name.toLowerCase(),
      permissions: permissions,
    });
  }
  async getRole(role_id) {
    return await axios.get(`/api/roles/${role_id}`);
  }
  async getRoles() {
    return await axios.get("/api/roles");
  }
  async deleteRole({ roleId }) {
    return await axios.delete(`/api/roles/${roleId}`);
  }
}
