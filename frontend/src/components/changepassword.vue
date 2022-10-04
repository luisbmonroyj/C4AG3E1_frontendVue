<template>

    <div class="container text-center">
        <h2>Cambiar Contraseña</h2>
        <br>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form action="" v-on:submit.prevent="changePassword" v-on:updated="loadData" class="row g-3">
                    <div class="row mb-3">
                        <input type="number" id="cedula" class="form-control borde" v-model="user.cedula" placeholder="Cédula"
                            disabled>
                    </div>
                    <div class="row mb-3">
                        <input type="email" id="email" class="form-control borde" v-model="user.username" placeholder="Email"
                            disabled>
                    </div>
                    <div class="row mb-3">
                        <input type="password" id="contrasena" class="form-control borde" v-model="user.contrasena"
                            placeholder="Contraseña" required>
                    </div>
                    <div class="row mb-3">
                        <input type="password" id="contrasena2" class="form-control borde" v-model="user.contrasena"
                            placeholder="Repetir Contraseña" required>
                    </div>
                    <div class="row mb-4">
                        <input type="submit" class="btn btn-dark borde" value="Enviar Comentarios">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    //con estos datos se carga el formulario
    name: 'signup',
    data: function () {
        return {
            user: {
                cedula: localStorage.getItem('cedula'),
                username: localStorage.getItem('user'),
                contrasena: "",
                contrasena2: ""
            }
        }
    },
    methods: {
        changePassword: async function () {
            //verificar que la contrasena sea igual en ambos campos
            if (this.user.contrasena != this.user.contrasena2) {
                alert("Los datos no coinciden");
                return;
            }
            else {
                if (localStorage.getItem("token") === null) {
                    this.$emit('logOut');
                    return;
                }
                else {
                    let token = localStorage.getItem("token");
                    let url = "V1/usuario";
                    let userData = {
                        'user': this.user.username,
                        'cedula': parseInt(this.user.cedula),
                        'contrasena': this.user.contrasena
                    }
                    /*
                    console.log("datos de user");
                    console.log( this.user.username);
                    console.log( this.user.cedula);
                    console.log( this.user.contrasena);
                    console.log(userData);
                    const formData = new FormData();
                    formData.append('contrasena', this.user.contrasena);
                    formData.append('cedula',this.user.cedula);
                    formData.append('user',this.user.username);
                    console.log("datos de formData");
                    console.log(formData);
                    */
                    console.log(userData)
                    axios.patch(url,
                        userData,
                        { headers: { 'Authorization': `Bearer ${token}` } },
                    )
                        .then((result) => {
                            alert("Contraseña modificada. Debe volver a iniciar sesión");
                            localStorage.clear();
                            //this.$router.push({ name: 'root' })
                        })
                        .catch((error) => {
                            console.log(error);
                            alert("Error al cambiar la contraseña");
                        })
                }
            }
            /*
           axios.post("V1/usuario",this.user,{ headers: {} })
                .then((result) => {
                    let dataSignUp = {
                        user: this.user.user,
                        contrasena: this.user.contrasena,
                    }
                    axios.post("http://localhost:7777/login",dataSignUp,{ headers: {} })
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
                */
        }
    },
    created() {
        document.title = "Cambiar contraseña";

    }

}
</script>
