<template>
  <div class="course">
    <div v-if="!$route.query.show">
      <div class="modal description-wrapper">
        <p class="course-description">
          Раздел Русского языка посвящён темам, которые связаны с навыками общения с пассажарами, сотрудниками
          ДПС и решению возможных конфликтных ситуаций.
        </p>
      </div>
      <div>
        <div v-for="(chapter, i) in chapters" :key="i" class="modal progress-wrapper">
          <div
            class="course-progress"
            :style="{
              'max-height': chapter.expand ? '900px' : '70px'
            }"
          >
            <div class="course-progress__head" @click="chapter.expand = !chapter.expand">
              <div class="wrapper">
                <vue-ellipse-progress
                  :progress="calculateProgress(chapter)"
                  :determinate="false"
                  color="#232323"
                  empty-color="#fff"
                  :empty-color-fill="calculateProgress(chapter) ? '#fabd39' : '#fff'"
                  :size="32"
                  :thickness="1"
                  :empty-thickness="1"
                  lineMode="normal"
                  :legend="false"
                  animation="rs 700 400"
                  fontSize="1.5rem"
                  :loading="false"
                >
                  <div slot="legend-caption">
                    <span> {{ calculateProgress(chapter) }}% </span>
                  </div>
                </vue-ellipse-progress>
                <div class="title">{{ chapter.title }}</div>
              </div>
              <img
                src="@/assets/images/Course/expand.svg"
                alt="expand"
                :style="{ transform: chapter.expand ? 'scaleY(-1)' : '' }"
              />
            </div>
            <div class="track-wrapper">
              <div v-for="(subChapter, i) in chapter.subChapters" :key="i" class="course-progress__track">
                <img :src="getImageStatusCourse(subChapter)" alt="statusCourse" />
                <div class="name">{{ subChapter.title }}</div>
              </div>
            </div>
            <!-- <router-link
            class="course-progress__btn button"
            :to="{ name: 'StartChapter', query: $route.query }"
          >
            {{ calculateProgress(chapter) ? 'Продолжить' : 'Начать' }}
          </router-link> -->
            <button class="course-progress__btn button" @click="showXAPI()">
              {{ calculateProgress(chapter) ? 'Продолжить' : 'Начать' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <iframe
      v-if="$route.query.show"
      class="iframe"
      :src="`/xapidemo${$route.query.show}/content/index.html`"
      width="100%"
      frameborder="0"
      scrolling="auto"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Course',
  data: () => ({
    chapters: []
  }),
  computed: {
    ...mapGetters('track', ['getPoints'])
  },
  mounted() {
    this.getChapters();
  },
  methods: {
    showXAPI() {
      // TODO Костыль с 4 номером времменно, убрать!
      this.$router.push({
        query: { n: this.$route.query.n, show: this.$route.params.id === '4' ? '1' : this.$route.params.id }
      });
    },
    getImageStatusCourse(subChapter) {
      if (subChapter.type === 'attestation') {
        return require('@/assets/images/Course/attestation.svg');
      } else if (subChapter.status === 'passed') {
        return require('@/assets/images/Course/checkedCourse.svg');
      } else if (subChapter.status === 'open') {
        return require('@/assets/images/Course/dontCheckedCourse.svg');
      }
    },
    getChapters() {
      this.chapters = this.getPoints
        .filter(p => p.id === this.$route.params.id)
        .map(p => {
          return p.chapters.map((c, index) => {
            return {
              ...c,
              expand: index === 0
            };
          });
        })
        .flat();
    },
    calculateProgress(chapter) {
      let passedSubChapters = chapter.subChapters.filter(s => s.status === 'passed');
      return Math.floor((passedSubChapters.length / chapter.subChapters.length) * 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.iframe {
  position: absolute;
  top: 100px;
  left: 0;
  height: calc(100% - 190px);
}

.course {
  margin-bottom: 90px;

  .description-wrapper {
    padding: 20px 25px;
    margin-bottom: 20px;
    background: linear-gradient(157.27deg, rgba(255, 255, 255, 0.06) -3.22%, rgba(255, 255, 255, 0) 99.02%),
      rgba(255, 255, 255, 0.2);
    box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.6), inset 0px -2px 35px rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(32px);
    border-radius: 30px;
  }

  .progress-wrapper + .progress-wrapper {
    margin-top: 20px;
  }

  &-description {
    font-size: 16px;
    line-height: 20px;
  }

  &-progress {
    padding: 20px;
    overflow: hidden;
    transition: 0.5s;

    .track-wrapper {
      margin-bottom: 15px;
    }

    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      .wrapper {
        display: flex;
        align-items: center;
      }

      .title {
        margin-left: 13px;
      }

      img[alt='expand'] {
        transition: 0.5s;
      }

      span {
        font-size: 12px;
        font-weight: 700;
      }
    }

    &__track {
      display: flex;
      position: relative;
      margin-left: 35px;

      & + & {
        margin-top: 10px;

        &::after {
          content: '';
          position: absolute;
          bottom: 21px;
          left: 9px;
          background: #232323;
          width: 1px;
          height: 15px;
        }
      }

      .name {
        margin-left: 10px;
      }
    }

    &__btn {
      margin-top: 0;
      text-decoration: none;
    }
  }
}
</style>