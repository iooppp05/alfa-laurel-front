<template>
  <v-app class="custom-app">
    <v-navigation-drawer clipped v-model="drawerState" v-if="authenticated" app>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-group :value="true" no-action>
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon v-text="'mdi-account-group-outline'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Roles y permisos</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item :key="3" to="/admin/users" link>
              <v-list-item-title>
                <v-icon v-text="'mdi-account-multiple-outline'"></v-icon>
                Usuarios
              </v-list-item-title>
            </v-list-item>
            <v-list-item :key="4" to="/admin/roles" link>
              <v-list-item-title>
                <v-icon
                  v-text="'mdi-badge-account-horizontal-outline'"
                ></v-icon>
                Roles
              </v-list-item-title>
            </v-list-item>
            <v-list-item :key="5" to="/admin/permissions" link>
              <v-list-item-title>
                <v-icon v-text="'mdi-shield-account-outline'"></v-icon>
                Permisos
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item v-for="(link, i) in links" :key="i">
            <v-list-item-icon>
              <v-icon v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="authenticated" color="primary" clipped-left app>
      <v-toolbar-title class="order-lg-1 order-md-1 order-sm-2 order-2">
        <h5 class="white--text text-body-1 ml-xs-8">
          <span>Instituto</span> Alfa Laurel
        </h5>
      </v-toolbar-title>
      <div class="order-lg-2 order-md-2 order-sm-1 order-1">
        <v-app-bar-nav-icon
          class="white--text order-1"
          @click="
            $store.commit(
              'settings/TOGGLE_DRAWER',
              !$store.state.settings.drawerState
            )
          "
        ></v-app-bar-nav-icon>
      </div>
      <v-spacer class="order-3"></v-spacer>
      <div class="order-4">
        <v-menu transition="slide-x-transition" bottom right offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              color="secondary"
              fab
              plain
              small
              outlined
            >
              {{ userAvatar }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/edit-account" link>
              <v-list-item-title>
                <v-icon v-text="'mdi-account-circle-outline'"></v-icon>
                Mi cuenta</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click.stop="logout" link>
              <v-list-item-title>
                <v-icon v-text="'mdi-logout'"></v-icon>
                Salir</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
        <v-snackbar
          :value="$store.state.settings.snackbar.value"
          :color="$store.state.settings.snackbar.color"
        >
          {{ $store.state.settings.snackbar.text }}
        </v-snackbar>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
  <!-- App.vue -->
</template>
<script>
export default {
  data() {
    return {
      selectedItem: 0,
    };
  },
  computed: {
    userAvatar() {
      return this.$store.getters["auth/userAvatar"];
    },
    authenticated() {
      return this.$store.state.auth.logged;
    },
    user() {
      return this.$store.state.auth.user;
    },
    drawerState: {
      get() {
        return this.$store.getters["settings/drawerState"];
      },
      set(v) {
        return this.$store.commit("settings/TOGGLE_DRAWER", v);
      },
    },
    links() {
      return this.$store.state.settings.links;
    },
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    async logout() {
      this.$gates.setPermissions([]);
      this.$gates.setRoles([]);
      await this.$store.dispatch("auth/logout", null, { root: true });
      // await this.$router.replace({ name: "Home" }); ya redirecciono desde vuex
    },
    async token_logout() {
      await this.$store.dispatch("auth/token_logout", null, { root: true });
      await this.$router.replace({ name: "Home" });
    },
  },
};
</script>
<style>
.custom-app {
  min-height: 100vh;
}
</style>
