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
    component: Home,
  },
  {
    name: "Exam",
    path: "/examen",
    component: () => import("../views/Exam.vue"),
  },
  {
    name: "Admin",
    path: "/admin",
    component: () => import("../views/Admin.vue"),
    children: [
      {
        name: "Permissions",
        path: "permissions",
        component: () => import("../components/admin/Permissions.vue"),
      },
    ],
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
