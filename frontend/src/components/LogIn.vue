<template>
    <div class="logInUser">
        <div class="container">
            <div class="row my-5">
                <div class="col-4"></div>
                <div class="col-4 my-5 p-5 card border-success mb-4">
                    <h2 class="card-title mb-5">Iniciar Sesión</h2>
                    <form v-on:submit.prevent="processLogin">
                        <input type="text" class="form-control" placeholder="Nombre de usuario" v-model="user.user">
                        <br>
                        <input type="password" class="form-control" placeholder="Contraseña" v-model="user.contrasena">
                        <br>
                        <button type="submit" class="btn btn-success">Iniciar Sesión</button>
                    </form>
                </div>
                <div class="col-4"></div>
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
                    //console.log(result)
                    let dataLogin = {
                        token: result.data.token,
                        user: this.user.user
                    }
                    //console.log("1")
                    this.$emit('completedLogin', dataLogin);
                    //console.log("2")
                })
                .catch((error) => {
                    if (error.response.status == '401') {
                        alert("ERROR 401");
                    }
                });
        }
    },
    created(){
        document.title = "Iniciar sesión"
    }
}
</script>
