<template>
  <div class="course">
    <div v-if="!$route.query.show">
      <div class="modal description-wrapper">
        <p class="course-description">
          Раздел «Говори правильно» поможет вам развить навыки общения с пассажирами. После обучения вы
          сможете лучше понимать клиентов и правильно доносить свои мысли.<br /><br />Готовы перейти на новый
          уровень общения?
        </p>
      </div>
      <div>
        <div v-for="(chapter, chapterIndex) in chapters" :key="chapterIndex" class="modal progress-wrapper">
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
                <div class="title">{{ chapter.expand ? chapter.title : sliceText(chapter.title) }}</div>
              </div>
              <img
                src="@/assets/images/Course/expand.svg"
                alt="expand"
                :style="{ transform: chapter.expand ? 'scaleY(-1)' : '' }"
              />
            </div>
            <div class="track-wrapper">
              <div
                v-for="(subChapter, subChapterIndex) in chapter.subChapters"
                :key="subChapterIndex"
                class="course-progress__track"
                @click="showXAPI(`${chapter.id}.${subChapterIndex + 1}`, subChapter.status, subChapter.type)"
              >
                <img :src="getImageStatusCourse(subChapter)" alt="statusCourse" />
                <div class="name">{{ sliceText(subChapter.title) }}</div>
              </div>
            </div>
            <button class="course-progress__btn button" @click="handlerActionChapter(chapter)">
              {{
                calculateProgress(chapter) === 100
                  ? 'Повторить'
                  : calculateProgress(chapter)
                  ? 'Продолжить'
                  : 'Начать'
              }}
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
    <DefaultModal v-if="showDefaultModal" @close-modal="showDefaultModal = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultModal from '../../modals/DefaultModal.vue';

export default {
  name: 'Course',
  components: { DefaultModal },
  data: () => ({
    chapters: [],
    showDefaultModal: false
  }),
  computed: {
    ...mapGetters('track', ['getPoints'])
  },
  mounted() {
    if (this.$route.query.show) {
      sessionStorage.lastShowChapter = this.$route.query.show;
    }
    if (sessionStorage.progress) this.unlockNext(Number(sessionStorage.progress));
    this.getChapters();
    document.documentElement.scrollTop = 0;
  },
  methods: {
    showXAPI(xapi_index, status, type) {
      if (status === 'close' || type === 'attestation') {
        this.showDefaultModal = true;
        return;
      }
      sessionStorage.lastShowChapter = xapi_index;
      this.$router.push({
        query: { n: this.$route.query.n, show: xapi_index }
      });
    },
    getImageStatusCourse(subChapter) {
      if (subChapter.type === 'attestation') {
        return require('@/assets/images/Course/attestation.svg');
      } else if (subChapter.status === 'passed') {
        return require('@/assets/images/Course/passedCourse.svg');
      } else if (subChapter.status === 'close') {
        return require('@/assets/images/Course/closedCourse.svg');
      } else if (subChapter.status === 'open') {
        return require('@/assets/images/Course/openCourse.svg');
      }
    },
    getChapters() {
      this.chapters = this.getPoints
        .filter(p => p.id === this.$route.params.id)
        .map(p => {
          return p.chapters.map((c, index) => {
            return {
              ...c,
              expand: index === 0 || index === 1
            };
          });
        })
        .flat();
    },
    calculateProgress(chapter) {
      let passedSubChapters = chapter.subChapters.filter(s => s.status === 'passed');
      return Math.floor((passedSubChapters.length / chapter.subChapters.length) * 100);
    },
    unlockNext(step) {
      if (step) {
        this.getPoints[0].chapters[1].subChapters.forEach((chapter, index) => {
          if (index < step) chapter.status = 'passed';
          if (index === step) chapter.status = 'open';
        });
      }
    },
    sliceText(text) {
      if (text.length > 18) {
        return text.slice(0, 18) + '...';
      }
      return text;
    },
    handlerActionChapter(chapter) {
      //!Костыль
      if (this.$route.params.id === '1') {
        if (chapter.id === 1) {
          this.showXAPI('1.1');
        }
        if (chapter.id === 2) {
          const courseIndex = chapter.subChapters.findIndex(s => s.status === 'open');
          this.showXAPI(`${chapter.id}.${courseIndex + 1}`);
        }
        if (chapter.id > 2) this.showDefaultModal = true;
      } else {
        this.showDefaultModal = true;
      }
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
  height: calc(100vh - 190px);
}

.course {
  /* margin-bottom: 90px; */

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