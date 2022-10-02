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
                            <td><img src="data:image/png;base64, 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"/></td>
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
                id_partido: ""
            },
            partidos: [],
        }
    },
    methods: {
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
                    `V1/candidato/delete`,{ headers: { 'Authorization': `Bearer ${token}` }},
                    {"cedula":cedula_candidato}
                )
                    .then((result) => {
                        console.log(result)
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
            let url = "V1/candidato/create?nombre="+this.candidato.nombre+"&apellido="+this.candidato.apellido
            +"&resolucion="+this.candidato.resolucion+"&id_partido="+this.candidato.id_partido;
            console.log(url);
            axios.post(url, null, { headers: { 'Authorization': `Bearer ${token}` } },
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