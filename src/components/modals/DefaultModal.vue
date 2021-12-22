<template>
  <transition name="fade" mode="out-in">
    <div class="wrapper" @click.self="closeModal">
      <div class="modal">
        <div
          class="modal-icon__close"
          :style="{
            'background-image': `url(${require('@/assets/images/modal/close.svg')})`
          }"
          @click="closeModal"
        />
        <div class="modal__text" v-html="text" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'lessonStarted',
  props: {
    text: {
      type: String,
      default: 'В данный момент машина находится на плановом техобслуживании. Выйдет на линию в 2022 году.'
    }
  },
  mounted() {
    sessionStorage.goToMissedCourse = true;
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    document.body.style.overflow = null;
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    goToStartedSourse() {
      let point = JSON.parse(sessionStorage.startCourse);
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(7px);
  z-index: 100;
}

.modal {
  position: relative;
  width: 346px;
  padding: 35px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__text {
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
