import * as global from '../components/global';
import Vue from 'vue';

export default () => {
  Object.keys(global).forEach(key => {
    Vue.component(key, global[key]);
  });
};
