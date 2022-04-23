import axios from "axios";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    logged: false,
    user: null,
    token: window.localStorage.getItem("token"),
  },
  mutations: {
    SET_LOGGED(state, logged) {
      state.logged = logged;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      window.localStorage.setItem("token", token);
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      await dispatch("me");
    },
    async token_login({ dispatch, commit }, credentials) {
      try {
        const { data } = await axios.post("/api/login", credentials);
        commit("SET_TOKEN", data);
        await dispatch("me");
      } catch (e) {
        commit("SET_LOGGED", false);
        commit("SET_TOKEN", null);
      }
    },
    async logout({ state, commit }) {
      await axios.post("/logout");
      commit("SET_USER", null);
      commit("SET_LOGGED", false);
      if (!state.user) await router.push("/login");
    },
    async token_logout({ commit }) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
    },
    async me({ commit }) {
      try {
        const { data } = await axios.get("/api/user");
        commit("SET_LOGGED", true);
        commit("SET_USER", data);
      } catch (e) {
        commit("SET_LOGGED", false);
        commit("SET_USER", null);
      }
    },
  },
  getters: {
    userAvatar(state) {
      if (state.user) return state.user.name[0] + state.user.paternal_name[0];
    },
  },
};
