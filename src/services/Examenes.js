import axios from "axios";
import { Users } from "@/services/Users";
import { Subjects } from "@/services/Subjects";
const UserService = new Users();
const SubjectsService = new Subjects();

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
export async function all() {
  return await axios.get("/api/examenes");
}
export async function store(data) {
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
export async function initExamenes() {
  let { data: examenes } = await all();
  let { data: users } = await UserService.all();
  let { data: subjects } = await SubjectsService.all();
  return {
    subjects: subjects.map((item) => {
      return { value: item.id, text: item.name };
    }),
    users: users.map((item) => {
      return { value: item.id, text: item.name };
    }),
    examenes,
  };
}
export async function destroy({ examenId }) {
  return await axios.delete(`/api/examenes/${examenId}`);
}
export async function deleteExamQuestion({examenID,questionID}) {
  return await axios.post(`/api/examenes/question`,{examenID, questionID});
}
export async function update({examen_id, ...data}) {
  return await axios.post(`/api/examenes/${examen_id}`, {
    examen_id,
    name: data.name,
    subject_id: data.subject_id,
    user_id: data.user_id,
    questions: data.questions,
    _method: 'PUT'
  });
}
