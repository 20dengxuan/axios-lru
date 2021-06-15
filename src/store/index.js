import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      token: "",
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
