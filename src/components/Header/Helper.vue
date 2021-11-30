<template>
  <div class="wrapper">
    <div class="modal">
      <div class="wrapper__help">
        {{ helpInfo.modalText }}
      </div>
    </div>
    <div
      class="wrapper__cutout"
      :style="{
        top: `${helpInfo.modalTop}px`,
        left: `${helpInfo.modalLeft}px`
      }"
      @click="closeHelper()"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { HELP_MODAL } from './HelpModal';

export default {
  name: 'Helper',
  props: {
    tabs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    activeTabType() {
      return this.$route.fullPath.split('/');
    },
    helpInfo() {
      const objInfo = {};
      if (this.activeTabType.length === 2) {
        const nameRoute = HELP_MODAL[this.tabs.find(t => t.type === this.activeTabType[1]).type];
        if (!nameRoute) return;
        const { text, top, left } = nameRoute;
        objInfo.modalText = text;
        objInfo.modalTop = top;
        objInfo.modalLeft = left;
      }
      return objInfo;
    }
  },
  mounted() {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    document.body.style.overflow = null;
  },
  methods: {
    ...mapActions('helper', ['setStateHelper']),
    closeHelper() {
      if (!sessionStorage.firstLogin && this.$route.fullPath !== '/track') {
        sessionStorage.firstLogin = true;
        this.$router.push('/track');
      } else {
        this.setStateHelper(false);
      }
    }
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
  z-index: 102;

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
    position: absolute;
    width: 100px;
    height: 100px;
    z-index: 2;
    border-radius: 50%;
    box-shadow: 0 0 0 100000px rgba(7, 9, 51, 0.6%);
  }
}
</style>