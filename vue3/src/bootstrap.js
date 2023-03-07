import { createApp } from "vue";
import { createRouter } from "vue-router";
import Page1 from "./pages/Page1.vue";
import Page2 from "./pages/Page2.vue";
import App from "./App.vue";

import ReactComponent from "./ReactComponent";
import ReactComponentLoad from "./ReactComponentLoad";

import { vue3BrowserHistory } from "./constants";

const routes = [
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

const mount = (el, { history }) => {
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
