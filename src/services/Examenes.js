import axios from "axios";
export class Examenes {
  async store(data) {
    let fd = new FormData();
    if (data.file) {
      fd.append("file", data.file);
      fd.append("user_id", data.user_id);
      fd.append("subject_id", data.subject_id);
      fd.append("name", data.name);
    }
    return await axios.post("/api/examenes", data.file ? fd : data, {
      headers: {
        "Content-Type": data.file ? "multipart/form-data" : "application/json",
      },
    });
  }
  async all() {
    return await axios.get("/api/examenes");
  }
  async get(id) {
    return await axios.get(`/api/examenes/${id}`);
  }
  async delete({ examenId }) {
    return await axios.delete(`/api/examenes/${examenId}`);
  }
}
