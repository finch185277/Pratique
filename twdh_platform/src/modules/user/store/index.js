export default {
  namespaced: true,
  state: () => ({
    userName: null,
  }),
  getters: {
  },
  mutations: {
    setUserName(state, userName){
      state.userName = userName;
    },
    clearUserName(state){
      state.userName = null;
    },
  },
  actions: {
  }
}