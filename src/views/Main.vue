<template>
  <div class="main-wrapper">
    <Header :tabs="tabs" />
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
    <Footer :tabs="tabs" />
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: 'Main',
  components: {
    Header,
    Footer
  },
  data: () => ({
    tabs: [
      { img: 'home.svg', type: 'home', title: 'Аккаунт' },
      { img: 'course.svg', type: 'track', title: 'Курс' },
      { img: 'sertificate.svg', type: 'sertificate', title: 'Сертификаты' }
    ]
  }),
  mounted() {
    if (!localStorage.isLogin) {
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