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
            @input="e1 = 1"
            :value="$store.state.examen.dialog"
            fullscreen
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                + Añadir Examen
              </v-btn>
            </template>
            <v-card>
              <v-stepper v-model="e1" flat outlined tile min-height="100%">
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1" editable>
                    Instrucciones
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="e1 > 2" step="2" editable>
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
                          :loading="isBtbBlocked"
                          @create-exam-by-file="save"
                          @create-exam-by-manual="save"
                          @closeForm="dialog = !dialog"
                          formTitle="Redactar Examen"
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estas seguro de eliminar esta Examen ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false"
                  >Cancelar</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  :disabled="isBtbBlocked"
                  text
                  @click="deleteSubject"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog :value="$store.state.examen.dialogUpdate" fullscreen>
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
        <!--        <v-btn-->
        <!--          :loading="loading"-->
        <!--          @click="showDialog('update', )"-->
        <!--          plain-->
        <!--        >-->
        <!--          <v-icon> mdi-update </v-icon>-->
        <!--        </v-btn>-->
        <v-btn @click="showDialog('delete', item.id)" plain>
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { Examenes } from "@/services/Examenes";
import { Subjects } from "@/services/Subjects";
import { Users } from "@/services/Users";
import snackbar from "@/mixins/snackbar";
const ExamenesService = new Examenes();
const SubjectsService = new Subjects();
const UserService = new Users();
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
      e1: 1,
      optionName: "",
      loading: true,
      idSelected: null,
      isBtbBlocked: false,
      dialog: false,
      dialogDelete: false,
      dialogUpdate: false,
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
    this.init();
  },
  methods: {
    nextStep(type) {
      let isManual = type === "Manual";
      this.e1 = 2;
      this.formTitle = isManual ? "Redactar Examen" : "";
      this.optionName = type;
      this.typeComponent = isManual ? "ExamForm" : "FileForm";
    },
    showDialog(name, idSelected = 0) {
      switch (name) {
        case "delete":
          this.dialogDelete = !this.dialogDelete;
          this.idSelected = idSelected;
          break;
      }
    },
    close() {
      this.dialog = false; //todo
      this.$nextTick(() => {
        this.editedIndex = -1;
      });
    },
    async save(data) {
      try {
        this.isBtbBlocked = true;
        await ExamenesService.store(data);
        await this.init();
        await this.showSnackBar(
          "Exito",
          "Examen agregado correctamente",
          "success"
        );
      } catch (e) {
        let text = "Desconocido",
          tag = "Error";
        if (e.response?.data?.message?.includes("already exists")) {
          text = "Ya existe";
          tag = `Role ${data.name}`;
        }
        this.showSnackBar(tag, text);
      } finally {
        this.dialog = false; //todo
        this.isBtbBlocked = false;
      }
    },
    async deleteSubject() {
      if (this.idSelected)
        try {
          this.isBtbBlocked = true;
          await ExamenesService.delete({
            examenId: this.idSelected,
          });
          await this.init();
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
    async init() {
      let { data } = await ExamenesService.all();
      let users = await UserService.all();
      let subjects = await SubjectsService.all();
      this.subjects = subjects.data.map((item) => {
        return { value: item.id, text: item.name };
      });
      this.users = users.data.map((item) => {
        return { value: item.id, text: item.name };
      });
      this.desserts = data;
      this.loading = false;
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
