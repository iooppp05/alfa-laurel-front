export default {
  namespaced: true,
  state: {
    drawerState: false,
    permissions: null,
    loading: false,
    snackbar: {
      value: false,
      text: "",
      color: "warning",
      bottom: true,
    },
    links: [
      { text: "Materias", icon: "mdi-bookshelf", to: "/materias" },
      { text: "Exámenes", icon: "mdi-file-multiple-outline", to: "/examenes" },
    ],
  },
  mutations: {
    TOGGLE_DRAWER(state, status) {
      state.drawerState = status;
    },
    TOGGLE_LOADING(state, loading) {
      state.loading = loading;
    },
    SHOW_SNACKBAR(state, { value, text, color = "warning", bottom = true }) {
      state.snackbar = {
        value,
        text,
        color,
        bottom,
      };
      setTimeout(() => (state.snackbar.value = false), 3000);
    },
  },
  getters: {
    drawerState: (state) => state.drawerState,
  },
  actions: {},
};
