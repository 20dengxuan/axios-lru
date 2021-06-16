import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  List,
  Tab,
  Tabs,
  Button,
  Form,
  Field,
  Toast,
  Icon,
  Swipe,
  SwipeItem,
} from "vant";

createApp(App)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(Icon)
  .use(Toast)
  .use(store)
  .use(router)
  .mount("#app");
