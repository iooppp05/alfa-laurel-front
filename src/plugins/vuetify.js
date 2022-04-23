import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0e2d6b',
        secondary: '#81c342',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
      dark: {
        primary: '#81c342',
        secondary: '#0e2d6b',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
