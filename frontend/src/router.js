import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import login from './components/LogIn.vue'
import signup from './components/SignUp.vue'
import account from './components/Account.vue'
import home from './components/home.vue'
import resultados from './components/resultados.vue'
import changepassword from './components/changepassword.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/home',
    name: "home",
    component: home
  },
  {
    path: '/resultados',
    name: "resultados",
    component: resultados
  },
  {
    path: '/user/logIn',
    name: "login",
    component: login
  },
  {
    path: '/user/signup',
    name: "signup",
    component: signup
  },
  {
    path: '/user/changepassword',
    name: "changepassword",
    component: changepassword
  },
  {
    path: '/account',
    name: "account",
    component: account
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
