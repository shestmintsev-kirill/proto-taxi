<template>
  <div>
    <div v-if="activeTabType.length === 2" class="wrapper">
      <div class="modal">
        <div class="wrapper__help" v-html="helpInfo.modalText" />
      </div>
      <div
        class="wrapper__cutout"
        :style="{
          top: helpInfo.modalTop,
          left: helpInfo.modalLeft,
          bottom: helpInfo.modalBottom
        }"
        @click="closeHelper()"
      />
    </div>
    <DefaultModal
      v-if="activeTabType.length > 2"
      :text="'В данный момент машина находится на плановом техобслуживании. Выйдет на линию в 2022 году.'"
      @close-modal="setStateHelper(false)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DefaultModal from '../modals/DefaultModal.vue';

export default {
  name: 'Helper',
  components: { DefaultModal },
  props: {
    tabs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    ...mapGetters('helper', ['getHelperItems']),
    activeTabType() {
      return this.$route.fullPath.split('/');
    },
    nameRoute() {
      return this.getHelperItems[this.tabs.find(t => t.type === this.activeTabType[1]).type];
    },
    helpInfo() {
      const objInfo = {};
      if (this.activeTabType.length === 2) {
        if (!this.nameRoute) return;
        const { text, top, bottom, left } = this.nameRoute;
        objInfo.modalText = text;
        objInfo.modalTop = top;
        objInfo.modalLeft = left;
        objInfo.modalBottom = bottom;
      }
      return objInfo;
    }
  },
  created() {
    //!Костыль на скрытие хелпера на вкладке "Сертификаты"
    if (this.activeTabType[1] === 'sertificate') {
      this.setStateHelper(false);
    }
  },
  mounted() {
    if (this.activeTabType.length === 2) {
      this.setBottomPosition();
    }
  },
  beforeDestroy() {
    document.body.style.overflow = null;
  },
  methods: {
    ...mapActions('helper', ['setStateHelper']),
    closeHelper() {
      //показ хелперов при первой авторизации
      if (!sessionStorage.firstLogin && this.$route.fullPath !== '/track') {
        this.$router.push('/track');
        this.setStateHelper(false);
        setTimeout(() => {
          this.setBottomPosition();
          this.setStateHelper(true);
        }, 800);
        sessionStorage.firstLogin = true;
      } else {
        this.setStateHelper(false);
      }
    },
    setBottomPosition() {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      document.body.style.overflow = 'hidden';
    }
    //* Позиция help элемента
    // async setHelpItemPosition() {
    //   if (this.nameRoute.top.length) {
    //     console.log(this.nameRoute.top.replace(/[a-zа-яё]/gi, ''));
    //     document.documentElement.scrollTop = await this.nameRoute.top.replace(/[a-zа-яё]/gi, '');
    //     document.body.style.overflow = 'hidden';
    //   }
    // }
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
  z-index: 199;

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
    position: fixed;
    width: 150px;
    height: 150px;
    z-index: 99;
    border-radius: 50%;
    box-shadow: 0 0 0 100000px rgba(7, 9, 51, 0.6%);
  }
}
</style>