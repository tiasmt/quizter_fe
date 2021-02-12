import Vue from "vue";
import VueRouter from "vue-router";
import Home from './../components/Home.vue'
import Join from './../components/Join.vue'
import Categories from './../components/Categories.vue'
import GameSettings from './../components/GameSettings.vue'
import Avatar from './../components/Avatar.vue'
import Game from './../components/Game.vue'

Vue.use(VueRouter);

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/Join",
      name: "Join",
      component: Join
    },
    {
      path: "/Categories",
      name: "Categories",
      component: Categories
    },
    {
      path: "/GameSettings",
      name: "GameSettings",
      component: GameSettings
    },
    {
      path: "/Avatar",
      name: "Avatar",
      component: Avatar
    },
    {
      path: "/Game",
      name: "Game",
      component: Game
    }
  ];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });
  
  export default router;