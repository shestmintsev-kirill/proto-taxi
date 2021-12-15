export const helper = {
  namespaced: true,
  state: () => ({
    showHelper: false,
    helperItems: [],
    helperItems1: {
      home: {
        text: 'Вокруг аватара по мере прохождения курса будет отображаться ваш прогресс, чтобы посмотреть подробнее – нажмите кнопку «Прогресс».',
        top: '',
        left: '15px'
      },
      track: {
        text: 'Чтобы начать занятие: нажмите на район «Говори грамотно».',
        top: '',
        left: '50%'
      },
      sertificate: {
        text: 'Чтобы просмотреть сертификат нажмите',
        top: '',
        left: '140px'
      }
    }
  }),
  getters: {
    getHelperItems: state => state.helperItems1,
    isShowHelper: state => state.showHelper
  },
  mutations: {
    SET_HELPER_ITEMS(state, payload) {
      const [name, topPosition] = payload;
      state.helperItems1[name].top = topPosition;
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