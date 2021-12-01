import Vue from 'vue';
import Vuex from 'vuex';
import { profile } from './modules/profile';
import { menu } from './modules/menu';
import { helper } from './modules/helper';
import { track } from './modules/track';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    profile,
    menu,
    helper,
    track
  }
});
