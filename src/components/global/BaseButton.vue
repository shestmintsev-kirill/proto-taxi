<template>
  <div :class="['button', buttonClasses]" @click="handleClick">
    <span class="button__content">
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    disabled: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    buttonClasses() {
      const classes = [];
      if (this.disabled) {
        classes.push('button--disabled');
      }
      return classes;
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled) {
        this.$emit('click', event);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.button {
  background: #faba2d;
  opacity: 0.5;
  color: #232323;

  &--disabled {
    opacity: 1;
  }

  &__content {
    position: relative;
  }
}
</style>
