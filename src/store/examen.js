export default {
  namespaced: true,
  state: {
    dialog: false,
    dialogUpdate: false,
    e1: 1,
    resetForm: false,
    editedItem: {
      name: null,
      file: null,
      user_id: null,
      subject_id: null,
      questions: [
        {
          id: 1,
          question: null,
          level: null,
          number: 1,
          answer: null,
          options: [
            {
              id: 1,
              option: null,
              is_answer: null,
              cols: "12",
              md: "4",
            },
            {
              id: 2,
              option: null,
              is_answer: null,
              cols: "12",
              md: "4",
            },
            {
              id: 3,
              option: null,
              is_answer: null,
              cols: "10",
              md: "3",
            },
          ],
        },
      ],
    },
  },
  mutations: {
    UPDATE_FILE(state,file) {
      state.editedItem.file = file;
    },
    SET_STEP(state, step) {
      state.e1 = step;
    },
    CLOSE_CREATE_DIALOG(state) {
      state.dialog = false;
    },
    OPEN_CREATE_DIALOG(state) {
      state.dialog = true;
    },
    CLOSE_UPDATE_DIALOG(state) {
      state.dialogUpdate = false;
    },
    OPEN_UPDATE_DIALOG(state) {
      state.dialogUpdate = true;
    },
    ADD_QUESTION(state) {
      state.id++;
      state.editedItem.questions.push({
        id: state.id,
        question: null,
        level: null,
        number: state.id,
        answer: null,
        options: [
          {
            id: 1,
            option: null,
            is_answer: null,
            cols: "12",
            md: "4",
          },
          {
            id: 2,
            option: null,
            is_answer: null,
            cols: "12",
            md: "4",
          },
          {
            id: 3,
            option: null,
            is_answer: null,
            cols: "10",
            md: "3",
          },
        ],
      });
    },
    UPDATE_NAME(state, name) {
      state.editedItem.name = name;
    },
    UPDATE_USER_ID(state, user_id) {
      state.editedItem.user_id = user_id;
    },
    UPDATE_SUBJECT_ID(state, subject_id) {
      state.editedItem.subject_id = subject_id;
    },
    REMOVE_QUESTION(state) {
      state.id--;
      state.editedItem.questions.pop();
    },
    UPDATE_QUESTION(state, question) {
      state.editedItem.questions.map((q) => {
        if (q.id === question.id) {
          q = question;
        }
      });
    },
    RESET_FORM(state) {
      state.editedItem = {
        name: null,
        user_id: null,
        subject_id: null,
        questions: [
          {
            id: 1,
            question: null,
            level: null,
            number: 1,
            answer: null,
            options: [
              {
                id: 1,
                option: null,
                is_answer: null,
                cols: "12",
                md: "4",
              },
              {
                id: 2,
                option: null,
                is_answer: null,
                cols: "12",
                md: "4",
              },
              {
                id: 3,
                option: null,
                is_answer: null,
                cols: "10",
                md: "3",
              },
            ],
          },
        ],
      };
    },
    SET_EXAMEN_QUESTIONS(state, questions) {
      state.editedItem.questions = questions;
    },
  },
};
