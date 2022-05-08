<template>
  <v-btn
      color="primary"
      tile
      :loading="statusButton"
      @click="save"
  >Aceptar test</v-btn
  >
</template>

<script>
import { store, update } from "@/services/Examenes"
import snackbar from "@/mixins/snackbar";
export default {
  mixins: [snackbar],
  name: "SaveButton",
  data() {
    return {
      statusButton: false,
    };
  },
  methods: {
    async save() {
      try {
        this.statusButton = true;
        if (this.$store.state.examen.dialogUpdate) { //muestra form para actualizar
          await update({
              examen_id: this.$store.state.examen.editedItem.examen_id,
              name: this.$store.state.examen.editedItem.name,
              subject_id: this.$store.state.examen.editedItem.subject_id,
              user_id: this.$store.state.examen.editedItem.user_id,
              questions: this.$store.state.examen.editedItem.questions.map((item) => {
                item.options.forEach((option) => {
                  option.is_answer = option.id == item.answer;
                });
                return item;
              }),
              })
          this.$store.commit("settings/SHOW_SNACKBAR", {
            text: "Examen actualizado correctamente",
            color: "success"
          }, { root: true });
        } else { //muestra el form para crear
          await store(
              {
                name: this.$store.state.examen.editedItem.name,
                subject_id: this.$store.state.examen.editedItem.subject_id,
                user_id: this.$store.state.examen.editedItem.user_id,
                questions: this.$store.state.examen.editedItem.questions.map((item) => {
                  item.options.forEach((option) => {
                    option.is_answer = option.id === item.answer;
                  });
                  return item;
                }),
              }
          );
          await this.showSnackBar(
              "Examen agregado correctamente",
              "success"
          );
        }

      } catch (e) {
        this.showSnackBar( e.message);
      } finally {
        this.$store.commit("examen/CLOSE_CREATE_DIALOG")
        this.$store.commit("examen/RESET_FORM")
        this.$store.commit("examen/SET_STEP",1)
        this.statusButton = false;
        this.$emit('saved')
      }
    },
  },
};
</script>
