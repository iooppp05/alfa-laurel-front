<template>
  <v-row>
    <v-col cols="12" md="6">
      <validation-provider
          v-slot="{ errors }"
          name="Pregunta"
          :rules="{required: true}"
      >
      <v-text-field
          label="Pregunta"
          v-model="question.question"
          :error-messages="errors"
      />
      </validation-provider>
    </v-col>
    <v-col cols="12" md="3">
      <validation-provider
          v-slot="{ errors }"
          name="Nivel"
          :rules="{required: true}"
      >
        <v-select
            label="Nivel"
            :items="levels"
            v-model="question.level"
            :error-messages="errors"
        />
      </validation-provider>
    </v-col>
    <v-col cols="12" md="3">
      <validation-provider
          v-slot="{ errors }"
          name="Respuesta"
          :rules="{required: true}"
      >
        <v-select
            :error-messages="errors"
            label="Respuesta"
            :items="answers"
            v-model="question.answer"
        />
      </validation-provider>

    </v-col>
    <v-col cols="12">
      <OptionComponent
        ref="optionComponent"
        :options="options"
        :questionID="question.id"
        @option-updated="optionUpdated($event)"
      />
    </v-col>
  </v-row>
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
