<template>
  <!--  <v-container>-->
  <v-row>
    <v-col cols="12" md="6">
      <v-text-field
        :label="`Pregunta-${question.id}`"
        v-model="question.question"
      />
    </v-col>
    <v-col cols="12" md="3">
      <v-select label="Nivel" :items="levels" v-model="question.level" />
    </v-col>
    <v-col cols="12" md="3">
      <v-select label="Respuesta" :items="answers" v-model="question.answer" />
    </v-col>
    <v-col cols="12">
      <OptionComponent
        @remove-question="removeQuestion"
        ref="optionComponent"
        :options="options"
        @option-updated="optionUpdated($event)"
      />
    </v-col>
  </v-row>
  <!--  </v-container>-->
</template>
<script>
export default {
  name: "Question",
  props: ["question", "options"],
  watch: {
    question: {
      deep: true,
      handler(value) {
        this.$store.commit("examen/UPDATE_QUESTION",value);
      },
    },
  },
  components: {
    OptionComponent: () => import("./Options.vue"),
  },
  methods: {
    optionUpdated(value) {
      this.question.options = value;
    },
    removeQuestion() {
      this.$emit("remove-question");
    },
  },
  data() {
    return {
      levels: ["A", "B", "M"],
      answers: [1, 2, 3],
      // question: {
      //   id: 1,
      //   question: null,
      //   level: null,
      //   number: 1,
      //   answer: null,
      //   options: [],
      // },
    };
  },
};
</script>
