<template>
  <div class="auth">
    <div class="modal">
      <img src="@/assets/images/Login/logo.svg" alt="logo" />
      <div class="modal__title">Вход</div>
      <div class="modal__input">
        <input
          v-model="login"
          ref="loginInput"
          :style="{ 'border-color': confirmLogin && '#ff7777' }"
          class="input"
          placeholder="ID водителя"
        />
        <input
          v-model="password"
          :style="{ 'border-color': confirmLogin && '#ff7777' }"
          class="input"
          placeholder="Пароль"
        />
      </div>
      <div v-if="confirmLogin" class="confirm">Введен неверный логин или пароль</div>
      <button class="button" @click="setLogin">Войти</button>
      <div class="modal__restore" @click="$router.push({ name: 'forgotPassword' })">Забыли пароль?</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      confirmLogin: false
    };
  },
  mounted() {
    if (localStorage.isLogin) {
      this.$router.push('/home');
    }
    // this.$refs.loginInput.focus();
  },
  methods: {
    setLogin() {
      if (
        // this.login === 'user@example.com' &&
        // this.password === 'user@example.com'
        this.login === '1'
      ) {
        localStorage.isLogin = true;
        this.$router.push('/home');
      }
      this.confirmLogin = true;
    },
    forgotPassword() {
      console.log('forgotPassword');
    }
  }
};
</script>

<style lang="scss" scoped>
.auth {
  .modal {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 25px;

    &__title {
      margin-top: 17px;
      margin-bottom: 24px;
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      text-align: center;
      color: #232323;
    }

    &__input {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 300px;
    }

    .input:not(:last-child) {
      margin-bottom: 27px;
    }

    .button {
      border: 0;
      margin-top: 40px;
      margin-bottom: 20px;
      max-width: 300px;
    }

    &__restore {
      color: #232323;
      cursor: pointer;
      font-size: 16px;
      line-height: 19px;
    }

    .confirm {
      color: rgb(141, 0, 0);
      margin-top: 10px;
    }
  }
}
</style>
