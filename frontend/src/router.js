import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import login from './components/LogIn.vue'
import signup from './components/SignUp.vue'
import account from './components/Account.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
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
    path: '/account',
    name: "account",
    component: account}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
