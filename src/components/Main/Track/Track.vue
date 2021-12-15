<template>
  <div ref="wrapper" class="track-wrapper">
    <div class="track">
      <img src="../../../assets/images/Track/emptyTrackBtn.png" alt="map" class="track-map" />
      <div
        v-for="(point, index) in getPoints"
        ref="helperMark"
        :key="point.name"
        class="track-point"
        :style="{ top: pointsPosition[index].position.top }"
        @click="goToCourse(point)"
      />
    </div>
    <TheModal :show="isShowModal" maxWidth="650">
      <LessonStarted @close-modal="isShowModal = false" />
    </TheModal>
  </div>
</template>

<script>
import TheModal from '@/components/modals/TheModal';
import LessonStarted from '@/components/modals/LessonStarted';
import animationSvg from './animationSvg';
import pointsPosition from './pointsPosition';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Track',
  components: {
    TheModal,
    LessonStarted
  },
  data: () => ({
    isShowModal: false
  }),
  computed: {
    ...mapGetters('track', ['getPoints']),
    images() {
      return animationSvg;
    },
    pointsPosition() {
      return pointsPosition;
    },
    lastCurrentCourseId() {
      if (sessionStorage.startCourse) {
        return JSON.parse(sessionStorage.startCourse).id;
      }
      return null;
    }
  },
  created() {
    window.addEventListener('scroll', this.setPositionHelpItem);
  },
  mounted() {
    this.setPositionHelpItem();
    this.startCoursePosition();
    this.checkedStartCourse();
  },
  destroyed() {
    window.removeEventListener('scroll', this.setPositionHelpItem);
  },
  methods: {
    ...mapActions('helper', ['setHelperItems']),
    goToCourse(point) {
      sessionStorage.startCourse = JSON.stringify({
        id: point.id,
        name: point.name
      });
      this.$router.push({
        name: 'course',
        params: { id: point.id },
        query: { n: point.name }
      });
      sessionStorage.goToMissedCourse = true;
    },
    startCoursePosition() {
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
    },
    checkedStartCourse() {
      if (sessionStorage.startCourse && !sessionStorage.goToMissedCourse) {
        setTimeout(() => {
          this.startCourse = sessionStorage.startCourse;
          this.isShowModal = true;
        }, 500);
      }
    },
    setPositionHelpItem() {
      const topPosition = ['track', this.$refs.helperMark[0].getBoundingClientRect().y + 'px'];
      this.setHelperItems(topPosition);
    }
  }
};
</script>

<style lang="scss" scoped>
.track-wrapper {
  /* overflow: auto; */
  /* width: 100vw; */
  margin-top: -65px;
  margin-bottom: -90px;
  background: #e5e5e5;
}

.track {
  position: relative;
  /* min-height: 95vh;
  min-width: 95vw; */
  overflow: hidden;

  &-map {
    width: 100%;
  }

  &-point {
    width: 100%;
    height: 200px;
    /* background: rgba($color: #000000, $alpha: 0.3); */
    z-index: 0;
    position: absolute;
  }

  &-current-point {
    transform: scale(1);
  }
}

.anim {
  position: absolute;
}

.scaleAnimation {
  animation: scale 2s infinite cubic-bezier(0, 0, 1, 1);
}

/* .rotateAnimation {
  animation: rotateY 3s infinite;
} */

/* @keyframes rotateY {
  50% {
    transform: rotateY(35deg);
  }
} */

@keyframes scale {
  50% {
    transform: scale(1.15);
  }
}
</style>
