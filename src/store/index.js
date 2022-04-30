import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import settings from "./settings";
import examen from "./examen";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    settings,
    examen,
  },
});
