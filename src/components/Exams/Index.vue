<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :loading="loading"
      loading-text="Cargando... por favor espere"
      :footer-props="{ 'items-per-page-text': 'Exámenes por página' }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Exámenes</v-toolbar-title>
          <v-divider class="mx-4" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
              @input="$store.commit('examen/CLOSE_CREATE_DIALOG')"
            :value="$store.state.examen.dialog"
            fullscreen
          >
            <template v-slot:activator="{ attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" @click="$store.commit('examen/OPEN_CREATE_DIALOG')">
                + Añadir Examen
              </v-btn>
            </template>
            <v-card>
              <v-stepper v-model="$store.state.examen.e1" flat outlined tile min-height="100%">
                <v-stepper-header>
                  <v-stepper-step :complete="$store.state.examen.e1 > 1" step="1" editable>
                    Instrucciones
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="$store.state.examen.e1 > 2" step="2" editable>
                    {{ optionName }}
                  </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card>
                      <v-card-title>Instrucciones</v-card-title>
                      <v-card-subtitle
                        >Para generar un nuevo examen tienes las siguientes
                        opciones:</v-card-subtitle
                      >
                      <v-card-text>
                        <v-list>
                          <v-list-item link @click="nextStep('Manual')">
                            <v-list-item-icon>
                              <v-icon color="primary">mdi-typewriter</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>Manualmente</v-list-item-title>
                          </v-list-item>
                          <v-list-item link @click="nextStep('Archivo')">
                            <v-list-item-icon>
                              <v-icon color="secondary">mdi-file</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title
                              >Archivo de Excel</v-list-item-title
                            >
                          </v-list-item>
                          <small>Con la siguiente estructura</small>
                        </v-list>
                        <keep-alive>
                          <v-simple-table desnse height="100%">
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-center">No.</th>
                                  <th class="text-center">Pregunta</th>
                                  <th class="text-center">
                                    Nivel <br />
                                    A | B | M
                                  </th>
                                  <th class="text-center">Respuesta 1</th>
                                  <th class="text-center">Respuesta 2</th>
                                  <th class="text-center">Respuesta 3</th>
                                  <th class="text-center">Correcta</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="text-center">1</td>
                                  <td class="text-center">Pregunta 1</td>
                                  <td class="text-center">A</td>
                                  <td class="text-center">opcion 1</td>
                                  <td class="text-center">opcion 2</td>
                                  <td class="text-center">opcion 3</td>
                                  <td class="text-center">1</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </keep-alive>
                      </v-card-text>
                    </v-card>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-card outlined>
                      <v-card-text>
                        <component
                          :is="typeComponent"
                          :users="users"
                          :subjects="subjects"
                          @saved="init"
                          ref="createExam"
                        >
                        </component>
                      </v-card-text>
                    </v-card>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card>
          </v-dialog>
          <v-dialog
            @input="resetUpdateForm"
            :value="$store.state.examen.dialogUpdate"
            fullscreen
          >
            <v-card outlined>
              <v-card-text class="mt-lg-16 mt-md-16">
                <ExamForm
                  :users="users"
                  :subjects="subjects"
                  :loading="isBtbBlocked"
                  formTitle="Actualizar examen"
                  ref="editForm"
                />
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <UpdateButton :id="item.id" />
        <DeleteButton :id="item.id" @submitted="showAlert" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { Examenes } from "@/services/Examenes";
import snackbar from "@/mixins/snackbar";
const ExamenesService = new Examenes();
import { initExamenes } from "@/services/Examenes";

export default {
  mixins: [snackbar],
  name: "Exámenes",
  components: {
    ExamForm: () => import("@/components/Exams/Form.vue"),
    FileForm: () => import("@/components/Exams/FileForm.vue"),
    UpdateButton: () => import("@/components/Exams/UpdateButton"),
  },
  data() {
    return {
      users: [],
      subjects: [],
      typeComponent: "FileForm",
      optionName: "",
      loading: true,
      idSelected: null,
      isBtbBlocked: false,
      dialog: false,
      dialogDelete: false,
      search: null,
      headers: [
        {
          text: "Nombre",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      desserts: [],
    };
  },
  created() {
    this.init()
  },
  methods: {
    resetUpdateForm(){
      this.$store.commit("examen/RESET_FORM");
      this.$store.commit("examen/CLOSE_UPDATE_DIALOG");
      this.$store.commit("examen/SET_STEP",1);
    },
   async init(){
      this.loading = true
      let { examenes, users, subjects } = await initExamenes();
      this.subjects = subjects;
      this.users = users;
      this.desserts = examenes;
      this.loading = false;
    },
    nextStep(type) {
      let isManual = type === "Manual";
      this.$store.commit('examen/SET_STEP',2)
      this.formTitle = isManual ? "Redactar Examen" : "";
      this.optionName = type;
      this.typeComponent = isManual ? "ExamForm" : "FileForm";
    },
    showAlert({success}){
      if (success) {
        this.$store.commit("settings/SHOW_SNACKBAR", {
          text: "¡Examen agregado correctamente!",
          color: this.$vuetify.theme.themes.light.secondary
        },{ root: true });
        this.init()
      }else {
        this.$store.commit("settings/SHOW_SNACKBAR", {
          text: "No se pudo eliminar el examen"
        }, { root: true });
      }
    },
    async save(data) {
      try {
        this.isBtbBlocked = true;
        await ExamenesService.store(data);
        await initExamenes();
        await this.showSnackBar(
          "Examen agregado correctamente",
          "success"
        );
      } catch (e) {
        this.showSnackBar( e.message);
      } finally {
        this.$store.commit("examen/CLOSE_CREATE_DIALOG")
        this.$store.commit("examen/RESET_FORM")
        this.$store.commit("examen/SET_STEP",1)

        this.isBtbBlocked = false;
        await this.init()
      }
    },
    async deleteSubject() {
      if (this.idSelected)
        try {
          this.isBtbBlocked = true;
          await ExamenesService.delete({
            examenId: this.idSelected,
          });
          await initExamenes();
          await this.showSnackBar(
            "Exito",
            "Examen  Eliminada correctamente",
            "success"
          );
          this.dialogDelete = false;
          this.isBtbBlocked = false;
        } catch (e) {
          this.showSnackBar(
            "Error",
            "No fue posible eliminar la Examen ",
            "error"
          );
        }
    },
  },
};
</script>

<style>
tbody tr td.text-start {
  text-transform: capitalize !important;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
}
</style>
