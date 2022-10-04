<template>
    <div class="container my-5 ">
        <div class="container">
            <div class="row justify-content-evenly">
                <div class="col-5 text-center ">
                    <h2>Registrar Partidos</h2>
                    <br>
                    <div class="row">
                        <form action="" v-on:submit.prevent="createPartido" class="row">
                            <div class="col separar">
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="nombre"
                                        v-model="partido.nombre" placeholder="Nombre de partido">
                                </div>
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="lema"
                                        v-model="partido.lema" placeholder="Lema de partido">
                                </div>
                            </div>
                            <div class="col">
                                <br>
                                <div class="row mb-4">
                                    <input type="file" class="form-control borde" ref="file" v-on:change="uploadFile()">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col separar">
                                    <div class="row mb-4">
                                        <input type="submit" class="btn btn-dark borde" value="Registrar Partidos">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="row mb-3">
                                        <input type="reset" class="btn btn-dark borde" value="Limpiar">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>




                <div class="col-5 text-center ">
                    <h2>Editar Partidos</h2>
                    <br>
                    <div class="row">
                        <form action="" v-on:submit.prevent="editarPartido" class="row">
                            <div class="col separar">
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="editnombre"
                                        placeholder="Nombre de partido">
                                </div>
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="editlema"
                                        placeholder="Lema de partido">
                                </div>
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="editpartido"
                                        disabled>
                                </div>
                                
                            </div>
                            <div class="col">
                                
                                <div class="row mb-4">
                                    <input type="file" class="form-control" ref="file2" v-on:change="uploadFile2()">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col separar">
                                    <div class="row mb-4">
                                        <input type="submit" class="btn btn-dark borde" value="Editar Partidos">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="row mb-3">
                                        <input type="reset" class="btn btn-dark borde" value="Limpiar">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>




        <h1>Partidos</h1>
        <div class="container">
            <table class="table table-striped table-hover table-bordered" v-if="partidos.length > 0">
                <tr v-for="(item, idx) in partidos">
                    <td style="width:15%">
                        <img :src="`data:image/png;base64, ${item.foto}`" style="width:210px; height:210px">
                    </td>
                    <td>
                        <p>{{ item.nombre }}</p>
                    </td>
                    <td>
                        <p>{{ item.lema}}</p>
                    </td>
                    <td scope="row" v-on:click="loadEditarPartido(item.id)">
                        <button type="button" class="btn btn btn-outline-success py-1 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                class="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z">
                                </path>
                            </svg>
                        </button>
                    </td>
                    <td scope="row" v-on:click="loadEliminarPartido(item.id)">
                        <button type="button" class="btn btn-outline-danger py-1 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                class="bi bi-trash3-fillb" viewBox="0 0 16 16">
                                <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z">
                                </path>
                            </svg>
                        </button>
                    </td>
                </tr>
            </table>
            <h2 v-else="partidos == 0" class="my-5">No hay partidos</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'account',
    data: function () {
        return {
            name: "",
            partidos: [],
            loaded: false,
            partido: {
                nombre: "",
                lema: "",
                foto: ({ images: null })
            },
            partidosEdit: [],
            partidoEdit: {
                foto: ({ images: null })
            }
        }
    },
    methods: {
        uploadFile() {
            this.partido.foto = this.$refs.file.files[0];
        },
        uploadFile2() {
            this.partidoEdit.foto = this.$refs.file2.files[0];
        },
        
        // getCandidatos: async function () {
        //     if (localStorage.getItem("token") === null) {
        //         this.$emit('logOut');
        //         return;
        //     }
        //     let token = localStorage.getItem("token");
        //     axios.get('V1/candidato/get',
        //         { headers: { 'Authorization': `Bearer ${token}` } })
        //         .then((result) => {
        //             this.candidatos = result.data.Candidatos;
        //             this.loaded = true;
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //             this.$emit('logOut');
        //         });
        // },
        getPartidos: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            axios.get('V1/partido/get',
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    this.partidos = result.data.Partidos;
                    this.loaded = true;
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
        loadEditarPartido: function (id) {
            this.partidos.forEach(function (partido) {
                if (partido.id == id) {
                    //document.getElementById("edit").value = id;
                    document.getElementById("editnombre").value = partido.nombre;
                    document.getElementById("editlema").value = partido.lema;
                    //document.getElementById("editresolucion").value = partido.resolucion;
                    /*
                    let id_partido_candidato = partido.id_partido
                    
                    var id_part="";
                    this.partidos.forEach(function (combo) {
                        if (combo.id == id_partido_candidato){
                            id_part = combo.nombre;
                        }
                    })
                    */
                    document.getElementById("editpartido").value = partido.id;
                }
            })

        },
        loadEliminarPartido: async function (id) {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let conf = confirm("¿Seguro desea eliminar el partido?");
            if (conf === true) {
                axios.delete(
                    `V1/partido/delete`,
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                        data: { "id": id }
                    },
                )
                    .then(() => {
                        alert("Partido eliminado correctamente")
                        this.getPartidos()
                    }
                    )
                    .catch((error) => {
                        console.log(error);
                        alert("Error al eliminar el partido")
                    })
            }
            else {
                alert("Se canceló la eliminación");
                this.getPartidos()
            }


        },
        createPartido: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            /*
            let partidoDeCandidato = this.partido.id_partido;
            var id_part = 0;
            this.partidos.forEach(function (combo) {
                if (combo.nombre == partidoDeCandidato) {
                    id_part = combo.id;
                }
            })
            */
            let url = "V1/partido/create?" + "nombre=" + this.partido.nombre + "&lema=" + this.partido.lema;
            console.log(url);
            const formData = new FormData();
            console.log(formData);
            formData.append('file', this.partido.foto);
            console.log(formData);
            console.log(this.partido.foto);
            axios.post(url, formData, { headers: { 'Authorization': `Bearer ${token}` } },
            )
                .then((result) => {
                    alert("Partido creado");
                    this.getPartidos();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al crear el partido");
                })
        },
        editarPartido: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            /*
            let partidoDeCandidato = document.getElementById("editpartido").value;
            var id_part = 0;
            this.partidos.forEach(function (combo) {
                if (combo.nombre == partidoDeCandidato) {
                    id_part = combo.id;
                }
            })
            */
            let url = "V1/partido/update?id=" + document.getElementById("editpartido").value +
                "&nombre=" + document.getElementById("editnombre").value + "&lema=" + document.getElementById("editlema").value;
            const formData = new FormData();
            formData.append('file', this.partidoEdit.foto);
            axios.patch(url, formData, { headers: { 'Authorization': `Bearer ${token}` } },
            )
                .then((result) => {
                    alert("Partido modificado");
                    this.getPartidos();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al editar el partido");
                })
        },
    },
    created: function () {
        document.title = "Partidos"
        this.getPartidos();
        //this.getCandidatos();
    }

}
</script>