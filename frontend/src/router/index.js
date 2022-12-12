import { createRouter, createWebHistory } from "vue-router";
import HomePageView from "../views/HomePageView.vue";
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePageView",
      component: HomePageView,
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    }
  ],
});

export default router;
