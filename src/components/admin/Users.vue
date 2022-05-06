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
      :footer-props="{ 'items-per-page-text': 'Usuarios por página' }"
    >
      <template v-slot:item.roles="{ item }">
        {{ item.roles | rolesFilter }}
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider class="mx-4" vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" fullscreen scrollable>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                @click="showDialog('create')"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                + Añadir Usuario
              </v-btn>
            </template>
            <v-card>
              <ValidationObserver v-slot="{ invalid }" ref="create-form">
                <v-card-text style="height: 90vh;">
                  <v-form ref="form">
                    <v-container>
                      <v-row>
                        <v-col>
                          <h4 class="text-h5">{{ formTitle }}</h4>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="6" lg="6" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Apellido paterno"
                            :rules="{
                              required: true,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.paternal_name"
                              label="Apellido paterno"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="6" lg="6" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Apellido materno"
                            :rules="{
                              required: true,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.maternal_name"
                              label="Apellido Materno"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="6" lg="6" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Nombre(s)"
                            :rules="{
                              required: true,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.name"
                              label="Nombre(s)"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="6" lg="6" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Correo electrónico"
                            :rules="{
                              required: true,
                              email: true,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.email"
                              label="Correo electrónico"
                              :error-messages="errors"
                              type="email"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="4" lg="4" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Contraseña"
                            :rules="`${
                              formTitle === 'Añadir Usuario' ? 'required' : ''
                            }`"
                          >
                            <v-text-field
                              v-model="editedItem.password"
                              type="password"
                              label="Contraseña"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="4" lg="4" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Código"
                            :rules="{
                              required: true,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.code"
                              label="Código"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="4" lg="4" sm="12">
                          <v-dialog
                            ref="dialog"
                            v-model="ModalBirthday"
                            :return-value.sync="editedItem.birthday"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <validation-provider
                                v-slot="{ errors }"
                                name="Fecha de nacimiento"
                                :rules="{
                                  required: true,
                                }"
                              >
                                <v-text-field
                                  v-model="editedItem.birthday"
                                  label="Fecha de nacimiento"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  :error-messages="errors"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </validation-provider>
                            </template>
                            <v-date-picker
                              v-model="editedItem.birthday"
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="ModalBirthday = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(editedItem.birthday)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </v-col>
                        <v-col cols="12" md="4" lg="4" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Dirección"
                            :rules="{
                              required: true,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.address"
                              label="Dirección"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="4" lg="4" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Teléfono"
                            :rules="{
                              required: true,
                              digits: 10,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.phone"
                              label="Teléfono"
                              type="tel"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="4" lg="4" sm="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Contacto"
                            :rules="{
                              required: true,
                            }"
                          >
                            <v-text-field
                              v-model="editedItem.contact_name"
                              label="Contacto"
                              :error-messages="errors"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="6" lg="6" sm="12">
                          <validation-provider
                              v-slot="{ errors }"
                              name="Rol"
                              :rules="{
                              required: true,
                            }"
                          >
                            <v-select
                                dense
                                label="Rol"
                                :error-messages="errors"
                                :items="roles"
                                v-model="roleSelected"
                            >
                            </v-select>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" md="6" lg="6" class="pt-0">
                          <v-textarea
                              auto-grow
                              dense
                              v-model="editedItem.comments"
                              label="Comentarios"
                              rows="1"
                          ></v-textarea>
                        </v-col>
                        <v-col v-show="!!permissionsRole.length" cols="12">
                          <small>Permisos:</small>
                          <v-card >
                            <v-card-text>
                              <v-chip-group
                                  active-class="primary--text"
                                  column
                                  v-if="roleSelected"
                              >
                                <v-chip
                                    v-for="permissionRole in permissionsRole"
                                    :key="permissionRole"
                                >
                                  {{ permissionRole }}
                                </v-chip>
                              </v-chip-group>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      :disabled="isBtbBlocked || invalid"
                      text
                      :loading="isBtbBlocked"
                      @click="save"
                  >
                    Guardar
                  </v-btn>

                </v-card-actions>
              </ValidationObserver>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estas seguro de eliminar este usuario?</v-card-title
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
                  @click="deleteUser"
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
import { Users } from "@/services/Users";
import { RolesPermissions } from "@/services/RolePermissions";
import snackbar from "@/mixins/snackbar";
const UserService = new Users();
const RolePermissionsService = new RolesPermissions();
export default {
  filters: {
    rolesFilter(roles) {
      return roles.map((role) => role.name).join(" | ");
    },
  },
  mixins: [snackbar],
  name: "usuarios",
  data() {
    return {
      formTitle: "Añadir Usuario",
      roleSelected: null,
      loading: true,
      idSelected: null,
      isBtbBlocked: false,
      ModalBirthday: false,
      editedItem: {
        name: null,
        paternal_name: null,
        maternal_name: null,
        email: null,
        password: null,
        code: null,
        birthday: null,
        address: null,
        phone: null,
        contact_name: null,
        comments: null,
      },
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
        {
          text: "Correo Electrónico",
          filterable: true,
          value: "email",
        },
        {
          text: "Rol",
          filterable: true,
          value: "roles",
        },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      desserts: [],
      roles: [],
    };
  },
  created() {
    this.init();
    this.getRoles();
  },
  methods: {
    async getRoles() {
      let { data } = await RolePermissionsService.getRoles();
      this.roles = data.map((role) => {
        return {
          value: role.name,
          text: role.name.toUpperCase(),
          permissions: role.permissions,
        };
      });
    },
    async showDialog(name, idSelected = 0) {
      let response;
      switch (name) {
        case "create":
          this.formTitle = "Añadir Usuario";
          this.dialog = !this.dialog;
          this.editedItem = {
            name: null,
            paternal_name: null,
            maternal_name: null,
            email: null,
            password: null,
            code: null,
            birthday: null,
            address: null,
            phone: null,
            contact_name: null,
            comments: null,
          };
          this.roleSelected = null;
          break;
        case "delete":
          this.dialogDelete = !this.dialogDelete;
          this.idSelected = idSelected;
          break;
        case "update":
          this.formTitle = "Actualizar usuario";
          this.editedItem = {
            name: null,
            paternal_name: null,
            maternal_name: null,
            email: null,
            password: null,
            code: null,
            birthday: null,
            address: null,
            phone: null,
            contact_name: null,
            comments: null,
          };
          this.dialog = !this.dialog;
          this.idSelected = idSelected;
          response = await UserService.get({ userId: idSelected });
          this.editedItem = response.data;
          this.roleSelected = response.data.roles[0]?.name;
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
        let isStore = this.formTitle === "Añadir Usuario";
        if (this.roleSelected) {
          this.editedItem.role = this.roleSelected;
        }
        if (isStore) {
          await UserService.store({ userData: this.editedItem });
        } else {
          await UserService.update({
            userId: this.idSelected,
            data: this.editedItem,
          });
        }

        await this.init();
        await this.showSnackBar(
          `Usuario ${isStore ? "agregado" : "actualizado"}   correctamente`,
          "success"
        );
        this.dialog = false;
        this.isBtbBlocked = false;
        this.roleSelected = null;
      } catch (e) {
        let text = e.response.data.message;
        this.showSnackBar( text);
      } finally {
        this.isBtbBlocked = false;
      }
    },
    async deleteUser() {
      if (this.idSelected)
        try {
          this.isBtbBlocked = true;
          await UserService.delete({
            userId: this.idSelected,
          });
          await this.init();
          await this.showSnackBar(
            "Usuario Eliminado correctamente",
            "success"
          );
          this.dialogDelete = false;
          this.isBtbBlocked = false;
        } catch (e) {
          this.showSnackBar(
            "No fue posible eliminar al usuario",
            "error"
          );
        } finally {
          this.isBtbBlocked = false;
        }
    },
    async init() {
      let { data } = await UserService.all();
      this.desserts = data;
      this.editedItem = { name: null };
      this.loading = false;
    },
  },
  computed: {
    permissionsRole() {
      let [permissionsRole] = this.roles
        .filter((role) => role.value === this.roleSelected)
        .map((role) => role.permissions.map((permission) => permission.name));
      return permissionsRole || [];
    },
  },
};
</script>

<style>
tbody tr td.text-start {
  text-transform: capitalize !important;
}
</style>
