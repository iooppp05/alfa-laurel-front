<template>
  <v-btn :loading="loading" @click="show(id)" plain>
    <v-icon> mdi-update </v-icon>
  </v-btn>
</template>

<script>
import { Examenes } from "@/services/Examenes";
const ExamenesService = new Examenes();

export default {
  name: "btnUpload",
  props: ["id"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    show(id) {
      this.loading = !this.loading;
      ExamenesService.get(id)
        .then(({ data }) => {
          this.$store.commit("examen/UPDATE_NAME", data.data.name);
          this.$store.commit("examen/UPDATE_SUBJECT_ID", data.data.subject_id);
          this.$store.commit("examen/UPDATE_USER_ID", data.data.user_id);
          return { data };
        })
        .then(({ data }) => {
          this.$store.commit(
            "examen/SET_EXAMEN_QUESTIONS",
            data.data.questions
          );
        })
        .then(() => {
          this.loading = !this.loading;
        })
        .then(() => this.$store.commit("examen/OPEN_UPDATE_DIALOG"));
    },
  },
};
</script>
