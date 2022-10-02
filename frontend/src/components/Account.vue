<template>
    <div class="container my-5 ">
        <h1>Candidatos</h1>
        <h2 class="my-5">Bienvenido</h2>
        <div class="row">
            <div class="col-sm-12 col-md-4 col-ls-4 col-xl-4">
                <h2 class="mb-5 border-bottom">Administrar Candidatos</h2>
                <form class="my-3" v-on:submit.prevent="createCandidato">
                    <!-- <input type="date" class="form-control my-3" :min="dateNow2()" v-model="cita.fecha"> -->
                    <input type="text" class="form-control" placeholder="000000" v-model="candidato.cedula">
                    <br>
                    <input type="text" class="form-control" placeholder="Apellido" v-model="candidato.apellido">
                    <br>
                    <input type="text" class="form-control" placeholder="Nombre" v-model="candidato.nombre">
                    <br>
                    <input type="text" class="form-control" placeholder="Resolucion" v-model="candidato.resolucion">
                    <br>
                    <input type="file" class="form-control" ref="file"
                          v-on:change="uploadFile()">
                    <br>
                    <input type="list" list="partidos" class="form-control" placeholder="partido" v-model="candidato.id_partido">
                    <datalist id="partidos">
                        <option v-for="partido in partidos">{{ partido }}</option>
                    </datalist>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <button type="submit" class="btn btn-outline-secondary ">
                                Crear Candidato
                            </button>
                        </div>
                        <div class="col-6">
                            <button type="reset" class="btn btn-outline-secondary">
                                Limpiar Formulario
                            </button>
                        </div>

                    </div>
                </form>
            </div>
            <div class="col-sm-12 col-md-8 col-ls-8 col-xl-8">

                <table class="table table-hover table-striped" v-if="candidatos.length > 0">
                    <thead class="">
                        <tr class="" style="background-color:rgba(56, 113, 176, 0.4)">
                            <th>Cedula</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Resolucion</th>
                            <th>id_partido</th>
                            <th>foto</th>
                            <th>Eliminar Candidato</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in candidatos">
                            <td>{{ item.cedula }}</td>
                            <td>{{ item.apellido }}</td>
                            <td>{{ item.nombre }}</td>
                            <td>{{ item.resolucion }}</td>
                            <td>{{ item.id_partido }}</td>
                            <!-- <td><img src={{ loadImage(item.foto) }}/></td> -->
                            <td><img src="data:image/png;base64, xx"/></td>
                            <!-- <td><img v-bind:src="'data:image/png;base64, '+ {{ item.foto }}"></td> -->
                            <!-- <td><img :src="`data:image/png;base64, {{ item.foto }}`" /> </td>     -->
                            <!-- <td scope="row">{{ item.date_time.slice(11, 16) }}</td> -->
                            <td scope="row" v-on:click="loadEliminarCandidato(item.cedula)"><button type="button"
                                    class="btn btn-outline-danger py-1 px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z">
                                        </path>
                                    </svg></button></td>
                        </tr>
                    </tbody>
                </table>
                <h2 v-else="candidatos == 0" class="my-5">No hay candidatos</h2>

            </div>
        </div>


    </div>
    
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
    name: 'account',
    data: function () {
        return {
            name: "",
            candidatos: [],
            loaded: false,
            candidato: {
                cedula: "",
                apellido: "",
                nombre: "",
                resolucion: "",
                id_partido: "",
                foto: ({images: null})
            },
            partidos: [],
        }
    },
    methods: {
        uploadFile() {
            this.candidato.foto = this.$refs.file.files[0];
        },
        getData: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            axios.get('V1/candidato/get',
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    //console.log(this.candidatos);
                    this.candidatos = result.data.Candidatos;
                    //console.log(this.candidatos);
                    this.loaded = true;
                    //console.log(result.data);
                })
                .catch((error) => {
                    console.log(error)
                    this.$emit('logOut');
                });
        },
        /*
        loadImage: function (imagen) {
            x = "'data:image/png;base64, '" + imagen
            return x; 
        },
        */
        loadEliminarCandidato: async function (cedula_candidato) {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let conf = confirm("¿Seguro desea eliminar el candidato?");
            if (conf === true) {
                axios.delete(
                    `V1/candidato/delete`,
                    {headers: { 'Authorization': `Bearer ${token}` },
                     data: {"cedula":cedula_candidato}
                    },
                )
                    .then(() => {
                        alert("Candidato eliminado correctamente")
                        this.getData()
                    }
                    )
                    .catch((error) => {
                        console.log(error);
                        alert("Error al eliminar el candidato")
                    })
            }
            else {
                alert("Se canceló la eliminación");
                this.getData()
            }


        },
        createCandidato: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let value = document.getElementById("servicios");
            let url = "V1/candidato/create?cedula="+this.candidato.cedula+
            "&nombre="+this.candidato.nombre+"&apellido="+this.candidato.apellido
            +"&resolucion="+this.candidato.resolucion+"&id_partido="+this.candidato.id_partido;
            const formData = new FormData();
            formData.append('file', this.candidato.foto);
            axios.post(url, formData, { headers: { 'Authorization': `Bearer ${token}` } },
            )
                .then((result) => {
                    //cc
                    alert("Candidato creado");
                    this.getData();
                })
                .catch((error) => {
                    console.log(error);
                        alert("Error al crear el candidato");
                })
        },
    },
    created: async function () {
        document.title = "Cuenta"
        this.horario = ['1','2','3','4'];
        this.getData();
    }

}
</script>