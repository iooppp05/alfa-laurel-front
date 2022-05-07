<template>
  <v-btn :loading="loading" @click="show(id)" plain>
    <v-icon>mdi-pencil </v-icon>
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
            data.data.questions.map(question => {
              question.options.map((option,index) => {
                if (index === 0 || index === 1){
                  option.cols = "12";
                  option.md = "4";
                } else{
                  option.cols = "10";
                  option.md = "3";
                }
              })
            })
            this.$store.commit(
                "examen/SET_EXAMEN_QUESTIONS",
                data.data.questions
            );
            return data
          })
          .then(({ data }) => {
            this.$nextTick(()=>{
              this.$store.commit("examen/UPDATE_NAME", data.name);
              this.$store.commit("examen/UPDATE_EXAMEN_ID", data.examen_id);
              this.$store.commit("examen/UPDATE_SUBJECT_ID", data.subject_id);
              this.$store.commit("examen/UPDATE_USER_ID", data.user_id);
            })
          })
          .then(() => {
            this.$nextTick(()=>{
              this.loading = !this.loading;
            })
          })
          .then(() => {
            this.$nextTick(()=>{
              this.$store.commit("examen/OPEN_UPDATE_DIALOG")
            })
          });
    },
  },
};
</script>
