export const helper = {
  namespaced: true,
  state: () => ({
    showHelper: false,
    helperItems: {
      home: {
        text: '<strong>Чтобы выбрать курс, нажмите на эту иконку</strong>',
        top: '',
        bottom: '5px',
        left: ''
      },
      track: {
        text: 'Чтобы начать обучение, нажмите на кнопку «Изучить».',
        top: '',
        bottom: '',
        left: '50%'
      },
      sertificate: {
        text: 'Чтобы просмотреть сертификат нажмите',
        top: '400px',
        bottom: '',
        left: '20px'
      }
    }
  }),
  getters: {
    getHelperItems: state => state.helperItems,
    isShowHelper: state => state.showHelper
  },
  mutations: {
    SET_HELPER_ITEMS(state, payload) {
      const [name, topPosition, leftPosition] = payload;
      state.helperItems[name].top = topPosition;
      if (leftPosition) {
        state.helperItems[name].left = leftPosition;
      }
    },
    SET_SHOW_HELPER(state, payload) {
      state.showHelper = payload;
    }
  },
  actions: {
    setHelperItems({ commit }, payload) {
      commit('SET_HELPER_ITEMS', payload);
    },
    setStateHelper({ commit }, payload) {
      commit('SET_SHOW_HELPER', payload);
    }
  }
};