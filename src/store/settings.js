export default {
  namespaced: true,
  state: {
    drawerState: false,
    adminLinks: [
      {
        title: "Roles y permisos",
        action: "mdi-account-group-outline",
        items: [
          { title: "Usuarios", icon: "mdi-account-outline", active: true },
          { title: "Roles", icon: "mdi-account-details-outline" },
          { title: "Permisos", icon: "mdi-account-key-outline" },
        ],
      },
    ],
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
