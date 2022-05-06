<template>
  <v-btn  @click="dialog = !dialog" plain>
    <v-icon> mdi-delete </v-icon>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card >
        <v-card-title class="title grey--text text--darken-1">Se eliminara el examen  ¿Estas de acuerdo?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined text @click="dialog = false"
          >Cancelar</v-btn
          >
          <v-btn
              color="primary"
              @click="destroy"
              :loading="loading"
          >Aceptar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
import { destroy } from "@/services/Examenes"
export default {
  name: "DeleteButton",
  props: ["id"],
  data() {
    return {
      loading: false,
      dialog: false
    }
  },
  methods: {
    async destroy() {
      try{
        this.loading = true;
        await destroy({examenId: this.id});
        this.$emit("submitted", {success: true})
      }catch (e) {
        this.$emit("submitted", {success: false})
      }finally {
        this.loading = false;
        this.dialog = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
