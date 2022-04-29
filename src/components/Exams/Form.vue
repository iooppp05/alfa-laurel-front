<template>
  <v-card>
    <v-card-title>Redactar Examen</v-card-title>
    <v-card-subtitle>Todos los campos son requeridos</v-card-subtitle>
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
      <v-container v-for="(item, index) in editedItem.questions" :key="item.id">
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              :label="`Pregunta-${index + 1}`"
              v-model="item.question"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              label="Nivel"
              v-model="item.level"
              :items="['A', 'B', 'M']"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-select
              label="Respuesta"
              v-model="item.answer"
              :items="[1, 2, 3]"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="item.option1"
              :label="`Opción-${index + 1}`"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="item.option2"
              :label="`Opción-${index + 2}`"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="item.option3"
              :label="`Opción-${index + 3}`"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn large color="secondary" @click="addRow">Agregar pregunta</v-btn>
      <v-btn
        large
        :loading="loading"
        color="primary"
        @click="$emit('create-exam-by-manual', editedItem)"
        >Aceptar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Form",
  props: ["users", "subjects", "loading"],
  data() {
    return {
      id: 1,
      formTitle: "Añadir Examen ",
      editedItem: {
        name: "examen test",
        user_id: 1,
        subject_id: 1,
        questions: [
          {
            question: "pregua 1",
            level: "A",
            option1: "option 1",
            option2: "OPtion 2",
            option3: "option 3",
            answer: 1,
            number: 1,
          },
        ],
      },
    };
  },
  methods: {
    addRow() {
      this.id += 1;
      this.editedItem.questions.push({
        question: "",
        level: null,
        option1: null,
        option2: null,
        option3: null,
        answer: null,
        number: this.id,
      });
    },
  },
};
</script>
