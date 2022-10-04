<template>
    <div class="container my-5 ">
        <h1>Resultados</h1>
        <div class="column">
            <h3>Resultados Por Candidato</h3>
            <p>Seleccionar Mesa</p>
            <form class="my-3">
                    <!-- <input type="date" class="form-control my-3" :min="dateNow2()" v-model="cita.fecha"> -->
                    <input type="text" class="form-control" placeholder="0" v-model="resultadosCandidato1.mesa">
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <button type="submit" class="btn btn-outline-secondary" v-on:click="getResultados1(1)">
                                Filtrar por Mesa
                            </button>
                        </div>
                        <div class="col-6">
                            <button type="reset" class="btn btn-outline-secondary"  v-on:click="getResultados1(null)">
                                Ver todas las Mesas
                            </button>
                        </div>
                    </div>
                </form>
            <br>
            <div class="col-sm-12 col-md-8 col-ls-8 col-xl-8">
                <table class="table table-hover table-striped" v-if="resultCandidato.length > 0">
                    <thead class="">
                        <tr class="" style="background-color:rgba(56, 113, 176, 0.4)">
                            <th>Foto Candidato</th>
                            <th>Nombre Candidato</th>
                            <th>Apellido Candidato</th>
                            <th>Partido</th>
                            <th>Foto Partido</th>
                            <th>Votos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in resultCandidato">
                            <td> <img :src="`data:image/png;base64, ${item.foto_candidato}`" width="100" height="100"> </td>
                            <td>{{ item.candidato_nombre }}</td>
                            <td>{{ item.candidato_apellido }}</td>
                            <td>{{ item.partido }}</td>
                            <td> <img :src="`data:image/png;base64, ${item.foto_partido}`" width="100" height="100"> </td>
                            <td>{{ item.votos }}</td>
                        </tr>
                    </tbody>
                </table>
                <h2 v-else="resultCandidato == 0" class="my-5">No hay resultados</h2>

            </div>
        </div>
    <div class="column">
            <h3>Participación mesas</h3>
            <br>
            <div class="col-sm-12 col-md-8 col-ls-8 col-xl-8">
                <table class="table table-hover table-striped" v-if="resultMesas.length > 0">
                    <thead class="">
                        <tr class="" style="background-color:rgba(56, 113, 176, 0.4)">
                            <th>id_mesa</th>
                            <th>Participación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in resultMesas">
                            <td>{{ item.id_mesa }}</td>
                            <td>{{ redondear(item.Participacion) }}</td>
                        </tr>
                    </tbody>
                </table>
                <h2 v-else="resultMesas == 0" class="my-5">No hay resultados</h2>

            </div>
        </div>
     <div class="column">
            <h3>Resultados Por Partido</h3>
            <p>Seleccionar Mesa</p>
            <form class="my-3">
                    <!-- <input type="date" class="form-control my-3" :min="dateNow2()" v-model="cita.fecha"> -->
                    <input type="text" class="form-control" placeholder="0" v-model="resultPartido1.mesa">
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <button type="submit" class="btn btn-outline-secondary" v-on:click="getResultados3(1)">
                                Filtrar por Mesa
                            </button>
                        </div>
                        <div class="col-6">
                            <button type="reset" class="btn btn-outline-secondary"  v-on:click="getResultados3(null)">
                                Ver todas las Mesas
                            </button>
                        </div>
                    </div>
                </form>
            <br>
            <div class="col-sm-12 col-md-8 col-ls-8 col-xl-8">
                <table class="table table-hover table-striped" v-if="resultPartido.length > 0">
                    <thead class="">
                        <tr class="" style="background-color:rgba(56, 113, 176, 0.4)">
                            <th>Foto Partido</th>
                            <th>Partido</th>
                            <th>Votos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in resultPartido">
                            <td> <img :src="`data:image/png;base64, ${item.foto}`" width="100" height="100"> </td>
                            <td>{{ item.partido }}</td>
                            <td>{{ item.votos }}</td>
                        </tr>
                    </tbody>
                </table>
                <h2 v-else="resultPartido == 0" class="my-5">No hay resultados</h2>

            </div>
        </div>
    <div class="column">
            <h3>Congreso</h3>
            <br>
            <div class="col-sm-12 col-md-8 col-ls-8 col-xl-8">
                <table class="table table-hover table-striped" v-if="resultCongreso.length > 0">
                    <thead class="">
                        <tr class="" style="background-color:rgba(56, 113, 176, 0.4)">
                            <th>Foto Partido</th>
                            <th>partido</th>
                            <th>Participación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in resultCongreso">
                            <td> <img :src="`data:image/png;base64, ${item.foto}`" width="100" height="100"> </td>
                            <td>{{ item.partido }}</td>
                            <td>{{ redondear(item.Participacion) }}</td>
                        </tr>
                    </tbody>
                </table>
                <h2 v-else="resultCongreso == 0" class="my-5">No hay resultados</h2>

            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';
export default {
    name: 'resultados',
    data: function () {
        return {
            loaded: false,
            resultCandidato: [],
            resultadosCandidato1: {
                mesa: "",
            },
            resultMesas: [],
            resultPartido: [],
            resultPartido1: {
                mesa: "",
            },
            resultCongreso: [],
        }
    },
    methods: {
        redondear: function (numero) {
            numero = parseFloat(numero) * 100 
            return numero.toFixed(2) + "%";
        },
        getResultados1: async function (mesa) {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            if (mesa === null){
            axios.get('V1/resultado/listar_por_candidato',
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    this.resultCandidato = result.data;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                });
            } else {
                axios.get('V1/resultado/listar_por_candidato?id_mesa=' + this.resultadosCandidato1.mesa,
                { headers: { 'Authorization': `Bearer ${token}` },})
                .then((result) => {
                    this.resultCandidato = result.data;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        },

        getResultados2: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            axios.get('V1/resultado/listar_participacion_mesas',
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    this.resultMesas = result.data;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                });
        },

     getResultados3: async function (mesa) {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            if (mesa === null){
            axios.get('V1/resultado/listar_votos_partido',
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    this.resultPartido = result.data;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                });
            } else {
                axios.get('V1/resultado/listar_votos_partido?id_mesa=' + this.resultPartido1.mesa,
                { headers: { 'Authorization': `Bearer ${token}` },})
                .then((result) => {
                    this.resultPartido = result.data;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        },
     getResultados4: async function () {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            axios.get('V1/resultado/listar_congreso',
                { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    this.resultCongreso = result.data;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                });
        },
    },

   
    created: function () {
        document.title = "Resultados"
        this.getResultados1(null);
        this.getResultados2();
        this.getResultados3(null);
        this.getResultados4();
    }

}
</script>