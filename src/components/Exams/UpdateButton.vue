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
    async show(id) {
      this.loading =!this.loading;
      let { data } = await ExamenesService.get(id);
      this.$store.commit("examen/UPDATE_NAME", data.data.name);
      this.$store.commit("examen/UPDATE_SUBJECT_ID", data.data.subject_id);
      this.$store.commit("examen/UPDATE_USER_ID", data.data.user_id);
      this.$store.commit("examen/SET_EXAMEN_QUESTIONS", data.data.questions);
      this.$store.commit("examen/OPEN_UPDATE_DIALOG");
      this.loading = !this.loading;
    },
  },
};
</script>
