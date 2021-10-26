import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'


// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Yangiliklar
const News = () => import('@/views/news/News.vue');
const Category = () => import('@/views/news/Category.vue');
const Tag = () => import('@/views/news/Tag.vue');
const RecommendedNews = () => import('@/views/news/Recommended-news.vue');
const Slider = () => import('@/views/news/Slider.vue');
const PostViews = () => import('@/views/news/Post-view.vue');

// Members
const Members = () => import('@/views/members/Members.vue');
const JobTypes = () => import('@/views/members/Job-types.vue');

// Advertisement
const Ads = () => import('@/views/ads/Advertisement.vue');

const Payment = () => import('@/views/payment/amount.vue');

// ContactUs
const ContactUs = () => import('@/views/contact/Contactus.vue');

// Newspaper
const Newspaper = () => import('@/views/newspaper/Newspapers.vue');

// Users
const Users = () => import('@/views/user/Users.vue');



// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

Vue.use(Router)

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Asosiy panel',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requireAuth: true }
        },
        {
          path: 'gazeta',
          name: 'Gazetalar',
          component: Newspaper,
          meta: { requireAuth: true }
        },
        {
          path: '/news',
          redirect: '/news/newslist',
          name: 'Yangilik',
          component: {
            render (c) { return c('router-view') }
          },
          meta: { requireAuth: true },
          children: [
            {
              path: 'newslist',
              name: 'Yangiliklar',
              component: News
            },
            // {
            //   path: 'category',
            //   name: 'Kategoriyalar',
            //   component: Category
            // },
            {
              path: 'tags',
              name: 'Teglar',
              component: Tag
            },
            // {
            //   path: 'recommended-posts',
            //   name: 'Taklif qilingan yangiliklar',
            //   component: RecommendedNews
            // },
            // {
            //   path: 'post-views',
            //   name: 'Yangiliklar ko\'rinish soni',
            //   component: PostViews
            // },
            {
              path: 'slider',
              name: 'Slayder',
              component: Slider
            },
          ]
        },
        {
          path: '/members',
          redirect: '/members/memberslist',
          name: 'Xodim',
          component: {
            render (c) { return c('router-view') }
          },
          meta: { requireAuth: true },
          children: [
            {
              path: 'memberslist',
              name: 'Xodimlar',
              component: Members
            },
            {
              path: 'job-types',
              name: 'Ish turlari',
              component: JobTypes
            }
          ]
        },
        {
          path: 'ads',
          name: 'Reklamalar',
          component: Ads,
          meta: { requireAuth: true }
        },
        {
          path: 'payment',
          name: 'Gazeta to\'lovi',
          component: Payment,
          meta: { requireAuth: true }
        },
        {
          path: 'contactus',
          name: 'Bizga bog\'laning',
          component: ContactUs,
          meta: { requireAuth: true }
        },
        {
          path: 'users',
          name: 'Foydalanuvchilar',
          component: Users,
          meta: { requireAuth: true }
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '500',
          name: '500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: Page404
    },
  ]
}


router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if(store.getters.isLoggedIn) {
      next()
      return;
    } else {
      next({
        name: 'Login'
      });
    }
  } else {
    next();
  }

})

export default router;

