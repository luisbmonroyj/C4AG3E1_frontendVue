<template>

    <div class="container text-center">
        <h2>Administrar Mesas</h2>
        <br>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form action="" v-on:submit.prevent="createMesa" class="row g-3">
                    <div class="row mb-3">
                        <label for="">Cédulas inscritas en la mesa</label>
                        <input type="number" class="form-control borde" v-model="mesa.cedulas"
                            placeholder="Cantidad cédulas" required>
                    </div>
                    <div class="row mb-4">
                        <input type="submit" class="btn btn-dark borde" value="Crear mesa">
                    </div>
                </form>
            </div>
        </div>
        <br>
        <h1>Mesas</h1>
        <br>
        <table class="table table-hover table-striped" v-if="mesas.length > 0">
            <thead class="table-dark">
                <tr class="">
                    <th>id Mesa</th>
                    <th>Cédulas Inscritas</th>

                    <th>Editar mesa</th>
                    <th>Eliminar mesa</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in mesas">
                    <td>
                        {{ item.id }}
                    </td>
                    <td>
                        <input type="number" class="form-control" v-model=item.Cedulas_inscritas>
                    </td>
                    <td scope="row" v-on:click="editarMesa(item.id, item.Cedulas_inscritas)">
                        <button type="button" class="btn btn btn-outline-success py-1 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                class="bi bi-pencil" viewBox="0 0 16 16">
                                <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z">
                                </path>
                            </svg>
                        </button>
                    </td>
                    <td scope="row" v-on:click="loadEliminarMesa(item.id)">
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
            </tbody>
        </table>
        <h2 v-else="mesas == 0" class="my-5">No hay mesas</h2>
    </div>

</template>

<script>
import { isTemplateElement } from '@babel/types';
import axios from 'axios';
export default {
    name: 'mesas',
    data: function () {
        return {
            name: "",
            mesas: [],
            loaded: false,
            mesa: {
                id: "",
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
        loadEliminarMesa: async function (id_mesa) {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let conf = confirm("¿Seguro desea eliminar la mesa?");
            if (conf === true) {
                axios.delete(
                    `V1/mesas/delete`,
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                        data: { "id": id_mesa }
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
            let url = "V1/mesas/create"
            let mesasData = {
                "cedulas_inscritas": parseInt(this.mesa.cedulas)
            };
            axios.post(url, mesasData, { headers: { 'Authorization': `Bearer ${token}` } },
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
        editarMesa: async function (mesaId, cedulas) {
            if (localStorage.getItem("token") === null) {
                this.$emit('logOut');
                return;
            }
            let token = localStorage.getItem("token");
            let url = "V1/mesas/update";
            let formData = {
                "id": mesaId,
                "cedulas_inscritas": cedulas
            }
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
        this.$emit('verifyAuth');        
        document.title = "Mesas"
        this.getMesas();
    }

}
</script>