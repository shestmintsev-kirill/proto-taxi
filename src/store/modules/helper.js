export const helper = {
  namespaced: true,
  state: () => ({
    showHelper: false
  }),
  getters: {
    isShowHelper: state => state.showHelper
  },
  mutations: {
    SET_SHOW_HELPER(state, payload) {
      state.showHelper = payload;
    }
  },
  actions: {
    setStateHelper({ commit }, payload) {
      commit('SET_SHOW_HELPER', payload);
    }
  }
};