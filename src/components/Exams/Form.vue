<template>
  <v-card>
    <v-card-title>Redactar/Modificar Examen</v-card-title>
    <v-card-subtitle>Todos los campos son requeridos</v-card-subtitle>
    <v-card-text>
      <v-form ref="form">
        <v-text-field label="Titulo del examen" v-model="name"></v-text-field>
        <v-select label="Materia" :items="subjects" v-model="subject_id" />
        <v-select label="Profesor" :items="users" v-model="user_id" />
        <questions-component
          ref="questionComponent"
          v-for="(question, index) in questions"
          :key="index"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn large color="secondary" @click="addRow">Agregar pregunta</v-btn>
      <v-btn large color="primary" :loading="loading" @click="submit"
        >Aceptar</v-btn
      >
      <!--      @click="$emit('create-exam-by-manual', editedItem)"-->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Form",
  props: ["users", "subjects", "loading"],
  components: {
    QuestionsComponent: () => import("./Question.vue"),
  },
  data() {
    return {
      id: 1,
      formTitle: "Añadir Examen ",
      name: null,
      subject_id: null,
      user_id: null,
      draftQuestions: null,
    };
  },
  computed: {
    questions() {
      return this.$store.state.examen.editedItem.questions;
    },
    reset() {
      return this.$store.state.examen.resetForm;
    },
  },
  watch: {
    reset() {
      this.$refs.form.reset();
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
    removeQuestion(question) {
      const idx = this.editedItem.questions.findIndex(
        (q) => q.number === question.number
      );
      this.editedItem.questions.splice(idx, 1);
    },
    addRow() {
      this.id += 1;
      this.$store.commit("examen/ADD_QUESTION");
    },
  },
};
</script>
