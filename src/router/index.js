import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import AboutHG from '@/components/aboutHG'
import OwerTeam from '@/components/owerTeam'
import OwerWork from '@/components/owerWork'
import SuccessOffer from '@/components/successOffer'
import JoinUs from '@/components/joinUs'
import ContactUs from '@/components/contactUs'
import Login from '@/components/login';
import Admin from '@/components/admin';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/AboutHG',
      name: 'AboutHG',
      component: AboutHG
    },
    {
      path: '/OwerTeam',
      name: 'OwerTeam',
      component: OwerTeam
    },
    {
      path: '/OwerWork',
      name: 'OwerWork',
      component: OwerWork
    },
    {
      path: '/SuccessOffer',
      name: 'SuccessOffer',
      component: SuccessOffer
    },
    {
      path: '/JoinUs',
      name: 'JoinUs',
      component: JoinUs
    },
    {
      path: '/ContactUs',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
