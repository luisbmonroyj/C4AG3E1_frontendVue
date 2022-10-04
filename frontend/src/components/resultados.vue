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
                <h2 v-else="candidatos == 0" class="my-5">No hay candidatos</h2>

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
            }
        }
    },
    methods: {
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
                axios.get('V1/resultado/listar_por_candidato?id_mesa=' + mesa,
                { headers: { 'Authorization': `Bearer ${token}` },})
                .then((result) => {
                    this.resultCandidato = result.data;
                    this.loaded = true;
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        }
    },
    created: function () {
        document.title = "Resultados"
        this.getResultados1(null);
    }

}
</script>