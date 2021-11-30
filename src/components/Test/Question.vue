<template>
  <div class="wrap__question">
    <div v-if="type !== 'checkbox'" class="question__answers-radio">
      <div
        v-for="{ text, id, correct, feedback } in currentAnswers"
        :key="id"
        :class="[
          'question__answer',
          {
            'question__answer--selected': id === idAnswer
          },
          reaction(id)
        ]"
        @click="chooseAnswer(id, correct)"
      >
        <p class="question__answer-text" v-html="text" />
        <p v-show="showFeedback" class="question__answer-feedback" v-html="feedback" />
      </div>
      <BaseButton
        v-if="!isAnswerReactionShown"
        :disabled="isButtonEnabled"
        class="button"
        @click="checkAnswer"
      >
        Проверить
      </BaseButton>
      <BaseButton v-if="isAnswerReactionShown" :disabled="isButtonEnabled" class="button" @click="goTo">
        Далее
      </BaseButton>
    </div>
    <div v-else class="question__answers-checkbox">
      <div
        v-for="{ text, id, correct, feedback } in currentAnswers"
        :key="id"
        :class="[
          'question__answer',
          {
            'question__answer--selected': id === idAnswer
          },
          reaction(id)
        ]"
      >
        <input
          v-model="selectedAnswers"
          :id="text"
          type="checkbox"
          :value="{ id: id, correct: correct }"
          class="input_checkbox"
        />
        <label :for="text" v-html="text" />
        <p v-show="showFeedback" class="question__answer-feedback" v-html="feedback" />
      </div>
      <BaseButton
        v-if="!isAnswerReactionShown"
        :disabled="isButtonEnabled"
        class="button"
        @click="checkAnswer"
      >
        Проверить
      </BaseButton>
      <BaseButton v-if="isAnswerReactionShown" :disabled="isButtonEnabled" class="button" @click="goTo">
        Далее
      </BaseButton>
    </div>
  </div>
</template>
<script>
import BaseButton from '../global/BaseButton.vue';

export default {
  name: 'Question',
  components: { BaseButton },
  props: {
    currentAnswers: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'radio'
    }
  },
  data() {
    return {
      showFeedback: false,
      idAnswer: '',
      editAnswer: '',
      selectedAnswers: [],
      checkAnswertes: [],
      arrayCorrect: [],
      isAnswerReactionShown: false
    };
  },
  computed: {
    isButtonEnabled() {
      if (this.type === 'checkbox') {
        return this.selectedAnswers.length > 1;
      }

      return this.selectedAnswers.length >= 1;
    }
  },
  watch: {
    editAnswer() {
      this.chooseAnswer();
    }
  },
  mounted() {},
  methods: {
    goTo(event) {
      this.$emit('goToDialog', event);
    },
    chooseAnswer(id, correct) {
      if (this.type !== 'checkbox') {
        this.selectedAnswers = [];
        this.selectedAnswers.push({ id, correct });
      }
      this.idAnswer = id;
    },
    checkAnswer() {
      this.isAnswerReactionShown = true;
      let result = this.selectedAnswers.find(check => check === true) ? 'Верно' : 'Не верно';
      this.showFeedback = true;
      return result;
    },
    reaction(id) {
      if (this.isAnswerReactionShown) {
        const currentAnswer = this.currentAnswers.find(answer => answer.id === id);
        return currentAnswer.correct ? 'question__answer--right' : 'question__answer--wrong';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap__question {
  margin: 20px 0;
}
.input_checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.input_checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

.input_checkbox + label::before {
  content: '';
  display: inline-block;
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 2px solid #4c5ced;
  border-radius: 5px;
  margin-right: 15px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.input_checkbox:checked + label::before {
  background-image: url('~images/test/mim-selected.svg');
}

.question {
  &__answers {
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
  }

  &__answer {
    padding: 0 11px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &-text {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 auto;
      padding: 10px 5px 10px 40px;
      font-size: 16px;
      line-height: 20px;

      &::before {
        position: absolute;
        left: 0;
        display: inline-block;
        width: 27px;
        height: 27px;
        background-image: url('~images/test/oim-normal.svg');
        background-repeat: no-repeat;
        background-position: center;
        content: '';
      }
    }

    &-feedback {
      margin-top: 5px;
      font-size: 14px;
      line-height: 16, 41px;
      font-weight: 300;
    }

    &.question__answer--selected {
      .question__answer-text {
        &::before {
          left: 0;
          width: 42px;
          height: 40px;
          background-image: url('~images/test/oim-selected.svg');
        }
      }
    }

    &.question__answer--right {
      padding: 15px 11px 20px;
      border: 2px solid #4dde08;
      border-radius: 5px;
      label,
      .question__answer-text {
        &::before {
          border: none;
          background-size: 70%;
          left: -7px;
          width: 42px;
          height: 40px;
          background-image: url('~images/test/right.svg');
        }
      }
    }

    &.question__answer--wrong {
      padding: 15px 11px 20px;
      border: 2px solid #ff6954;
      border-radius: 5px;
      label,
      .question__answer-text {
        &::before {
          border: none;
          background-size: 70%;
          left: -7px;
          width: 42px;
          height: 40px;
          background-image: url('~images/test/wrong.svg');
        }
      }
    }
  }
}

.button {
  margin-top: 20px;
}
</style>
