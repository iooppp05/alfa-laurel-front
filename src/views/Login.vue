<template>
  <div class="page-wrap">
    <v-form @submit.prevent="submit">
      <h2 class="text-center text-h3 text--primary font-weight-bold py-5">
        {{ appName }}
      </h2>
      <v-text-field
        v-model="credentials.email"
        label="Correo electrónico"
        required
      ></v-text-field>
      <v-text-field
        v-model="credentials.password"
        type="password"
        required
        label="Contraseña"
      ></v-text-field>
      <v-btn
        type="submit"
        :loading="this.$store.state.settings.loading"
        depressed
        color="primary"
        block
      >
        Iniciar sesión</v-btn
      >
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      appName: "Instituto Alfa Laurel",
      credentials: {
        email: "admin@example.com",
        password: "password",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta["darkTheme"]) {
      this.$vuetify.theme.ligth = true;
    }
    next();
  },
  methods: {
    async submit() {
      try {
        this.$store.commit("settings/TOGGLE_LOADING", true);
        await this.$store.dispatch("auth/login", this.credentials);
        this.$store.commit("settings/TOGGLE_LOADING", false);
        await this.initRolesPermissions();
        await this.$router.replace({
          name: this.$store.getters["auth/isAdmin"] ? "Admin" : "Home",
        });
      } catch (e) {
        console.log("1");
      }
    },
    initRolesPermissions() {
      this.$gates.setRoles(
        this.$store.state.auth.roles.map((role) => role.name)
      );
      this.$gates.setPermissions(
        this.$store.state.auth.permissions.map((permission) => permission.name)
      );
    },
  },
};
</script>
<style>
.page-wrap {
  display: flex;
  align-items: center;
  padding: 40px 1rem;
  height: 100%;
  min-height: 100vh;
}
.page-wrap form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
