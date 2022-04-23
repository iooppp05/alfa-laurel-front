<template>
  <div class="page-wrap">
    <v-form @submit.prevent="submit">
      <h2 class="text-center">{{ appName }}</h2>
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
      <v-btn type="submit" depressed color="primary" block>
        Iniciar sesión</v-btn
      >
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      appName: process.env.APP_NAME,
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
      await this.$store.dispatch("auth/login", this.credentials);
      await this.$router.replace({ name: "Admin" });
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
