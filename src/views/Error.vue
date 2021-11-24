<template>
  <div class="eror-wrapper">
    <div class="modal">
      <div class="modal__number">{{ error.status }}</div>
      <div class="modal__error">
        <div class="modal__title">Ошибка</div>
        <div class="modal__text">{{ error.msg }}</div>
      </div>
      <div class="button" @click="$router.push('/home')">Вернуться на главную</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Object,
      default: () => ({
        status: '404',
        msg: 'Страница не найдена'
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.eror-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3f3f3;
  background-repeat: no-repeat;
  background-size: cover;
}

.modal {
  width: 346px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 36px 25px;

  &__number {
    position: absolute;
    font-weight: bold;
    font-size: 160px;
    line-height: 169px;
    mix-blend-mode: multiply;
    color: #bebebe;
  }

  &__title {
    margin: 50px 0 35px 0;
    font-weight: bold;
    font-size: 34px;
    line-height: 40px;
    text-align: center;
    color: #232323;
  }

  &__text {
    margin-bottom: 51px;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    color: #232323;
  }
}
</style>
