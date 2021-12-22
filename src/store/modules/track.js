import { points } from '@/other/points';

export const track = {
  namespaced: true,
  state: () => ({
    points,
    allUserProgress: null
  }),
  getters: {
    getPoints: state => state.points,
    getAllUserProgress: state => state.allUserProgress
  },
  mutations: {
    SET_ALL_PROGRESS(state, payload) {
      state.allUserProgress = payload;
    }
  },
  actions: {
    calculateAllProgress({ state, commit }) {
      let subChapters = state.points.map(p => {
        return p.chapters.map(c => {
          return c.subChapters;
        });
      });

      let subChaptersPropgress = subChapters.map(sc => {
        return sc.map(c => {
          let passedItems = c.filter(c => c.status === 'passed');
          let progressCahpter = Math.floor((passedItems.length / c.length) * 100);
          return progressCahpter;
        });
      });

      let middleValue = subChaptersPropgress.map(sc => {
        return sc.reduce((acc, value) => Math.ceil((acc + value) / sc.length));
      });

      const allProgress = Math.ceil(middleValue.reduce((acc, value) => acc + value) / middleValue.length);
      commit('SET_ALL_PROGRESS', allProgress);
    }
  }
};