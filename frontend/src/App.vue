<template>
  <div id="App" class="App">
    <div class="text-center">
      <img src="./assets/logo.png" alt="Logo Registraduria" class="img-fluid">
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark size-nav menu">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarAdmin">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" v-on:click="loadMesas" v-if="is_Admin == 1">Mesas</a><!--aria-current="page"-->
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadPartidos" v-if="is_Admin == 1">Partidos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadCandidato" v-if="is_Admin == 1">Candidatos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadResultados" v-if="is_Auth == 1">Resultados</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadJurados" v-if="is_Jury == 1">Jurados</a>
            </li>            
          </ul>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" v-on:click="loadHome">Inicio</a><!--aria-current="page" -->
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadContactUs">Contáctenos</a>              <!--href="#"-->
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadWhoAreWe">¿Quienes somos?</a><!-- href="about.html"-->
            </li>
            <li class="nav-item">
              <a class="nav-link " v-on:click="loadSignUp" v-if="is_Auth == 0">Registro</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadChangePassword" v-if="is_Auth == 1">Cambiar contraseña</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadLogOut" v-if="is_Auth == 1">Cerrar Sesión</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="loadLogin" v-if="is_Auth == 0">Iniciar Sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br>
    <div class="main-component">
      <router-view v-on:completedLogin="completedLogin" v-on:loadLogOut="loadLogOut">
      </router-view>
    </div>
    <br>
    <footer class="bg-dark text-center text-white">
      <div class="text-center p-5">
        <p class="separacion">Avenida Calle 26 # 51-50 - CAN (Bogotá - Colombia)</p>
        <p class="separacion">- Horario de atención correspondencia de lunes a viernes de 8:00 a.m. a 4:30 p.m. en
          jornada continua (Sede CAN Avenida Calle 26 # 51-50 )</p>
        <p class="separacion">- Conmutador: +57 (61) 220 2880</p>
        <p class="separacion">- CAIC Centro de Atención e Información al Ciudadano</p>
      </div>
    </footer>
  </div>
</template>
<script>

import jwt_decode from 'jwt-decode';

export default {
  name: 'App',
  data: function () {
    return {
      is_Auth: 0,
      is_Admin: 0,
      is_Jury: 0
    }
  },
  components: {},
  methods: {
    //eventos de navegacion por la pagina
    loadHome: function () {
      this.$router.push({ name: 'home' })
    },
    loadContactUs: function () {
      this.$router.push({ name: 'contactUs' })
    },
    loadWhoAreWe: function () {
      this.$router.push({ name: 'about' })
    },
    loadSignUp: function () {
      this.$router.push({ name: 'signup' })
    },
    loadChangePassword: function () {
      this.$router.push({ name: 'changepassword' })
    },
    loadLogin: function () {
      this.$router.push({ name: 'login' })
    },
    loadJurados: function () {
      this.$router.push({ name: 'jurado' })
    },
    loadLogOut: function () {
      let logOutConfirm = confirm("¿Desea cerrar la sesión?")
      if (logOutConfirm) {
        localStorage.clear();
        //alert("Sesión cerrada");
        this.verifyAuth();
        localStorage.clear();
      }
    },
    //eventos de consultas y administracion
    loadResultados: function () {
      this.$router.push({ name: 'resultados' })
    },
    loadMesas: function () {
      this.$router.push({ name: 'mesas' })
    },
    loadCandidato: function () {
      this.$router.push({ name: 'candidato' })
    },
    loadPartidos: function () {
      this.$router.push({ name: 'partido' })
    },
    verifyAuth: function () {
      this.is_Auth = localStorage.getItem('is_Auth') || 0;
      this.is_Admin = localStorage.getItem('is_Admin') || 0;
      this.is_Jury = localStorage.getItem('is_Jury') || 0;
      if (this.is_Auth == 0) {
        this.$router.push({ name: 'home' });
      }
      else if (this.is_Admin == 1) {
        this.$router.push({ name: 'candidato' });
      }
      else if (this.is_Jury == 1) {
        this.$router.push({ name: 'jurado' });
      }
      else if (this.is_Admin == 0) {
        this.$router.push({ name: 'resultados' });
      }
      else {
        console.log("no es nada")
      }
    },
    completedLogin: function (data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user);
      localStorage.setItem('cedula', data.cedula);
      let tokenDecoded = jwt_decode(data.token)
      if (tokenDecoded.sub.id_rol.nombre == "registrador nacional") {
        localStorage.setItem('is_Admin', 1);
        localStorage.setItem('is_Jury', 0);
      }
      else if (tokenDecoded.sub.id_rol.nombre == "jurado") {
        localStorage.setItem('is_Admin', 0);
        localStorage.setItem('is_Jury', 1);
      }
      else {
        localStorage.setItem('is_Admin', 0);
        localStorage.setItem('is_Jury', 0);
      }
      localStorage.setItem('is_Auth', 1);
      this.verifyAuth();
    }
    
  },
  created: function () {
    document.title = "Registraduria";
    this.$router.push({ name: 'home' })
    this.verifyAuth();
  }
}

</script>

<style>
body {
  margin: 0 0 0 0;
}

.header {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;
  background-color: #283747;
  color: #E5E7E9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  width: 20%;
  text-align: center;
}
input.borde{
    border-radius: 30px;
}

nav.menu{
    position: sticky;
    top: 0;
}

.separar{
  margin-right: 8px;
}

</style>