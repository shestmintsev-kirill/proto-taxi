<template>
  <div class="wrapper">
    <div class="modal">
      <div class="wrapper__help">
        {{ helpInfo.modalText }}
      </div>
    </div>
    <div
      class="wrapper__cutout"
      :style="{
        top: `${helpInfo.modalTop}px`,
        left: `${helpInfo.modalLeft}px`
      }"
      @click="closeModal"
    />
  </div>
</template>

<script>
export default {
  name: 'Helper',
  props: {
    helpInfo: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    document.body.style.overflow = null;
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 102;

  .modal {
    position: fixed;
    top: 20%;
    z-index: 999;
  }

  &__help {
    padding: 20px 25px;
    z-index: 102;
  }

  &__cutout {
    position: absolute;
    width: 100px;
    height: 100px;
    z-index: 2;
    border-radius: 50%;
    box-shadow: 0 0 0 100000px rgba(7, 9, 51, 0.6%);
  }
}
</style>