import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';
import Home from '@/components/Main/Home/Home.vue';
import Track from '@/components/Main/Track/Track.vue';
import Sertificate from '@/components/Main/Sertificate/Sertificate.vue';
import forgotPassword from '@/components/Login/ForgotPassword.vue';
import Error from '@/views/Error.vue';
import Course from '@/components/Main/Course/Course.vue';
import ChapterCourse from '@/components/Main/Course/ChapterCourse.vue';
import StartChapter from '@/components/Main/Course/StartChapter.vue';
import ChapterLongread from '@/components/Main/Course/ChapterLongread.vue';
import Login from '@/components/Login/Login.vue';
import AuthView from '@/views/AuthView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    children: [
      {
        path: '/auth',
        name: 'Login',
        component: Login
      },
      {
        path: '/auth/forgotPassword',
        name: 'forgotPassword',
        component: forgotPassword
      }
    ]
  },
  {
    path: '/',
    name: 'main',
    redirect: '/auth',
    component: Main,
    children: [
      {
        path: '/back',
        redirect: '/track'
      },
      {
        path: '/home',
        name: 'home',
        component: Home
      },
      {
        path: '/track',
        name: 'track',
        component: Track
      },
      {
        path: '/track/course/:id',
        name: 'course',
        component: Course
      },
      {
        path: '/track/course/:id/chapter',
        name: 'ChapterCourse',
        component: ChapterCourse,
        children: [
          {
            path: '/track/course/:id/chapter',
            name: 'StartChapter',
            component: StartChapter
          },
          {
            path: '/track/course/:id/longread',
            name: 'ChapterLongread',
            component: ChapterLongread
          },
        ]
      },
      {
        path: '/sertificate',
        name: 'sertificate',
        component: Sertificate
      },
    ]
  },
  {
    path: '*',
    name: 'error',
    component: Error
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
