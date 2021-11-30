<template>
  <div class="test blur-modal">
    <div class="test__wrapper">
      <div class="test__question" v-html="text" />
      <Questions :currentAnswers="currentAnswers" :type="type" @goToDialog="goToDialog" />
    </div>
  </div>
</template>

<script>
import Questions from './Question.vue';

export default {
  name: 'Test',
  components: {
    Questions
  },
  props: {
    native: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      text: 'Выберите все варианты, которые подходят в этой ситуации, чтобы ответить пассажиру.',
      type: 'radio', // radio or checkbox
      currentAnswers: [
        {
          id: 1,
          text: 'Давайте уточним адрес по карте.',
          correct: true,
          feedback: 'Этот вопрос лишний, ведь пассажир уже сказал про кинотеатр.'
        },
        {
          id: 2,
          text: 'Уточните, что там находится? Магазин? Стадион?',
          correct: true,
          feedback: 'Этот вопрос лишний, ведь пассажир уже сказал про кинотеатр.'
        },
        {
          id: 3,
          text: 'Сейчас посмотрим по карте. Минуту, всё выясним.',
          correct: true,
          feedback: 'Эта фраза поможет вежливо показать,что вы собираетесь уточнить адрес.'
        },
        {
          id: 4,
          text: 'Сейчас по карте узнаем, одно ли это и то же место.',
          correct: false,
          feedback: 'Эта фраза поможет вежливо показать, что вы собираетесь уточнить адрес.'
        },
        {
          id: 5,
          text: 'Измените адрес в приложении, пожалуйста.',
          correct: true,
          feedback:
            'Пассажир уже написал адрес в приложении. Пока не говорил о смене адреса, такая просьба неуместна.'
        },
        {
          id: 6,
          text: 'Вы должны проверить адрес.',
          correct: false,
          feedback:
            'Лучше, если вы сами проверите адрес – ведь у вас под рукой навигатор, а у пассажира может не быть такой возможности.'
        }
      ]
    };
  },
  computed: {},
  methods: {
    goToDialog(event) {
      this.$emit('goToDialog', event);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/style.scss';

.test {
  &__wrapper {
  }

  &__question {
    font-size: 16px;
    line-height: 20px;
  }
}

.blur-modal {
  padding: 0;
}
</style>
