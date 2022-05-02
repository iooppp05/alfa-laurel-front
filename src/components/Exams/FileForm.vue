<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col>
          <h5 class="text-h5">Importar Examen</h5>
          <small class="text-secondary"
            >*Solo archivos CSV xlsx xls máximo 35 MB.</small
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Titulo del examen"
            v-model="editedItem.name"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            label="Materia"
            :items="subjects"
            v-model="editedItem.subject_id"
          >
          </v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="editedItem.user_id"
            label="Profesor"
            :items="users"
          >
          </v-select>
        </v-col>
        <v-col cols="12">
          <v-file-input
            show-size
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            v-model="editedItem.file"
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <v-btn
            :loading="loading"
            block
            large
            color="secondary"
            @click="$emit('create-exam-by-file', editedItem)"
            >Aceptar</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
