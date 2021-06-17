import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import { Toast } from "vant";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },
  {
    path: "/user",
    component: () => import("@/views/User"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Login/register"),
  },
  {
    path: "/classification",
    name: "classification",
    component: () => import("@/views/classification"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/cart"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/views/detail"),
  },
  {
    path: "/address",
    name: "address",
    component: () => import("@/views/address"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/addared",
    name: "addared",
    component: () => import("@/views/address/addared"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.token) {
      next();
    } else {
      Toast("请登录");
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
