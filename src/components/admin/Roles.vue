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
      :footer-props="{ 'items-per-page-text': 'Roles por página' }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Roles</v-toolbar-title>
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
                + Añadir Rol
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-combobox
                          v-model="editedItem.permissions"
                          :items="permissions"
                          label="permisos"
                          multiple
                          chips
                        ></v-combobox>
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
                >¿Estas seguro de eliminar este rol?</v-card-title
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
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="showDialog('update', item.id)" plain>
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-btn @click="showDialog('delete', item.id)" plain>
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
  name: "Roles",
  methods: {
    showDialog(name, idSelected = 0) {
      switch (name) {
        case "delete":
          this.dialogDelete = !this.dialogDelete;
          this.idSelected = idSelected;
          break;
        case "update":
          this.action = "PUT";
          this.formTitle = "Editar Rol";
          this.dialog = !this.dialog;
          this.idSelected = idSelected;
          this.getRole(idSelected);
          break;
        case "create":
          this.action = "POST";
          this.editedItem = { name: null, permissions: [] };
          this.dialog = !this.dialog;
          this.formTitle = "Añadir Rol";
          break;
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = [];
        this.editedIndex = -1;
      });
    },
    async save() {
      try {
        this.isBtbBlocked = true;
        this.action === "POST"
          ? await RolePermissionsService.setRole(this.editedItem)
          : await RolePermissionsService.updateRole({
              role_id: this.idSelected,
              name: this.editedItem.name,
              permissions: this.editedItem.permissions,
            });
        await this.init();
        await this.showSnackBar(
          "Exito",
          "Rol agregado correctamente",
          "success"
        );
      } catch (e) {
        this.showSnackBar(`Error`, e.response.data.message);
      } finally {
        this.dialog = false;
        this.isBtbBlocked = false;
      }
    },
    async deletePermission() {
      if (this.idSelected)
        try {
          this.isBtbBlocked = true;
          await RolePermissionsService.deleteRole({
            roleId: this.idSelected,
          });
          await this.init();
          await this.showSnackBar(
            "Exito",
            "Rol Eliminado correctamente",
            "success"
          );
          this.dialogDelete = false;
          this.isBtbBlocked = false;
        } catch (e) {
          this.showSnackBar("Error", "No fue posible eliminar el rol", "error");
        }
    },
    async init() {
      let { data } = await RolePermissionsService.getRoles();
      let permissions = await RolePermissionsService.getPermissions();
      this.permissions = permissions.data.map((role) => {
        return { text: role.name.toUpperCase(), value: role.name };
      });
      this.desserts = data;
      this.editedItem = { name: null, permissions: [] };
      this.loading = false;
    },
    async getRole(idSelected) {
      let { data } = await RolePermissionsService.getRole(idSelected);
      this.editedItem.name = data.name;
      this.editedItem.permissions = data.permissions.map((permission) => {
        return {
          value: permission.name,
          text: permission.name.toUpperCase(),
        };
      });
    },
  },
  data() {
    return {
      action: "GET",
      formTitle: "Añadir Rol",
      loading: true,
      idSelected: null,
      isBtbBlocked: false,
      editedItem: { name: null, permissions: [] },
      dialog: false,
      dialogDelete: false,
      search: null,
      permissions: [],
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
};
</script>

<style>
tbody tr td.text-start {
  text-transform: capitalize !important;
}
</style>
