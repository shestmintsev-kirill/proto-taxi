<template>
  <div class="wrapper">
    <div class="modal">
      <div class="modal__title">Начатый урок</div>
      <div
        class="modal-icon__close"
        :style="{
          'background-image': `url(${require('@/assets/images/modal/close.svg')})`
        }"
        @click="closeModal"
      />
      <div class="modal__text">
        Привет! У вас есть начатый урок, хотите продолжить?
      </div>
      <div class="button" @click="goToStartedSourse()">Продолжить</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lessonStarted',
  props: {
    startCourseIndex: {
      type: String,
      default: null
    }
  },
  mounted() {
    localStorage.firstLogin = true;
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    goToStartedSourse() {
      let point = JSON.parse(localStorage.startCourse);
      this.$router.push({
        name: 'course',
        params: { id: point.id },
        query: { n: point.name }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  z-index: 9999;
}

.modal {
  position: relative;
  width: 346px;
  padding: 35px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__title {
    margin: 34px 0 30px 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    color: #232323;
  }

  &__text {
    margin-bottom: 30px;
    font-size: 17px;
    line-height: 22px;
    text-align: left;
    color: #232323;
  }

  &-icon__close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 18px;
    height: 19px;
    background-color: transparent;
    background-size: cover;
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
}
</style>
