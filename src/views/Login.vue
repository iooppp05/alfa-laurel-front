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
import snackbar from "@/mixins/snackbar";
export default {
  mixins: [snackbar],
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
    async login() {
      try {
        this.$store.commit("settings/TOGGLE_LOADING", true);
        await this.$store.dispatch("auth/login", this.credentials);
      } catch (e) {
        const [errors] = Object.entries(e.response?.data?.errors);
        this.showSnackBar(errors[0], errors[1]);
      } finally {
        this.$store.commit("settings/TOGGLE_LOADING", false);
      }
    },
    async submit() {
      try {
        await this.login();
        if (this.$store.state.auth.logged) {
          await this.initRolesPermissions();
          await this.$router.replace({
            name: this.$store.getters["auth/isAdmin"] ? "Admin" : "Home",
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    initRolesPermissions() {
      try {
        this.$gates.setRoles(
          this.$store.state.auth.roles.map((role) => role.name)
        );
        this.$gates.setPermissions(
          this.$store.state.auth.permissions.map(
            (permission) => permission.name
          )
        );
      } catch (e) {
        console.error(e.message);
      }
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
