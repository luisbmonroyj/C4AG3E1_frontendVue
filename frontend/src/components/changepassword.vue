<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
            </div>
            <div class="col-4 border my-5 card">
                <h2 class="my-5">Cambiar contraseña</h2>
                <form v-on:submit.prevent="changePassword" v-on:updated="loadData">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="number" id="cedula" class="form-control" v-model="user.cedula" disabled >
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">
                            <input type="email" id="email" class="form-control" v-model="user.username" disabled>
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
                                v-model="user.contrasena2" required>
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
            if (this.user.contrasena!=this.user.contrasena2){
                alert("Los datos no coinciden");    
                return;
            }
            else{
                if (localStorage.getItem("token") === null) {
                    this.$emit('logOut');
                    return;
                }
                else{
                    let token = localStorage.getItem("token");
                    let url = "V1/usuario";
                    let userData = {
                        'user':this.user.username,
                        'cedula':this.user.cedula,
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
                    axios.patch(url, userData, { headers: { 'Authorization': `Bearer ${token}` } },
                    )
                    .then((result) => {
                        alert("Contraseña modificada. Debe volver a iniciar sesión");
                        localStorage.clear();
                        //this.$emit('logOut')
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
