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
      :footer-props="{ 'items-per-page-text': 'Materias por página' }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Materias</v-toolbar-title>
          <v-divider class="mx-4" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                @click="showDialog('create')"
              >
                + Añadir Materia
              </v-btn>
            </template>
            <v-card>
              <ValidationObserver v-slot="{ invalid }">
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-form ref="subject-form">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Nombre"
                            :rules="{
                              required: true,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.name"
                              label="Nombre"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    :disabled="invalid"
                    text
                    :loading="isBtbBlocked"
                    @click="save"
                  >
                    Aceptar
                  </v-btn>
                </v-card-actions>
              </ValidationObserver>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estas seguro de eliminar esta Materia?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  :disabled="isBtbBlocked"
                  text
                  :loading="isBtbBlocked"
                  @click="deleteSubject"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="showDialog('delete', item.id)" plain>
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { Subjects } from "@/services/Subjects";
import snackbar from "@/mixins/snackbar";
const SubjectsService = new Subjects();
export default {
  mixins: [snackbar],
  name: "Materias",
  data() {
    return {
      formTitle: "Añadir Materia",
      loading: true,
      idSelected: null,
      isBtbBlocked: false,
      editedItem: { name: null },
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
    this.init();
  },
  methods: {
    showDialog(name, idSelected = 0) {
      switch (name) {
        case "delete":
          this.dialogDelete = !this.dialogDelete;
          this.idSelected = idSelected;
          break;
        case "update":
          this.dialog = !this.dialog;
          this.editedItem = { name: null };
          break;
        case "create":
          this.dialog = !this.dialog;
          break;
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
      });
    },
    async save() {
      try {
        this.isBtbBlocked = true;
        await SubjectsService.store(this.editedItem);
        await this.init();
        await this.showSnackBar(
          "Materia agregada correctamente",
          "success"
        );
      } catch (e) {
        let text = "Desconocido";
        if (e.response?.data?.message?.includes("already exists")) {
          text = "Ya existe";
        }
        this.showSnackBar( text);
      } finally {
        this.dialog = false;
        this.isBtbBlocked = false;
        this.$refs["subject-form"].reset();
      }
    },
    async deleteSubject() {
      if (this.idSelected)
        try {
          this.isBtbBlocked = true;
          await SubjectsService.delete({
            subjectId: this.idSelected,
          });
          await this.init();
          await this.showSnackBar(
            "Materia Eliminada correctamente",
            "success"
          );
          this.dialogDelete = false;
          this.isBtbBlocked = false;
        } catch (e) {
          this.showSnackBar(
            "No fue posible eliminar la materia",
            "error"
          );
        }
    },
    async init() {
      let { data } = await SubjectsService.all();
      this.desserts = data;
      this.editedItem = { name: null };
      this.loading = false;
    },
  },
};
</script>

<style>
tbody tr td.text-start {
  text-transform: capitalize !important;
}
</style>
