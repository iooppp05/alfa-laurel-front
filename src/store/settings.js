export default {
  namespaced: true,
  state: {
    drawerState: false,
    permissions: null,
    links: [
      { text: "Materias", icon: "mdi-bookshelf" },
      { text: "Exámenes", icon: "mdi-file-multiple-outline" },
    ],
  },
  mutations: {
    TOGGLE_DRAWER(state, status) {
      state.drawerState = status;
    },
  },
  getters: {
    drawerState: (state) => state.drawerState,
  },
  actions: {},
};
