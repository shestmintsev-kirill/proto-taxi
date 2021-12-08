<template>
  <header class="wrapper">
    <div
      class="wrapper-header header"
      :style="{ 'justify-content': $route.params.id ? 'center' : 'flex-start' }"
    >
      <div v-if="$route.params.id" class="header-course">
        <img
          class="header-course__btn"
          src="@/assets/images/Header/back.svg"
          alt="back"
          @click="$router.go(-1)"
        />
        <p class="header-course__name">{{ $route.query.n }}</p>
      </div>
      <div v-else class="header-title">{{ headerTitle }}</div>
      <div class="header-question">
        <img
          class="header-question__image"
          src="@/assets/images/Header/question.svg"
          alt="question"
          @click="activeTabType.length === 2 ? setStateHelper(true) : setStateHelper(false)"
        />
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    activeTabType() {
      return this.$route.fullPath.split('/');
    },
    headerTitle() {
      return this.tabs.find(t => t.type === this.activeTabType[1]).title;
    }
  },
  methods: {
    ...mapActions('helper', ['setStateHelper'])
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  &-header {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 100px;
    background: #ffffff;
    box-shadow: 0px 2px 6px rgba(102, 132, 183, 0.25);
    padding: 15px 20px 40px 20px;
    z-index: 99;
  }

  .header {
    display: flex;

    &-title {
      font-size: 34px;
      font-weight: 700;
    }

    &-question {
      position: absolute;
      top: 25px;
      right: 22px;
      display: flex;
      align-items: center;
      cursor: pointer;
      width: 29px;
    }

    &-course {
      display: flex;
      align-items: center;
      margin-top: 40px;

      &__btn {
        position: absolute;
        left: 50px;
      }

      &__name {
        font-weight: 500;
        font-size: 17px;
      }
    }
  }
}
</style>