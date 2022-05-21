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
    dialog:false,
    links: [
      { text: "Materias", icon: "mdi-bookshelf", to: "/materias" },
      { text: "Exámenes", icon: "mdi-file-multiple-outline", to: "/examenes" },
    ],
  },
  mutations: {
    TOGGLE_DIALOG(state, value) {
      state.dialog = value;
    },
    CLOSE_SNACKBAR(state){
      state.snackbar.value = false;
    },
    TOGGLE_DRAWER(state, status) {
      state.drawerState = status;
    },
    TOGGLE_LOADING(state, loading) {
      state.loading = loading;
    },
    SHOW_SNACKBAR(state, { text, value = true, color = "error", bottom = true }) {
      state.snackbar = {
        value,
        text,
        color,
        bottom,
      };
    },
  },
  getters: {
    drawerState: (state) => state.drawerState,
  },
  actions: {},
};
