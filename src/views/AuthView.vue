<template>
  <div
    class="auth-wrapper"
    :style="{
      'background-image': `url(${require('@/assets/images/Main/map.png')})`
    }"
  >
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AuthView'
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  min-height: 100vh;
  min-width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 40vw;
}
</style>
