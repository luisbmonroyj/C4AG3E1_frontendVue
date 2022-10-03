<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
            </div>
            <div class="col-4 border my-5 card">
                <h2 class="my-5">Registrate</h2>
                <form v-on:submit.prevent="processSignUp">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="email" class="form-control" placeholder="Mail@mail.com" v-model="user.user"
                                required>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="password" class="form-control" placeholder="Contraseña"
                                v-model="user.contrasena" required>
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <br>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="number" class="form-control" placeholder="3002221100" v-model="user.cedula"
                                required>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="checkbox" class="" required id="chk" unchecked>
                            <label for="chk">&nbsp;&nbsp; Acepto los <a href="">términos</a></label>
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <button type="submit" class="btn btn-primary my-5">Registrarse</button>
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
            }
        }
    },
    methods: {
        processSignUp: function () {
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
        document.title = "Registrarse"
    }

}

</script>
