<template>
    <div class="logInUser">
        <div class="container text-center">
            <h2>Inicio de Sesión</h2>
            <br>
            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <form action="" v-on:submit.prevent="processLogin" class="row g-3">
                        <div class="row mb-3">
                            <input type="email" class="form-control borde" v-model="user.user" placeholder="Email">
                        </div>
                        <div class="row mb-3">
                            <input type="password" class="form-control borde" v-model="user.contrasena"
                                placeholder="Contraseña">
                        </div>
                        <div class="row mb-4">
                            <input type="submit" class="btn btn-dark borde" value="Iniciar Sesión">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'login',
    data: function () {
        return {
            user: {
                user: "",
                contrasena: ""
            }
        }
    },
    methods: {
        processLogin: function () {
            axios.post(
                "http://localhost:7777/login",
                this.user,
                { headers: {} }
            )
                .then((result) => {
                    let dataLogin = {
                        token: result.data.token,
                        user: this.user.user,
                        cedula: result.data.user_id
                    }
                    this.$emit('completedLogin', dataLogin);
                })
                .catch((error) => {
                    if (error.response.status == '401') {
                        alert("ERROR 401");
                    }
                });
        }
    },
    created() {
        document.title = "Iniciar sesión"
    }
}
</script>
