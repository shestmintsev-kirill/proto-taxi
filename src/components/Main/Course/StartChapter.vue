<template>
  <div class="chapter-wrapper">
    <div v-if="!step" class="blur-modal">
      Привет. <br />
      Добро пожаловать на работу! Давайте начнём день с плана на смену. Посмотрите видео и узнайте, что ждёт
      впереди.
    </div>
    <div v-if="step === 1" class="blur-modal">
      Первая поездка вот-вот начнётся. <br />
      Давайте разберёмся с тем, как правильно приветствовать пассажиров разного возраста и пола. Зная это, вы
      сможете правильно установить контакт с пассажиром с самого начала поездки.
    </div>
    <div v-if="step === 2" class="blur-modal">
      Пассажиры могут попасться любого возраста. К каждому есть отдельное обращение, чтобы звучать корректно и
      вежливо.<br />
      <strong>Просмотрите видео, чтобы узнать, как это делать.</strong>
    </div>
    <img v-if="!step" class="bridge" src="@/assets/images/Course/Chapter/bridge.png" alt="bridge" />
    <img
      class="billboard"
      :src="require(`@/assets/images/Course/Chapter/${step ? 'billboard2' : 'billboard'}.png`)"
      alt="billboard"
    />
    <div class="btn-wrapper">
      <button class="button" @click="step ? goToLongread() : goPreviewSlide()">
        {{ step ? 'Далее' : 'Начать первую поездку' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartChapter',
  computed: {
    step: {
      get() {
        return Number(this.$route.query.g);
      }
    }
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
  methods: {
    goPreviewSlide() {
      this.$router.push({ query: { n: 'Первая поездка', g: 1 } });
      document.documentElement.scrollTop = 0;
    },
    goToLongread() {
      this.$router.push({ name: 'ChapterLongread', query: this.$route.query });
    }
  }
};
</script>

<style lang="scss" scoped>
.chapter-wrapper {
  position: relative;
  min-height: 100vh;
  padding-top: 50px;

  .blur-modal {
    padding: 18px;
    z-index: 3;
  }

  .bridge {
    width: 100%;
    position: fixed;
    bottom: 5px;
    z-index: 2;
  }

  .billboard {
    margin-top: 22px;
    width: 100%;
    z-index: 1;
  }

  .btn-wrapper {
    position: fixed;
    bottom: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 3;

    .button {
      max-width: 300px;
    }
  }
}
</style>