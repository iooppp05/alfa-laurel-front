import axios from "axios";

export default {
  namespaced: true,
  state: {
    logged: false,
    user: null,
    token: window.localStorage.getItem("token"),
    roles: null, //roles del usuario
    permissions: null, //permisos del usuario
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
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_PERMISSIONS(state, permissions) {
      state.permissions = permissions;
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
    async logout({ commit }) {
      await axios.post("/logout");
      commit("SET_USER", null);
      commit("SET_LOGGED", false);
      commit("SET_ROLES", null);
      commit("SET_PERMISSIONS", null);
    },
    async token_logout({ commit }) {
      commit("SET_USER", null);
      commit("SET_LOGGED", false);
      commit("SET_TOKEN", null);
      commit("SET_ROLES", null);
      commit("SET_PERMISSIONS", null);
    },
    async me({ commit }) {
      try {
        const { data } = await axios.get("/api/user");
        commit("SET_LOGGED", true);
        commit("SET_USER", data);
        commit("SET_ROLES", data.roles);
        commit("SET_PERMISSIONS", data.permissions);
      } catch (e) {
        commit("SET_LOGGED", false);
        commit("SET_USER", null);
      }
    },
  },
  getters: {
    userAvatar(state) {
      return state.user
        ? state.user.name[0] + state.user.paternal_name[0]
        : null;
    },
    isAdmin(state) {
      return !!state.roles?.some((role) => role.name === "admin");
    },
  },
};
