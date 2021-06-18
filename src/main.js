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
  ActionSheet,
  Stepper,
  Checkbox,
  CheckboxGroup,
  Card,
  SwipeCell,
  SubmitBar,
  Divider,
  Radio,
  Tag,
  Col,
  Row,
  AddressEdit,
  ContactCard,
} from "vant";

createApp(App)
  .use(Tag)
  .use(ContactCard)
  .use(AddressEdit)
  .use(Col)
  .use(Row)
  .use(Radio)
  .use(Divider)
  .use(SubmitBar)
  .use(SwipeCell)
  .use(Card)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Stepper)
  .use(ActionSheet)
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
