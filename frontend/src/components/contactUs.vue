<template>
    <div class="container my-5 ">
        <h2 class="my-5">Bienvenido</h2>
        <!-- <h1>Contáctenos</h1> -->
        <div class="row">
            <div class="col-sm-12 col-md-4 col-ls-4 col-xl-4">
                <h2 class="mb-5 border-bottom">Contactenos</h2>
                <form class="my-3" v-on:submit.prevent="enviarFormulario">
                    <input type="text" class="form-control" placeholder="000000" v-model="contacto.cedula" required>
                    <br>
                    <input type="text" class="form-control" placeholder="Apellido" v-model="contacto.apellido" required>
                    <br>
                    <input type="text" class="form-control" placeholder="Nombre" v-model="contacto.nombre" required>
                    <br>
                    <input type="email" class="form-control" placeholder="Correo electrónico" v-model="contacto.email" required>
                    <br>
                    <textarea Name="comentario" rows="4" cols="45" placeholder="Ingrese sus comentarios aquí" required>
                    </textarea>
                    <br>
                    <div class="row">
                        <div class="col-6">
                            <button type="submit" class="btn btn-outline-secondary ">Enviar comentarios
                            </button>
                        </div>
                    </div>
                    <!-- 
                    <input type="date" class="form-control my-3" :min="dateNow2()" v-model="cita.fecha"> --><!--
                    <br>
                    <input type="text" class="form-control" placeholder="Resolucion" v-model="candidato.resolucion">
                    <br>
                    <input type="file" class="form-control" ref="file" v-on:change="uploadFile()">
                    <br>
                    <input type="list" list="partidos" class="form-control" placeholder="partido" v-model="candidato.id_partido">
                    <datalist id="partidos">
                        <option v-for="(item,idx) in partidos">{{ item.nombre }}</option>
                    </datalist>
                    <br>
                        <div class="col-6">
                            <button type="reset" class="btn btn-outline-secondary">
                                Limpiar Formulario
                            </button>
                        </div>
                    </div>
                -->
                </form>
            </div>
        </div>
    </div>

</template>
<script>
    
export default {
    name: 'contactUs',
    data: function () {
        return {
            contacto:{
                cedula:"000000",
                apellido:""
            }
        }
    },
    methods: {
        enviarFormulario: function(){
            console.log("enviar formulario");
        }
    },
    created(){
        document.title = "Contáctenos"
    }
}
</script>