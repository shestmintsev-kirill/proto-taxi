<template>
  <div class="auth-wrapper">
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
  background-color: #f3f3f3;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 40vw;
}
</style>
