<template>
  <div class="main-wrapper">
    <Header :tabs="getTabsMenu" />
    <Helper v-if="isShowHelper" :tabs="getTabsMenu" />
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
    <Footer :tabs="getTabsMenu" />
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import { mapGetters } from 'vuex';
import Helper from '../components/Header/Helper.vue';

export default {
  name: 'Main',
  components: {
    Header,
    Footer,
    Helper
  },
  computed: {
    ...mapGetters('menu', ['getTabsMenu']),
    ...mapGetters('helper', ['isShowHelper'])
  },
  mounted() {
    if (!sessionStorage.isLogin) {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.main-wrapper {
  min-height: 100vh;
  background-color: #f3f3f3;
}

.main-content {
  padding-top: 120px;
  padding-bottom: 110px;
}
</style>