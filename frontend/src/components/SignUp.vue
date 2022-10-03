<template>
    <div class="container text-center">
        <h2>Registrate</h2>
        <br>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form action="" v-on:submit.prevent="processSignUp" class="row g-3">
                    <div class="row mb-3">
                        <input type="number" class="form-control borde" v-model="user.cedula" placeholder="Cedula">
                    </div>
                    <div class="row mb-3">
                        <input type="email" class="form-control borde" id="email" v-model="user.user"
                            placeholder="Email">
                    </div>
                    <div class="row mb-3">
                        <input type="password" class="form-control borde" v-model="user.contrasena"
                            placeholder="Contraseña">
                    </div>
                    <div class="row mb-4">
                        <input type="submit" class="btn btn-dark borde" value="Registrar">
                    </div>
                </form>
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
