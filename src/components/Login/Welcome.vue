<template>
  <div class="welcome">
    <div v-if="isFirstLogin" class="wrapper">
      <img src="@assets/images/Login/logo.svg" alt="logo" class="logo" />
      <div class="modal">
        <div class="modal__title">Поздравляем с началом обучения!</div>
        <div class="modal__text">
          Для работы таксистом профессиональное вождение – важное условие, но не единственное. Также важно
          знать город, понятно выражать свои мысли, понимать, что нужно пассажиру.<br /><br />Вы здесь и,
          значит, готовы к профессиональному росту. У вас есть возможность узнать много нового и стать лучшим
          в своей профессии.<br /><br />Приятного обучения!
        </div>
        <div class="button" @click="goToStartApp()">Начать обучение</div>
      </div>
    </div>
    <img v-else src="@assets/images/Login/welcome.png" alt="welcome" class="welcome__img" />
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data: () => ({
    isFirstLogin: false
  }),
  mounted() {
    setTimeout(() => {
      if (!sessionStorage.firstLogin) {
        this.isFirstLogin = true;
      } else {
        this.$router.push('/track');
      }
    }, 3000);
  },
  methods: {
    goToStartApp() {
      this.$router.push('/home');
    }
  }
};
</script>

<style lang="scss" scoped>
.welcome {
  &__img {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .logo {
    margin-bottom: 30px;
  }

  .modal {
    position: relative;
    width: 346px;
    padding: 25px 21px;
    display: flex;
    align-items: center;
    flex-direction: column;

    &__title {
      margin-bottom: 20px;
      font-weight: 500;
      font-size: 20px;
      line-height: 25px;
      color: #232323;
    }

    &__text {
      margin-bottom: 30px;
      font-size: 17px;
      line-height: 20px;
      text-align: left;
      color: #232323;
    }
  }
}
</style>