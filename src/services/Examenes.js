import axios from "axios";
export class Examenes {
  async store(data) {
    let fd = new FormData();
    fd.append("file", data.file);
    fd.append("name", data.name);
    fd.append("user_id", data.user_id);
    fd.append("subject_id", data.subject_id);
    data.file = data.file[0]
    return await axios.post("/api/examenes", fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  async all() {
    return await axios.get("/api/examenes");
  }
  async delete({ examenId }) {
    return await axios.delete(`/api/examenes/${examenId}`);
  }
}
