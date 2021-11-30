export const menu = {
  namespaced: true,
  state: () => ({
    tabs: [
      { img: 'home.svg', type: 'home', title: 'Аккаунт' },
      { img: 'course.svg', type: 'track', title: 'Курс' },
      { img: 'sertificate.svg', type: 'sertificate', title: 'Сертификаты' }
    ]
  }),
  getters: {
    getTabsMenu: state => state.tabs
  },
  mutations: {},
  actions: {}
};