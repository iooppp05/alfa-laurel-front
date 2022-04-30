export default {
  namespaced: true,
  state: {
    id: 1,
    resetForm: false,
    editedItem: {
      name: null,
      user_id: null,
      subject_id: null,
      questions: [
        {
          id: 1,
          question: null,
          level: null,
          number: null,
          answer: null,
          options: [],
        },
      ],
    },
  },
  mutations: {
    ADD_QUESTION(state) {
      state.id++;
      state.editedItem.questions.push({
        id: state.id,
        question: null,
        level: null,
        number: state.id,
        answer: null,
        options: [],
      });
    },
    UPDATE(state, data) {
      data.forEach((component) => {
        state.editedItem.questions.push(component.question);
      });
    },
    RESET_FORM(state) {
      state.resetForm = !this.state.resetForm;
    },
  },
};
