<template>
  <ValidationObserver v-slot="{ invalid }" ref="store-exam-form">
    <v-form ref="form">
    <v-container>
      <v-row>
        <v-col>
          <h5 class="text-h5">Redactar Examen</h5>
          <small class="text-secondary">*Todos los campos son requeridos</small>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <validation-provider
              v-slot="{ errors }"
              name="Nombre"
              :rules="{required: true}"
          >
            <v-text-field
                label="Titulo del examen"
                v-model="name"
                :error-messages="errors"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="4">
          <validation-provider
              v-slot="{ errors }"
              name="Materia"
              :rules="{required: true}"
          >
          <v-select
              label="Materia"
              :items="subjects"
              v-model="subject_id"
              :error-messages="errors"
          />
          </validation-provider>
        </v-col>
        <v-col cols="4">
          <validation-provider
              v-slot="{ errors }"
              name="Profesor"
              :rules="{required: true}"
          >
          <v-select
              label="Profesor"
              :items="users"
              :error-messages="errors"
              v-model="user_id"/>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="text-caption">¿Numero de preguntas por nivel?</p>
        </v-col>
        <v-col cols="12" md="2" lg="2">
          <validation-provider
              v-slot="{ errors }"
              name="Nivel bajo"
              :rules="{required: true}"
          >
          <v-text-field
              :error-messages="errors"
              outlined
              dense
              type="number"
              label="Nivel bajo"
              v-model.number="low"
          ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12" md="2" lg="2">
          <validation-provider
              v-slot="{ errors }"
              name="Nivel medio"
              :rules="{required: true}"
          >
          <v-text-field
              outlined
              :error-messages="errors"
              dense
              type="number"
              label="Nivel medio"
              v-model.number="medium"
          ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12" md="2" lg="2">
          <validation-provider
              v-slot="{ errors }"
              name="Nivel alto"
              :rules="{required: true}"
          >

          <v-text-field
              outlined
              :error-messages="errors"
              dense
              type="number"
              label="Nivel alto"
              v-model.number="high"
          ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12" class="py-0">
          <small
              v-if="$store.getters['examen/totalQuestions']"
              class="text-caption">Total de preguntas: {{$store.getters['examen/totalQuestions']}}</small>
        </v-col>
      </v-row>
      <questions-component
        ref="questionComponent"
        v-for="question in questions"
        :options="question.options"
        :key="question.name"
        :question="question"
      />
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="secondary" tile class="mx-3" @click="addRow"
            >Agregar pregunta</v-btn
          >
        </v-col>
        <v-col class="d-flex justify-end">
          <CancelButton @reset-form="$refs.form.reset()"/>
<!--          todo refactor saved-->
          <SaveButton :invalid="invalid" @saved="saved"/>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </ValidationObserver>
</template>

<script>
export default {
  name: "Form",
  props: ["users", "subjects"],
  components: {
    CancelButton: () => import("./CancelButton.vue"),
    QuestionsComponent: () => import("./Question.vue"),
    SaveButton: () => import("./SaveButton.vue"),
  },
  data() {
    return {
      id: 1,
      isBtbBlocked: false,
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.state.examen.editedItem.name;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_NAME", value);
      },
    },
    subject_id: {
      get() {
        return this.$store.state.examen.editedItem.subject_id;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_SUBJECT_ID", value);
      },
    },
    user_id: {
      get() {
        return this.$store.state.examen.editedItem.user_id;
      },
      set(value) {
        this.$store.commit("examen/UPDATE_USER_ID", value);
      },
    },
    low: {
      get() {
        return this.$store.state.examen.editedItem.low;
      },
      set(value) {
        this.$store.commit("examen/SET_LOW", value)
      }
    },
    medium: {
      get() {
        return this.$store.state.examen.editedItem.medium;
      },
      set(value) {
        this.$store.commit("examen/SET_MEDIUM",value)
      }
    },
    high: {
      get() {
        return this.$store.state.examen.editedItem.high;
      },
      set(value) {
        this.$store.commit("examen/SET_HIGH",value)
      }
    },
    questions() {
      return this.$store.state.examen.editedItem.questions;
    },
  },
  methods: {
    saved() {
      this.$refs['store-exam-form'].validate().then(success => {
        if(success) {
          this.$emit('saved')
        }
      })
    },
    reset(){
      this.e1 = 1;
      this.$refs.form.reset();
    },
    addRow() {
      this.id += 1;
      this.$store.commit("examen/ADD_QUESTION");
    },
    removeRow() {
      this.id--;
      this.$store.commit("examen/REMOVE_QUESTION");
    },
  },
};
</script>
