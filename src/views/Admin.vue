<template>
  <router-view></router-view>
</template>
<script>
export default {
  methods: {
    middleware() {
      // If the user is not an admin
      this.$gates.getRoles();
      if (!this.$gates.hasAnyRole("admin|control_escolar")) {
        return this.$router.push("/");
      }
    },
  },
  mounted() {
    this.middleware();
  },
};
</script>
