<template>
  <div>
    <div v-if="step === 1" ref="longread" class="longread">
      <div class="blur-modal">
        Вы увидели пример правильного поведения в начале поездки<br /><br />
        Давайте потренируемся это делать.<br /><br />
        <strong>Для этого прослушайте сначала фразу пассажира.</strong>
        <img src="@assets/images/Course/Chapter/audio.png" alt="audio" @click="goToTest()" />
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="showItem === 4 || showItem === 5" class="longread-replics">
          <div class="replica left-replica">Едем на 1-й Поперечный проезд?</div>
          <div class="replica right-replica">Что, какой проезд? В первый раз слышу. Мне на ВДНХ.</div>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div v-if="showItem === 1" class="longread-dialog">
          <img src="@assets/images/Course/Chapter/dialog.png" alt="dialog" />
        </div>
        <div v-if="showItem === 2" class="longread-test" @click="goToDialog()">
          <img src="@assets/images/Course/Chapter/TestTODO_DELETE.png" alt="TestTODO_DELETE" />
        </div>
        <div v-if="showItem >= 3 && showItem <= 5" class="longread-dialog">
          <img src="@assets/images/Course/Chapter/dialog2.png" alt="dialog" />
        </div>
      </transition>
      <div v-if="showItem === 4" class="longread-nextbtn">
        <div class="blur-modal">
          <p>
            Подумайте, как правильно ответить в этой ситуации.<br />
            <strong>Произнесите ответ вслух и нажмите кнопку.</strong>
          </p>
          <button class="button" @click="goToTrueReplic()">Далее</button>
        </div>
      </div>
      <div v-if="showItem === 5" class="longread-nextbtn">
        <div class="blur-modal">
          <p><strong>Правильный ответ</strong></p>
          <img src="@assets/images/Course/Chapter/audio.png" alt="audio" />
          <div class="flex-end">
            <div class="replica left-replica" :style="{ margin: '20px 0' }">
              Одну минуту. Сейчас проверим по карте, может быть, это рядом.
            </div>
          </div>
          <button class="button" @click="goToLast()">Далее</button>
        </div>
      </div>
    </div>

    <!-- step 2 -->

    <div v-if="step === 2" ref="longread" class="longread">
      <div v-if="showItem <= 3" class="blur-modal">
        Попробуем это на практике.<br />
        <strong>Выберите, корректно ли звучит такое обращение к пассажиру-девушке?</strong>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="showItem <= 3" class="longread-replics">
          <div class="replica left-replica">Едем на 1-й Поперечный проезд?</div>
        </div>
      </transition>
      <div v-if="showItem <= 3" class="longread-dialog" :style="{ 'margin-top': showItem ? '0' : '-90px' }">
        <img
          :src="require(`@assets/images/Course/Chapter/${showItem ? 'dialog3blur' : 'dialog3'}.png`)"
          alt="dialog"
        />
      </div>
      <div v-if="showItem === 4" class="longread-dialog">
        <img src="@assets/images/Course/Chapter/finalImage.png" alt="finalImage" />
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="showItem && showItem !== 4" class="longread-question">
          <div class="wrapper">
            <div
              v-if="showItem <= 3"
              :class="{ 'question-false': showItem === 2 }"
              class="question-btn"
              @click="showItem !== 3 ? (showItem = 2) : null"
            >
              <p>ДА</p>
            </div>
            <div
              v-if="showItem <= 3"
              :class="{ 'question-true': showItem === 3 }"
              class="question-btn"
              @click="questionTrue()"
            >
              <p>НЕТ</p>
            </div>
          </div>
          <transition name="fade" mode="out-in">
            <div
              v-if="showItem === 2 || showItem === 3"
              class="blur-modal"
              :style="{ border: `2px solid ${showItem === 2 ? '#ff6954' : '#4dde08'}` }"
            >
              Чтобы обращение было корректным, в начало надо добавлять «Извините» или «Простите», если
              уточняете. «Девушка» допустимо только в той ситуации, когда надо окликнуть. <br /><br />
              Например, «Девушка, извините, вы забыли перчатки».
            </div>
          </transition>
          <button v-if="showItem === 3" class="button" @click="finalSlide()">Далее</button>
        </div>
        <div v-if="showItem === 4" class="blur-modal">
          <p>
            Поздравляем с завершением первой поездки! <br /><br />Теперь вы знаете, как корректно
            приветствовать разных пассажиров и уточнять адрес поездки. <br /><br />
            Если захотите освежить информацию из этой поездки, сможете в любое время вернуться назад.
          </p>
          <button
            class="button final-btn"
            @click="
              $router.push({
                name: 'course',
                params: { id: $route.params.id },
                query: { g: $route.query.g, n: $route.query.n }
              })
            "
          >
            Едем дальше
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChapterLongread',
  data: () => ({
    showItem: 0
  }),
  computed: {
    step: {
      get() {
        return Number(this.$route.query.g);
      }
    }
  },
  mounted() {
    this.scrollToTop();
    if (this.step === 2) {
      setTimeout(() => {
        this.showItem = 1;
        this.scrollToBottom();
      }, 2000);
    }
  },
  methods: {
    goToTest() {
      this.scrollToBottom();
      this.showItem = 1;
      setTimeout(() => {
        this.showItem = 2;
      }, 2000);
    },
    goToDialog() {
      this.scrollToTop();
      this.showItem = 3;
      setTimeout(() => {
        this.showItem = 4;
        this.scrollToBottom();
      }, 2000);
    },
    goToLast() {
      this.$router.replace({ name: 'StartChapter', query: { n: this.$route.query.n, g: 2 } });
    },
    goToTrueReplic() {
      this.showItem = 5;
      this.scrollToBottom();
    },
    questionTrue() {
      this.showItem = 3;
      this.scrollToBottom();
    },
    finalSlide() {
      this.showItem = 4;
      this.scrollToTop();
    },
    scrollToTop() {
      document.documentElement.scrollTop = 0;
    },
    scrollToBottom() {
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.longread {
  min-height: 100vh;
  padding-top: 50px;

  .blur-modal {
    padding: 25px;
    padding-bottom: 35px;

    p {
      line-height: 20px;
    }

    .final-btn {
      margin-top: 20px;
    }
  }

  img[alt='audio'] {
    margin-top: 22px;
  }

  img[alt='finalImage'] {
    margin-bottom: 20px;
  }

  &-dialog {
    margin: 0 20px;
    margin-top: 15px;

    img[alt='dialog'] {
      width: 100%;
    }
  }

  &-test {
    margin: 0 20px;
    margin-top: 15px;

    img[alt='TestTODO_DELETE'] {
      width: 100%;
    }
  }

  &-nextbtn {
    margin-top: -150px;

    padding-bottom: 50px;
    .button {
      margin-top: 10px;
    }
  }

  .replica {
    width: 65%;
    background: #ffffff;
    margin: 0px 20px;
    border-radius: 10px;
    padding: 15px 10px;
    margin-top: 25px;
  }

  .left-replica {
    position: relative;

    &:after {
      position: absolute;
      content: '';
      bottom: -10px;
      right: 0;
      width: 0;
      height: 0;
      border-top: 20px solid #fff;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      transform: rotate(90deg);
    }
  }

  .right-replica {
    position: absolute;
    right: 0;

    &:after {
      position: absolute;
      content: '';
      bottom: -10px;
      left: 0;
      width: 0;
      height: 0;
      border-top: 20px solid #fff;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      transform: rotate(-90deg);
    }
  }

  &-question {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -210px;
    padding-bottom: 50px;

    .wrapper {
      display: flex;
      justify-content: space-around;
      width: 100vw;
    }

    .blur-modal {
      padding: 15px;
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0px 1px 4px #a3bcdb;
      margin-top: 10px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 16.4px;
    }

    .button {
      width: 310px;
      margin-top: 20px;
    }

    .question-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 155px;
      height: 105px;
      background: rgba(255, 255, 255, 0.6);
      box-shadow: inset -1px -1px 1px rgba(0, 0, 0, 0.08);
      border-radius: 30px;
      border: 5px rgba(255, 255, 255, 0.2) solid;

      p {
        font-size: 37px;
        color: #232b73;
        font-weight: 500;
      }
    }

    .question-true {
      background: rgba(193, 249, 173, 0.6);
      border: 5px rgba(145, 245, 110, 0.8) solid;
    }

    .question-false {
      background: rgba(255, 176, 176, 0.6);
      border: 5px rgba(255, 113, 113, 0.8) solid;
    }
  }
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}
</style>