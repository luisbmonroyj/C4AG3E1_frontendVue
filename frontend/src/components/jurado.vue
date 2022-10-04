<template>
<h1>Jurados</h1>
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
            /*getCandidatos: async function () {
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
                        this.mesas = result.data.Partidos;
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
            }*/
        },
        created: function () {
            /*this.$emit('verifyAuth');
            document.title = "Candidatos"
            this.getMesas();
            this.getCandidatos();*/
        }
    
    }
</script>