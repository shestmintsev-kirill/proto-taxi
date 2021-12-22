<template>
  <div
    :style="{ 'background-image': `url(${require('@/assets/images/Sertificate/certificates.png')})` }"
    class="sertificate"
  >
    <div class="sertificate__items">
      <SertificateItem
        v-for="point in points"
        :key="point.id"
        :title="point.name"
        @click.native="showDescriptionChapter = true"
      />
    </div>
    <DefaultModal
      v-if="showDescriptionChapter"
      :text="sertificateModalText"
      @close-modal="showDescriptionChapter = false"
    />
  </div>
</template>

<script>
import DefaultModal from '../../modals/DefaultModal.vue';
import SertificateItem from './SertificateItem.vue';
import { points } from '@/other/points';

export default {
  name: 'Sertificate',
  components: {
    DefaultModal,
    SertificateItem
  },
  data: () => ({
    showDescriptionChapter: false,
    points,
    sertificateModalText:
      'После успешного изучения каждого раздела вы будете получать сертификат. Все ваши сертификаты будут храниться здесь.<br/><br/>Постарайтесь и в скором времени вы увидите результат своего труда!'
  })
};
</script>

<style lang="scss" scoped>
.sertificate {
  position: absolute;
  top: 0;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  text-align: center;

  &__items {
    margin-top: 130px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>