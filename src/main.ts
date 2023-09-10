import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import CurrentTask from "./components/CurrentTask.vue";

const routes = [
  { 
    path: '/tasks/:id',
    component: CurrentTask
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App);

app.use(createPinia());
app.use(router)

app.mount("#app");
