<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
            </div>
            <div class="col-4 border my-5 card">
                <h2 class="my-5">Cambiar contraseña</h2>
                <form v-on:submit.prevent="changePassword">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="number" id="cedula" class="form-control" v-model="user.cedula" disabled>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="email" id="user" class="form-control" v-model="user.user" disabled>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="password" id="contrasena" class="form-control" placeholder="Contraseña"
                                v-model="user.contrasena" required>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="password" id="contrasena2" class="form-control" placeholder="Repetir Contraseña"
                                v-model="user.contrasena" required>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary my-5">Cambiar contraseña</button>
                </form>
            </div>
            <div class="col-4">
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    name: 'signup',
    data: function () {
        return {
            user: {
                cedula: 0,
                user: "",
                contrasena: "",
                contrasena2: ""
            }
        }
    },
    methods: {
        loadData: function(){
            document.getElementById("user").value = localStorage.getItem(user);
        },
        changePassword: function () {
           axios.post(
                "V1/usuario",
                this.user,
                { headers: {} }
            )
                .then((result) => {
                    let dataSignUp = {
                        user: this.user.user,
                        contrasena: this.user.contrasena,
                    }
                    axios.post(
                        "http://localhost:7777/login",
                        dataSignUp,
                        { headers: {} }
                    )
                        .then((result) => {
                            let dataLogin = {
                                token: result.data.token,
                                user: dataSignUp.user
                            }
                            this.$emit('completedLogin', dataLogin);
                        })
                        .catch((error) => {
                            if (error.response.status == '401') {
                                alert("ERROR 401");
                            }
                        });
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error en el registro");
                });
        }
   },
    created() {
        document.title = "Cambiar contraseña";
        
    }

}
</script>
