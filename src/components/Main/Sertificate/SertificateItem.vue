<template>
  <div class="item">
    <img src="@assets/images/Sertificate/s-item.png" alt="sertificate" class="item__img" />
    <p class="item__title">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'SertificateItem',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  z-index: 10;
  width: calc(50% - 20px);
  margin-bottom: 40px;

  &__img {
    width: 100%;
  }

  &__title {
    text-align: center;
  }
}
</style>