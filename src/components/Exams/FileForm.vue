<template>
  <v-card>
    <v-card-title> <h3>Importar Examen</h3></v-card-title>
    <v-card-subtitle>Solo archivos CSV xlsx xls máximo 35 MB.</v-card-subtitle>
    <v-card-text>
      <v-text-field
        label="Titulo del examen"
        v-model="editedItem.name"
      ></v-text-field>
      <v-select
        label="Materia"
        :items="subjects"
        v-model="editedItem.subject_id"
      >
      </v-select>
      <v-select v-model="editedItem.user_id" label="Profesor" :items="users">
      </v-select>
      <v-file-input
        show-size
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        v-model="editedItem.file"
      ></v-file-input>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        :loading="loading"
        color="secondary"
        @click="$emit('create-exam-by-file', editedItem)"
        >Aceptar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FileForm",
  props: ["subjects", "users", "loading"],
  data() {
    return {
      editedItem: { name: null, user_id: null, subject_id: null, file: null },
    };
  },
};
</script>

<style scoped></style>
