import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import login from './components/LogIn.vue'
import signup from './components/SignUp.vue'

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
  component: signup}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
