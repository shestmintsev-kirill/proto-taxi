<template>
  <div>
    <div class="modal">
      <div class="user">
        <div class="user-info">
          <vue-ellipse-progress
            class="user-info__img"
            :progress="getAllUserProgress"
            :determinate="false"
            color="#FABA2D"
            empty-color="#ECECEC"
            empty-color-fill="#fff"
            :size="135"
            :thickness="8"
            :empty-thickness="8"
            lineMode="normal"
            :legend="false"
            animation="rs 700 400"
            fontSize="1.5rem"
            :loading="false"
          >
            <img slot="legend-caption" src="@/assets/images/Home/user.svg" alt="user" />
          </vue-ellipse-progress>
          <p class="user-info__name">Иван Макаров</p>
          <p class="user-info__id">ID водителя</p>
        </div>
        <div v-for="(menu, index) in getUserMenu" :key="index" class="user-menu">
          <div class="user-menu__item">
            <p class="title">{{ menu }}</p>
            <img src="@/assets/images/Home/arrow.svg" alt="arrow" />
          </div>
        </div>
        <div class="user-exit" @click="exit()">
          <p>Выйти</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters('profile', ['getUserMenu']),
    ...mapGetters('track', ['getAllUserProgress'])
  },
  mounted() {
    if (!sessionStorage.firstLogin) {
      this.setStateHelper(true);
    }

    this.calculateAllProgress();
  },
  methods: {
    ...mapActions('helper', ['setStateHelper']),
    ...mapActions('track', ['calculateAllProgress']),
    exit() {
      sessionStorage.removeItem('isLogin');
      sessionStorage.removeItem('goToMissedCourse');
      this.$router.push('/auth');
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  &-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 25px;

    &__img {
      width: 135px;
      margin-bottom: 15px;
    }

    &__name {
      font-size: 17px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    &__id {
      font-size: 17px;
      margin-bottom: 35px;
    }
  }

  &-menu {
    display: flex;
    align-items: center;
    height: 55px;
    border-top: 0.3px solid #bebebe;
    border-bottom: 0.3px solid #bebebe;

    & + & {
      border-top: none;
    }

    &__item {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 0px 35px;
    }
  }

  &-exit {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
  }
}
</style>
