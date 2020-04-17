import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import dateil from '@/views/dateil'
import merchantList from '@/views/merchantList'
import activity from '@/views/activity'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/dateil',
      name: 'dateil',
      component: dateil
    },
    {
      path: '/merchantList',
      name: 'merchantList',
      component: merchantList
    },
    {
      path: '/activity',
      name: 'activity',
      component: activity
    }
  ]
})
