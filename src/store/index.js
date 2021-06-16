import { createStore } from "vuex";
import { getSessionStorage } from "../utils/storage";
let token = getSessionStorage("token");
console.log(token);
export default createStore({
  state: {
    user: {
      token: token || "",
    },
  },
  mutations: {
    USERMESSAGE(state, token) {
      state.user.token = token;
    },
  },
  actions: {
    USERMESSAGE(context, token) {
      context.commit("USERMESSAGE", token);
    },
  },
  modules: {},
});
