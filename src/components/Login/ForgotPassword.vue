<template>
  <div>
    <header class="header">
      <div class="header-title">
        <img
          class="header-title__btn"
          src="@/assets/images/Header/back.svg"
          alt="back"
          @click="$router.push('/auth')"
        />
        <p class="header-title__name">Восстановление пароля</p>
      </div>
    </header>
    <div class="wrapper">
      <div class="modal">
        <div class="modal__text">
          Введите номер телефона для смены пароля и мы пришлём код для подтверждения:
        </div>
        <div class="modal__input">
          <input
            v-model="telephone"
            type="tel"
            class="input"
            placeholder="(555) 555-5555"
            @input="acceptNumber()"
          />
        </div>
        <button :disabled="telephone.length !== 14" class="button" @click="confirm">Подтвердить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'forgotPassword',
  data() {
    return {
      telephone: ''
    };
  },
  methods: {
    confirm() {
      console.log(`confirm ${this.telephone}`);
      this.telephone = '';
    },
    acceptNumber() {
      let x = this.telephone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.telephone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  padding: 35px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__text {
    margin-bottom: 54px;
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    text-align: left;
    color: #232323;
  }

  &__input {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;

    .input {
      width: 100%;
      height: 50px;
      padding-left: 20px;
      background: #f8f9ff;
      border-radius: 30px;

      &:not(:last-child) {
        margin-bottom: 27px;
      }
    }

    .input::placeholder {
      color: #232323;
      font-size: 17px;
      line-height: 22px;
      opacity: 0.6;
    }
    .input:focus-visible {
      outline: 0;
      background: #fff;
    }
  }

  .button {
    margin-top: 40px;
    max-width: 400px;
  }

  .button[disabled] {
    opacity: 0.5;
  }
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(102, 132, 183, 0.25);
  border-radius: 0px 0px 30px 30px;
  padding: 15px 20px 40px 20px;
  z-index: 99;

  &-title {
    display: flex;
    align-items: center;
    margin-top: 40px;

    &__btn {
      left: 50px;
      position: absolute;
      cursor: pointer;
    }

    &__name {
      font-weight: 500;
      font-size: 17px;
    }
  }
}
</style>
