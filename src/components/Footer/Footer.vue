<template>
  <footer class="footer">
    <div class="footer-btns">
      <div
        v-for="btn in tabs"
        ref="helperMark"
        :key="btn.type"
        class="footer-btns__item"
        :class="{ active: $route.fullPath.split('/')[1] === btn.type }"
        @click="$route.fullPath !== `/${btn.type}` && $router.push(`/${btn.type}`)"
      >
        <img :src="getImage(btn.img)" :alt="btn.type" />
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Footer',
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    const position = ['home', null, this.$refs.helperMark[1].getBoundingClientRect().x - 87 + 'px'];
    this.setHelperItems(position);
  },
  methods: {
    ...mapActions('helper', ['setHelperItems']),
    getImage(img) {
      return require('@/assets/images/Footer/' + img);
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  background: #ffffff;
  box-shadow: inset 0px 2px 0px rgb(219, 225, 255);
  padding: 10px 40px;
  z-index: 10;

  &-btns {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .active {
    &::before {
      content: '';
      display: block;
      position: relative;
      bottom: 10px;
      width: 100%;
      height: 2px;
      background: #414147;
      transition: all 0.5s ease;
      animation: opacity 0.5s linear;
    }
  }
}
</style>