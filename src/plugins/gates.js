import Vue from "vue";
import VueGates from "vue-gates";

Vue.use(VueGates, {
  superRole: "admin",
  persistent: true,
});
