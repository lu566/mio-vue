import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import ApplicationList from '@/views/ApplicationList'
import App from '@/views/App'
import Test from '@/views/Test'
import PipelineList from '@/views/PipelineList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ApplicationList',
      name: 'ApplicationList',
      component: ApplicationList
    },
    {
      path: '/App',
      name: 'App',
      component: App
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/PipelineList',
      name: 'PipelineList',
      component: PipelineList
    }
  ]
})
