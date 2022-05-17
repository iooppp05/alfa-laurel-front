<template>
  <ValidationObserver v-slot="{ invalid }" ref="store-file-exam-form">
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
          <validation-provider
              v-slot="{ errors }"
              name="Titulo del examen"
              :rules="{required: true}"
          >
            <v-text-field
                label="Titulo del examen"
                :error-messages="errors"
                v-model="name"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="6">
          <validation-provider
              v-slot="{ errors }"
              name="Materia"
              :rules="{required: true}"
          >
          <v-select
            label="Materia"
            :items="subjects"
            :error-messages="errors"
            v-model="subject_id"
          >
          </v-select>
          </validation-provider>
        </v-col>
        <v-col cols="6">
          <validation-provider
              v-slot="{ errors }"
              name="Profesor"
              :rules="{required: true}"
          >
          <v-select
            v-model="user_id"
            label="Profesor"
            :error-messages="errors"
            :items="users"
          >
          </v-select>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider
              v-slot="{ errors }"
              name="Archivo"
              :rules="{required: true}"
          >
          <v-file-input
            show-size
            :error-messages="errors"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            v-model="file"
          ></v-file-input>
          </validation-provider>
        </v-col>
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
              outlined
              :error-messages="errors"
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
              dense
              :error-messages="errors"
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
              dense
              :error-messages="errors"
              type="number"
              label="Nivel alto"
              v-model.number="high"
          ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <v-btn
            :loading="loading"
            block
            large
            :disabled="invalid"
            color="secondary"
            @click="save"
            >Cargar examen</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </ValidationObserver>
</template>

<script>
import { store } from "@/services/Examenes";
export default {
  name: "FileForm",
  props: ["subjects", "users"],
  data() {
    return  {
      loading: false,
    }
  },
  methods: {
    async save() {
      try {
        this.loading = true;
        this.$refs['store-file-exam-form'].validate().then( success => {
          if (!success) {
            return;
          }
        })
        await store(this.$store.state.examen.editedItem);
        this.$emit("saved", {success: true})// dispara showAlert

      } catch (e) {
        this.$emit("saved", {success: false})
      } finally {
        this.$store.commit("examen/CLOSE_CREATE_DIALOG")
        this.$store.commit("examen/RESET_FORM")
        this.$store.commit("examen/SET_STEP",1)
        await this.$refs['store-file-exam-form'].reset()
        this.loading = false;
      }
    },
  },
  computed:{
    name:{
      get(){
        return this.$store.state.examen.editedItem.name ;
      },
      set(value){
        this.$store.commit("examen/UPDATE_NAME",value);
      }
    },
    user_id:{
      get(){
        return this.$store.state.examen.editedItem.user_id;
      },
      set(value){
        this.$store.commit("examen/UPDATE_USER_ID", value);
      }
    },
    subject_id:{
      get(){
        return this.$store.state.examen.editedItem.subject_id ;
      },
      set(value){
        this.$store.commit("examen/UPDATE_SUBJECT_ID", value);
      }
    },
    file:{
      get(){
        return this.$store.state.examen.editedItem.file ;
      },
      set(value){
        this.$store.commit("examen/UPDATE_FILE", value);
      }
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
  },
};
</script>
