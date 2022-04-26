import axios from "axios";
export class Subjects {
  async store({ name }) {
    return await axios.post("/api/subjects", { name: name.toLowerCase() });
  }
  async all() {
    return await axios.get("/api/subjects");
  }
  async delete({ subjectId }) {
    return await axios.delete(`/api/subjects/${subjectId}`);
  }
}
