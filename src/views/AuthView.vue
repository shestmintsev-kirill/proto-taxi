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

<style lang="scss">
.auth-wrapper {
  min-height: 100vh;
  min-width: 100vw;
  background-color: #f3f3f3;
  padding-top: 40%;

  @include for-size(sm) {
    padding-top: 50px;
  }
}
</style>
