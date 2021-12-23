<template>
  <transition name="fade" mode="out-in">
    <div v-if="isShow" class="modal">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    isShow: {
      get() {
        return this.show;
      },
      set() {
        this.$emit('close-modal');
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  }
};
</script>
