import { createApp } from "vue";
import { createRouter, RouterHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Page1 from "./pages/Page1.vue";
import Page2 from "./pages/Page2.vue";
import App from "./App.vue";

import ReactComponent from "./ReactComponent.vue";
import ReactComponentLoad from "./ReactComponentLoad.vue";

import { vue3BrowserHistory } from "./constants";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Page1 },
  { path: "/page-1", name: "Page 1", component: Page1 },
  { path: "/page-2", name: "Page 2", component: Page2 },
  {
    path: "/react",
    name: "react",
    component: ReactComponentLoad,
    children: [
      {
        path: ":pathMatch(.*)*",
        component: ReactComponent,
      },
    ],
  },
];

const mount = (el: Element, { history }: { history: RouterHistory }) => {
  const router = createRouter({
    history: history,
    routes,
  });
  const app = createApp(App);
  app.use(router);
  app.mount(el);
};

const devRoot = document.getElementById("vue3");
if (devRoot) {
  mount(devRoot, { history: vue3BrowserHistory });
}
export { mount };
