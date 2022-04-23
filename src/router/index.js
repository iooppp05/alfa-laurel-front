import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { role: store.state.auth.role },
    component: Home,
  },
  {
    name: "Exam",
    path: "/examen",
    meta: { role: JSON.stringify(store.state.auth.roles) },
    component: () => import("../views/Exam.vue"),
  },
  {
    name: "Admin",
    path: "/admin",
    meta: { role: store.state.auth.role },
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { darkTheme: false },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.state.auth.logged) next({ name: "Login" });
  else next();
});
export default router;
