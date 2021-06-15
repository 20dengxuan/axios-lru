import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Button, Form, Field, Toast } from "vant";

createApp(App)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(Toast)
  .use(store)
  .use(router)
  .mount("#app");
