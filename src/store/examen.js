export default {
  namespaced: true,
  state: {
    dialog: false,
    dialogUpdate: false,
    e1: 1,
    resetForm: false,
    extraQuestions:[],
    editedItem: {
      examen_id: null,
      name: null,
      file: null,
      user_id: null,
      subject_id: null,
      low: null,
      medium: null,
      high:null,
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
              number: 1,
            },
            {
              id: 2,
              option: null,
              is_answer: null,
              cols: "12",
              md: "4",
              number: 2,
            },
            {
              id: 3,
              option: null,
              is_answer: null,
              cols: "10",
              md: "2",
              number: 3,
            },
          ],
        },
      ],
    },
  },
  mutations: {
    SET_LOW(state, value) {
      state.editedItem.low = value;
    },
    SET_MEDIUM(state, value) {
      state.editedItem.medium = value;
    },
    SET_HIGH(state, value) {
      state.editedItem.high = value;
    },
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
      let lastOne = state.editedItem.questions[state.editedItem.questions.length -1]
      state.editedItem.questions.push({
        id: null,
        question: null,
        level: null,
        number: lastOne.number + 1,
        answer: null,
        options: [
          {
            id: 1,
            option: null,
            is_answer: null,
            question_id: null,
            cols: "12",
            md: "4",
            number: 1,
          },
          {
            id: 2,
            option: null,
            is_answer: null,
            question_id: null,
            cols: "12",
            md: "4",
            number: 2,
          },
          {
            id: 3,
            option: null,
            is_answer: null,
            question_id: null,
            cols: "10",
            md: "3",
            number: 3,
          },
        ],
      });
    },
    UPDATE_NAME(state, name) {
      state.editedItem.name = name;
    },
    UPDATE_EXAMEN_ID(state, examen_id) {
      state.editedItem.examen_id = examen_id;
    },
    UPDATE_USER_ID(state, user_id) {
      state.editedItem.user_id = user_id;
    },
    UPDATE_SUBJECT_ID(state, subject_id) {
      state.editedItem.subject_id = subject_id;
    },
    REMOVE_QUESTION(state, questionID) {
      let idx = state.editedItem.questions.findIndex((q) =>  q.id == questionID);
      state.editedItem.questions.splice(idx,1);
      if (state.editedItem.questions.length === 0) {
        state.editedItem.questions.push({
          id: 1,
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
              number: 1,
            },
            {
              id: 2,
              option: null,
              is_answer: null,
              cols: "12",
              md: "4",
              number: 2,
            },
            {
              id: 3,
              option: null,
              is_answer: null,
              cols: "10",
              md: "3",
              number: 3,
            },
          ],
        });
      }
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
        low: null,
        medium: null,
        high:null,
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
                number:1,
              },
              {
                id: 2,
                option: null,
                is_answer: null,
                cols: "12",
                md: "4",
                number:2,
              },
              {
                id: 3,
                option: null,
                is_answer: null,
                cols: "10",
                md: "3",
                number:3,
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
  getters:{
    totalQuestions(state){
        return state.editedItem.questions.length
    }
  }
};
