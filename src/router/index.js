import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Results from '@/components/Results'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true,
    },
    {
      path: '/Results',
      name: 'Results',
      component: Results,
      props: true,
    }
  ]
})
