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
      :footer-props="{ 'items-per-page-text': 'Permisos por página' }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Permisos</v-toolbar-title>
          <v-divider class="mx-4" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                + Añadir Permiso
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--          <v-dialog v-model="dialogDelete" max-width="500px">-->
          <!--            <v-card>-->
          <!--              <v-card-title class="text-h5"-->
          <!--                >Are you sure you want to delete this item?</v-card-title-->
          <!--              >-->
          <!--              <v-card-actions>-->
          <!--                <v-spacer></v-spacer>-->
          <!--                <v-btn color="blue darken-1" text @click="closeDelete"-->
          <!--                  >Cancel</v-btn-->
          <!--                >-->
          <!--                <v-btn color="blue darken-1" text @click="deleteItemConfirm"-->
          <!--                  >OK</v-btn-->
          <!--                >-->
          <!--                <v-spacer></v-spacer>-->
          <!--              </v-card-actions>-->
          <!--            </v-card>-->
          <!--          </v-dialog>-->
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{}">
        <v-btn plain>
          <v-icon class="mr-2"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn plain>
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { RolesPermissions } from "@/services/RolePermissions";
import snackbar from "@/mixins/snackbar";
const RolePermissionsService = new RolesPermissions();
export default {
  mixins: [snackbar],
  name: "Permissions",
  data() {
    return {
      formTitle: "Añadir permiso",
      editedItem: { name: null },
      dialog: false,
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
  async created() {
    let { data } = await RolePermissionsService.getPermissions();
    this.desserts = data;
  },
  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
      });
    },
    async save() {
      try {
        await RolePermissionsService.setPermission(this.editedItem);
      } catch (e) {
        let text = "",
          tag = "";
        if (e.response.data.message.includes("already exists")) {
          text = "Ya existe";
          tag = `Permiso ${this.editedItem.name}`;
        }
        this.showSnackBar(tag, text);
      }
    },
  },
};
</script>

<style>
tbody tr td.text-start {
  text-transform: capitalize !important;
}
</style>
