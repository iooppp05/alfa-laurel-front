import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/axios";
import "./plugins/gates";
import "./plugins/vee-validate";
Vue.config.productionTip = false;

// para mantener al usuario en session en modo SPA
store.dispatch("auth/me").then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
// para el uso de api_tokens
// new Vue({
//   router,
//   store,
//   vuetify,
//   render: (h) => h(App),
// }).$mount("#app");
