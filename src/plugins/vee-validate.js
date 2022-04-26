import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
} from "vee-validate";
import es from "vee-validate/dist/locale/es.json";
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
// Add a rule.
extend("secret", {
  validate: (value) => value === "example",
  message: "This is not the magic word",
});
localize("es", es);
// Register it globally
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
