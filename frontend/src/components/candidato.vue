<template>
    <div class="container my-5 ">
        <div class="container">
            <div class="row justify-content-evenly">
                <div class="col-5 text-center ">
                    <h2>Registrar Candidatos</h2>
                    <br>
                    <div class="row">
                        <form action="" v-on:submit.prevent="createCandidato" class="row">
                            <div class="col separar">
                                <div class="row mb-3">
                                    <input type="number" class="form-control borde" id="cedula"
                                        v-model="candidato.cedula" placeholder="Cédula">
                                </div>
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="nombres"
                                        v-model="candidato.nombre" placeholder="Nombres">
                                </div>
                                <div class="row mb-3">
                                    <label>Seleccione Partido</label>
                                    <select id="partidos" class="form-select borde" v-model="candidato.id_partido">
                                        <option v-for="(item,idx) in partidos">{{ item.nombre }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="resolucion"
                                        v-model="candidato.resolucion" placeholder="Resolución">
                                </div>
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="apellidos"
                                        v-model="candidato.apellido" placeholder="Apellidos">
                                </div>
                                <br>
                                <div class="row mb-4">
                                    <input type="file" class="form-control borde" ref="file" v-on:change="uploadFile()">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col separar">
                                    <div class="row mb-4">
                                        <input type="submit" class="btn btn-dark borde" value="Registrar Candidatos">
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
                    <h2>Editar Candidatos</h2>
                    <br>
                    <div class="row">
                        <form action="" v-on:submit.prevent="editarCandidato" class="row">
                            <div class="col separar">
                                <div class="row mb-3">
                                    <input type="number" class="form-control borde" id="editcedula"
                                        v-model="candidato.cedula" placeholder="Cédula" disabled>
                                </div>
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="editnombre"
                                        v-model="candidato.nombre" placeholder="Nombres">
                                </div>

                                <div class="row mb-3">
                                    <input type="list" list="partidos" class="form-control" placeholder="partido"
                                        id="editpartido">
                                    <datalist id="partidos1">
                                        <option v-for="(item,idx) in partidos">{{ item.nombre }}</option>
                                    </datalist>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="editresolucion"
                                        v-model="candidato.resolucion" placeholder="Resolución">
                                </div>
                                <div class="row mb-3">
                                    <input type="text" class="form-control borde" id="editapellido"
                                        v-model="candidato.apellido" placeholder="Apellidos">
                                </div>
                                <div class="row mb-4">
                                    <input type="file" class="form-control" ref="file2" v-on:change="uploadFile2()">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col separar">
                                    <div class="row mb-4">
                                        <input type="submit" class="btn btn-dark borde" value="Editar Candidatos">
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




        <h1>Candidatos</h1>
        <div class="container">
            <table class="table table-striped table-hover table-bordered" v-if="candidatos.length > 0">
                <tr v-for="(item, idx) in candidatos">
                    <td style="width:15%">
                        <img :src="`data:image/png;base64, ${item.foto}`" style="width:210px; height:210px">
                    </td>
                    <td>
                        <p>{{ item.nombre }} {{ item.apellido }}</p>
                        <p>Resolución: {{ item.resolucion }}</p>
                        <p>Partido: {{ item.id_partido }}</p>
                    </td>
                    <td scope="row" v-on:click="loadEditarCandidato(item.cedula)">
                        <button type="button" class="btn btn btn-outline-success py-1 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                class="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z">
                                </path>
                            </svg>
                        </button>
                    </td>
                    <td scope="row" v-on:click="loadEliminarCandidato(item.cedula)">
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
            <h2 v-else="candidatos == 0" class="my-5">No hay candidatos</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'candidato',
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
                foto: ({ images: null })
            },
            partidos: [],
            candidatoEdit: {
                foto: ({ images: null })
            }
        }
    },
    methods: {
        uploadFile() {
            this.candidato.foto = this.$refs.file.files[0];
        },
        uploadFile2() {
            this.candidatoEdit.foto = this.$refs.file2.files[0];
        },
        getCandidatos: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            axios.get('V1/candidato/get',
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    this.candidatos = result.data.Candidatos;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                    this.$emit('logOut');
                });
        },
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
        loadEditarCandidato: function (cedula_candidato) {
            this.candidatos.forEach(function (candidato) {
                if (candidato.cedula == cedula_candidato) {
                    document.getElementById("editcedula").value = cedula_candidato;
                    document.getElementById("editnombre").value = candidato.nombre;
                    document.getElementById("editapellido").value = candidato.apellido;
                    document.getElementById("editresolucion").value = candidato.resolucion;
                    document.getElementById("editpartido").value = candidato.id_partido;
                }
            })

        },
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
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                        data: { "cedula": cedula_candidato }
                    },
                )
                    .then(() => {
                        alert("Candidato eliminado correctamente")
                        this.getCandidatos()
                    }
                    )
                    .catch((error) => {
                        console.log(error);
                        alert("Error al eliminar el candidato")
                    })
            }
            else {
                alert("Se canceló la eliminación");
                this.getCandidatos()
            }


        },
        createCandidato: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let partidoDeCandidato = this.candidato.id_partido;
            var id_part = 0;
            this.partidos.forEach(function (combo) {
                if (combo.nombre == partidoDeCandidato) {
                    id_part = combo.id;
                }
            })
            let url = "V1/candidato/create?cedula=" + this.candidato.cedula +
                "&nombre=" + this.candidato.nombre + "&apellido=" + this.candidato.apellido
                + "&resolucion=" + this.candidato.resolucion + "&id_partido=" + id_part;
            const formData = new FormData();
            formData.append('file', this.candidato.foto);
            axios.post(url, formData, { headers: { 'Authorization': `Bearer ${token}` } },
            )
                .then((result) => {
                    alert("Candidato creado");
                    this.getCandidatos();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al crear el candidato");
                })
        },
        editarCandidato: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let partidoDeCandidato = document.getElementById("editpartido").value;
            var id_part = 0;
            this.partidos.forEach(function (combo) {
                if (combo.nombre == partidoDeCandidato) {
                    id_part = combo.id;
                }
            })
            let url = "V1/candidato/update?cedula=" + document.getElementById("editcedula").value +
                "&nombre=" + document.getElementById("editnombre").value + "&apellido=" + document.getElementById("editapellido").value
                + "&resolucion=" + document.getElementById("editresolucion").value + "&id_partido=" + id_part;
            const formData = new FormData();
            formData.append('file', this.candidatoEdit.foto);
            axios.patch(url, formData, { headers: { 'Authorization': `Bearer ${token}` } },
            )
                .then((result) => {
                    alert("Candidato modificado");
                    this.getCandidatos();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al editar el candidato");
                })
        },
    },
    created: function () {
        this.$emit('verifyAuth');
        document.title = "Candidatos"
        this.getPartidos();
        this.getCandidatos();
    }

}
</script>