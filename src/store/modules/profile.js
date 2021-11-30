export const profile = {
  namespaced: true,
  state: () => ({
    userMenu: ['Аккаунт КисАрт', 'Пароль', 'Прогресс']
  }),
  getters: {
    getUserMenu: state => state.userMenu
  },
  mutations: {},
  actions: {}
};