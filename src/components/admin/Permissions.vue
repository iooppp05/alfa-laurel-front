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
                <v-form ref="permissions-form">
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
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="isBtbBlocked"
                  text
                  :loading="isBtbBlocked"
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estas seguro de eliminar este permiso?</v-card-title
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
                  @click="deletePermission"
                  >OK</v-btn
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
import { RolesPermissions } from "@/services/RolePermissions";
const RolePermissionsService = new RolesPermissions();
export default {
  name: "Permissions",
  data() {
    return {
      formTitle: "Añadir permiso",
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
        await RolePermissionsService.setPermission(this.editedItem);
        await this.init();
        this.$store.commit("settings/SHOW_SNACKBAR", {
          text: "¡Permiso agregado correctamente!",
          color: this.$vuetify.theme.themes.light.secondary
        },{ root: true });
      } catch (e) {
        this.$store.commit("settings/SHOW_SNACKBAR", {
          text: "¡No fue posible agregar el permiso!",
        },{ root: true });
      } finally {
        this.dialog = false;
        this.isBtbBlocked = false;
        this.$refs["permissions-form"].reset();
      }
    },
    async deletePermission() {
      if (this.idSelected)
        try {
          this.isBtbBlocked = true;
          await RolePermissionsService.deletePermissions({
            permissionId: this.idSelected,
          });
          await this.init();
          this.$store.commit("settings/SHOW_SNACKBAR", {
            text: "¡Permiso Eliminado correctamente!",
            color: this.$vuetify.theme.themes.light.secondary
          },{ root: true });
        } catch (e) {
          this.$store.commit("settings/SHOW_SNACKBAR", {
            text: "¡No fue posible eliminar el permiso!",
          },{ root: true });
        }finally {
          this.dialogDelete = false;
          this.isBtbBlocked = false;
        }
    },
    async init() {
      let { data } = await RolePermissionsService.getPermissions();
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
