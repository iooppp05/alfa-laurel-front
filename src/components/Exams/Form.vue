<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col>
          <h5 class="text-h5">{{ formTitle }}</h5>
          <small class="text-secondary">*Todos los campos son requeridos</small>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field label="Titulo del examen" v-model="name"></v-text-field
        ></v-col>
        <v-col cols="4">
          <v-select label="Materia" :items="subjects" v-model="subject_id"
        /></v-col>
        <v-col cols="4">
          <v-select label="Profesor" :items="users" v-model="user_id"
        /></v-col>
      </v-row>
      <v-dialog v-model="dialogRemoveQuestion" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >¿Estas seguro de eliminar la preguta ?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogRemoveQuestion = false"
              >Cancel</v-btn
            >
            <v-btn
              color="blue darken-1"
              :disabled="isBtbBlocked"
              text
              @click="removeRow"
              >Aceptar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <questions-component
        @remove-question="dialogRemoveQuestion = !dialogRemoveQuestion"
        ref="questionComponent"
        v-for="question in questions"
        :options="question.options"
        :key="question.name"
        :question="question"
      />
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="secondary" tile class="mx-3" @click="addRow"
            >Agregar pregunta</v-btn
          >
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            color="grey lighten-2"
            class="mx-3"
            tile
            :loading="loading"
            @click="cancel"
            >Cancelar</v-btn
          >
          <v-btn color="primary" tile :loading="loading" @click="submit"
            >Aceptar</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Form",
  props: ["users", "subjects", "loading", "formTitle"],
  components: {
    QuestionsComponent: () => import("./Question.vue"),
  },
  data() {
    return {
      id: 1,
      isBtbBlocked: false,
      draftQuestions: null,
      dialogRemoveQuestion: false,
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.state.examen.editedItem.name;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_NAME", value);
      },
    },
    subject_id: {
      get() {
        return this.$store.state.examen.editedItem.subject_id;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_SUBJECT_ID", value);
      },
    },
    user_id: {
      get() {
        return this.$store.state.examen.editedItem.user_id;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_USER_ID", value);
      },
    },
    questions() {
      return this.$store.state.examen.editedItem.questions;
    },
  },
  methods: {
    submit: async function () {
      this.draftQuestions = this.$refs.questionComponent.map((item) => {
        item.question.options.forEach((option) => {
          option.is_answer = option.id === item.question.answer;
        });
        return item.question;
      });
      await this.$emit("create-exam-by-manual", {
        name: this.name,
        subject_id: this.subject_id,
        user_id: this.user_id,
        questions: this.draftQuestions,
      });
    },
    addRow() {
      this.id += 1;
      this.$store.commit("examen/ADD_QUESTION");
    },
    removeRow() {
      this.id--;
      this.$store.commit("examen/REMOVE_QUESTION");
    },
    cancel() {
      this.$refs.form.reset();
      this.$store.commit("examen/RESET_FORM");
      this.$store.commit("examen/CLOSE_UPDATE_DIALOG");
    },
  },
};
</script>
