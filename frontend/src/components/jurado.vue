<template>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form action="" v-on:submit.prevent="createResultado" class="row g-3">
                    <div class="row mb-3">
                        <label>Seleccione Mesa</label>
                        <select id="partidos" class="form-select borde" v-model="resultado.id_mesa">
                            <option v-for="(item,idx) in mesas">{{ item.id }}</option>
                        </select>
                    </div>
                    <div class="row mb-3">
                        <label>Seleccione Candidato</label>
                        <select id="partidos" class="form-select borde" v-model="resultado.cedula_candidato">
                            <option v-for="(item,idx) in candidatos">{{ item.cedula }}</option>
                        </select>
                    </div>
                    <div class="row mb-3">
                        <label>Votos</label>
                        <input type="number" class="form-control borde" v-model="resultado.votos" placeholder="0">
                    </div>
                    <div class="row mb-4">
                        <input type="submit" class="btn btn-dark borde" value="Enviar Resultado">
                    </div>
                </form>
            </div>
        </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'jurado',
        data: function () {
            return {
                name: "",
                loaded: false,
                resultado: {
                    cedula_candidato: "",
                    id_mesa: "",
                    votos: 0,
                },
                candidatos: [],
                mesas: [],
            }
        },
        methods: {
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
            createResultado: async function () {
                if (localStorage.getItem("token") === null) {
                    this.$emit('logOut');
                    return;
                }
                let token = localStorage.getItem("token");
                let url = "V1/resultado/create";
                let dataResultado = {
                        cedula_candidato: this.resultado.cedula_candidato,
                        id_mesa: this.resultado.id_mesa,
                        votos: this.resultado.votos,
                    }
                axios.post(url, dataResultado, { headers: { 'Authorization': `Bearer ${token}` } },
                )
                    .then((result) => {
                        alert("Resultado Enviado creado");
                        this.getCandidatos();
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Error al enviar el resultado");
                    })
            }
        },
        created: function () {
            this.$emit('verifyAuth');
            document.title = "Jurados"
            this.getMesas();
            this.getCandidatos();
        }
    
    }
</script>