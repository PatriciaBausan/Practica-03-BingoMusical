import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/HomeView.vue") },
    { path: "/concurso", component: () => import("../views/GameView.vue") },
    { path: "/play", component: () => import("../views/PlayView.vue") },
    { path: "/resultado", component: () => import("../views/ResultView.vue") },
    { path: "/ranking", component: () => import("../views/RankingView.vue") },
  ],
});
