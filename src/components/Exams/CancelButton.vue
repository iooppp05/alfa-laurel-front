<template>
  <v-btn
      color="grey lighten-2"
      class="mx-3"
      tile
      :loading="statusButton"
      @click="cancel"
  >Cancelar</v-btn
  >
</template>

<script>
export default {
  name: "CancelButton",
  data() {
    return {
      statusButton: false,
    }
  },
  methods:{
    cancel() {
      this.statusButton = true;
      if (this.$store.state.examen.dialog){
        this.$store.commit("examen/CLOSE_CREATE_DIALOG");
      } else if (this.$store.state.examen.dialogUpdate){
        this.$store.commit("examen/CLOSE_UPDATE_DIALOG");
      }
      this.$store.commit("examen/RESET_FORM");
      this.$store.commit("examen/SET_STEP",1);
      this.$emit('reset-form')
      this.statusButton = false;
    }
  }
}
</script>

<style scoped>

</style>
