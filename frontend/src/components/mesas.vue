<template>
    <div class="container my-5 ">
        <h1>Mesas</h1>
        <h2 class="my-5">Bienvenido</h2>
        <div class="column">
            <div class="col-sm-12 col-md-4 col-ls-4 col-xl-4">
                <h2 class="mb-5 border-bottom">Administrar Mesas</h2>
                <form class="my-3" v-on:submit.prevent="createMesa">
                    <!-- <input type="date" class="form-control my-3" :min="dateNow2()" v-model="cita.fecha"> -->
                    <label>Cedulas inscritas</label>
                    <input type="text" class="form-control" placeholder="000000" v-model="mesa.cedulas">
                    <br>
                    <input type="text" class="form-control" v-model="mesa.id" disabled>
                    <br>
                <!--                     
                    <input type="text" class="form-control" placeholder="Nombre" v-model="mesa.nombre">
                    <br>
                    <input type="text" class="form-control" placeholder="Resolucion" v-model="mesa.resolucion">
                    <br>
                    <input type="file" class="form-control" ref="file" v-on:change="uploadFile()">
                    <br>
                    <input type="list" list="partidos" class="form-control" placeholder="partido" v-model="mesa.id_partido">
                    <datalist id="partidos">
                        <option v-for="(item,idx) in partidos">{{ item.nombre }}</option>
                    </datalist>
                    <br>
                 -->

                    <div class="row">
                        <div class="col-6">
                            <button type="submit" class="btn btn-outline-secondary ">
                                Crear Mesa
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
        </div>
        <div class="column">
            <div class="col-sm-12 col-md-8 col-ls-8 col-xl-8">
                <table class="table table-hover table-striped" v-if="mesas.length > 0">
                    <thead class="">
                        <tr class="" style="background-color:rgba(56, 113, 176, 0.4)">
                            <th>id Mesa</th>
                            <th>Cédulas Inscritas</th>
                            <!-- 
                            <th>Nombre</th>
                            <th>Resolucion</th>
                            <th>id_partido</th>
                            <th>foto</th> 
                            -->
                            <th>Editar mesa</th>
                            <th>Eliminar mesa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in mesas">
                            <td>{{ item.id }}</td>
                            <td>{{ item.Cedulas_inscritas }}</td>
                            <!-- 
                            <td>{{ item.nombre }}</td>
                            <td>{{ item.resolucion }}</td>
                            <td>{{ item.id_partido }}</td>
                            <td><img src="data:image/png;base64, xx"/></td>
                            -->
                            <td scope="row" v-on:click="loadEditarCandidato(item.cedula)">
                                <button type="button" class="btn btn btn-outline-success py-1 px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" 
                                        class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z">
                                        </path>
                                    </svg>
                                </button>
                            </td>
                            <td scope="row" v-on:click="loadEliminarCandidato(item.cedula)">
                                <button type="button"
                                class="btn btn-outline-danger py-1 px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        class="bi bi-trash3-fillb" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z">
                                        </path>
                                    </svg></button></td>
                        </tr>
                    </tbody>
                </table>
                <h2 v-else="mesas == 0" class="my-5">No hay mesas</h2>
            </div>
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
            mesas: [],
            loaded: false,
            mesa: {
                id: "id_mesa",
                cedulas: 0
            }
        }
    },
    methods: {
        getMesas: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            axios.get('V1/mesas/get',
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    this.mesas = result.data.mesas;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                    this.$emit('logOut');
                });
        },
        loadEliminarCandidato: async function (cedula_candidato) {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let conf = confirm("¿Seguro desea eliminar la mesa?");
            if (conf === true) {
                axios.delete(
                    `V1/mesas/delete`,
                    {headers: { 'Authorization': `Bearer ${token}` },
                     data: {"cedula":cedula_candidato}
                    },
                )
                    .then(() => {
                        alert("Mesa eliminada correctamente")
                        this.getMesas()
                    }
                    )
                    .catch((error) => {
                        console.log(error);
                        alert("Error al eliminar la mesa")
                    })
            }
            else {
                alert("Se canceló la eliminación");
                this.getMesas()
            }


        },
        createMesa: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let url = "V1/mesa/create"
            let mesasData = {
                "cedulas_inscritas": this.mesa.cedulas
            };
            const formData = new FormData(mesasData);
            //formData.append('cedulas_inscritas', this.mesa.cedulas);
            console.log(formData);
            axios.post(url, formData, { headers: { 'Authorization': `Bearer ${token}` } },
            )
                .then((result) => {
                    alert("Mesa creada");
                    this.getMesas();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al crear la mesa");
                })
        },
        editarCandidato: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let partidoDeCandidato = document.getElementById("editpartido").value;
            var id_part=0;
            this.partidos.forEach(function (combo) {
                if (combo.nombre == partidoDeCandidato){
                    id_part = combo.id;
                }
            })
            let url = "V1/mesa/update?cedula="+document.getElementById("editcedula").value+
            "&nombre="+document.getElementById("editnombre").value+"&apellido="+document.getElementById("editapellido").value
            +"&resolucion="+document.getElementById("editresolucion").value+"&id_partido="+id_part;
            const formData = new FormData();
            formData.append('file', this.candidatoEdit.foto);
            axios.patch(url, formData, { headers: { 'Authorization': `Bearer ${token}` } },
            )
                .then((result) => {
                    alert("Mesa modificado");
                    this.getMesas();
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al editar el mesa");
                })
        },
    },
    created: function () {
        document.title = "Mesas"
        //this.getPartidos();
        this.getMesas();
    }

}
</script>