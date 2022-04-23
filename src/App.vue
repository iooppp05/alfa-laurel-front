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
            <v-list-item :key="3" link>
              <v-list-item-title>
                <v-icon v-text="'mdi-account-multiple-outline'"></v-icon>
                Usuarios
              </v-list-item-title>
            </v-list-item>
            <v-list-item :key="4" link>
              <v-list-item-title>
                <v-icon v-text="'mdi-badge-account-horizontal-outline'"></v-icon>
                Roles
              </v-list-item-title>
            </v-list-item>
            <v-list-item :key="5" link>
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
      <v-app-bar-nav-icon
        class="white--text"
        @click="
          $store.commit(
            'settings/TOGGLE_DRAWER',
            !$store.state.settings.drawerState
          )
        "
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        Instituto Alfa Laurel</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-tooltip v-if="!$vuetify.theme.dark" bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="secondary" dark small @click="darkMode">
            <v-icon color="primary">mdi-lightbulb-off-outline</v-icon>
          </v-btn>
        </template>
        <span>Desactivar modo día</span>
      </v-tooltip>

      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="primary" small @click="darkMode">
            <v-icon color="secondary">mdi-lightbulb-on-outline</v-icon>
          </v-btn>
        </template>
        <span>Activar modo día</span>
      </v-tooltip>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
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
    adminLinks() {
      return this.$store.state.settings.adminLinks;
    },
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    async logout() {
      await this.$store.dispatch("auth/logout", null, { root: true });
      await this.$router.replace({ name: "Home" });
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
