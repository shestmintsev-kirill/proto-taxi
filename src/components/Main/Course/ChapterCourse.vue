<template>
  <div
    class="wrapper"
    :style="{
      'background-image': `url(${require('@/assets/images/Course/Chapter/chapterBg.png')})`
    }"
  >
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ChapterCourse'
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  min-height: 100vh;
  margin-top: -55px;
  margin-bottom: -50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>