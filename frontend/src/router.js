import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import login from './components/LogIn.vue'
import signup from './components/SignUp.vue'
import candidato from './components/candidato.vue'
import home from './components/home.vue'
import resultados from './components/resultados.vue'
import changepassword from './components/changepassword.vue'
import contactUs from './components/contactUs.vue'
import mesas from './components/mesas.vue'
import about from './components/about.vue'
import partido from './components/partido.vue'
import jurado from './components/jurado.vue'

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
    path: '/contactUs',
    name: "contactUs",
    component: contactUs
  },
  {
    path: '/resultados',
    name: "resultados",
    component: resultados
  },
  {
    path: '/mesas',
    name: "mesas",
    component: mesas
  },
  {
    path: '/candidato',
    name: "candidato",
    component: candidato
  },
  {
    path: '/about',
    name: "about",
    component: about
  },
  {
    path: '/partido',
    name: 'partido',
    component: partido
  },
  {
    path: '/jurado',
    name: 'jurado',
    component: jurado
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
