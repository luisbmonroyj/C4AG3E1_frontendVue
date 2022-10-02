<template>
  <div id="App" class="App">
    <div class="text-center">
        <img src="./assets/logo.png" alt="ogo Registraduria" class="img-fluid">
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark size-nav menu">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contáctenos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.html">¿Quienes somos?</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link " v-on:click="loadSignUp">Registro</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-on:click="loadLogin">Inicio de Sesión</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <br>
    <div class="main-component">
      <router-view v-on:completedLogin="completedLogin">
      </router-view>
    </div>
    <br>
    <footer class="bg-dark text-center text-white">
        <div class="text-center p-5">
            <p class="separacion">Avenida Calle 26 # 51-50 - CAN (Bogotá - Colombia)</p>
            <p class="separacion">- Horario de atención correspondencia de lunes a viernes de 8:00 a.m. a 4:30 p.m. en jornada continua (Sede CAN Avenida Calle 26 # 51-50 )</p>
            <p class="separacion">- Conmutador: +57 (601) 220 2880</p>
            <p class="separacion">- CAIC Centro de Atención e Información al Ciudadano</p>
        </div>
    </footer>
  </div>
  </template>
  <script>
  export default {
  name: 'App',
  data: function(){
    activeItem:0;
      return {
        is_Auth: false
      }
  },
  components: {},
  methods:{
    created: function(){
    },
    loadLogin: function(){
        this.$router.push({name:'login'})
    },
    loadSignUp: function(){
        this.$router.push({name:'signup'})
      },
  verifyAuth: function(){
        this.is_Auth = localStorage.getItem('is_Auth') || false;
        if(this.is_Auth==false)
          //this.$router.push({name:'home'})
          console.log("False")
        else
          //this.$router.push({name: 'account'})
          console.log("True")
      },
  completedLogin: function(data){
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user);
        localStorage.setItem('is_Auth', true);
        this.verifyAuth();
      }
    }
  }
  </script>
  <style>
  body{
  margin: 0 0 0 0;
  }
  .header{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  background-color: #283747 ;
  color:#E5E7E9 ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  }
  .header h1{
  width: 20%;
  text-align: center;
  }
  </style>