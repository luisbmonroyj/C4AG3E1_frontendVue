<template>
  <div id="app" class="app">
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
                        <a class="nav-link " href="signUp.html">Registro</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="login.html">Inicio de Sesión</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <br>
    <div id="carouselExampleInterval" style="margin-top:50px;" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="5000">
                <img src="./assets/logo.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="5000">
                <img src="./assets/logo.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="5000">
                <img src="./assets/logo.png" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
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
  },
  methods:{
  },
  created: function(){
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