<template>

    <div class="container text-center">
        <h2>Contáctanos</h2>
        <br>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form action="" v-on:submit.prevent="enviarFormulario" class="row g-3">
                    <div class="row mb-3">
                        <input type="number" class="form-control borde" v-model="contacto.cedula" placeholder="Cedula">
                    </div>
                    <div class="row mb-3">
                        <input type="text" class="form-control borde" v-model="contacto.nombre" placeholder="Nombres">
                    </div>
                    <div class="row mb-3">
                        <input type="text" class="form-control borde" v-model="contacto.apellido"
                            placeholder="Apellidos">
                    </div>
                    <div class="row mb-3">
                        <input type="email" class="form-control borde" id="email" v-model="contacto.email"
                            placeholder="Email">
                    </div>
                    <div class="row mb-3">
                        <input type="password" class="form-control borde" v-model="contacto.contrasena"
                            placeholder="Contraseña">
                    </div>
                    <div class="row mb-3">
                        <div class="mb-3">
                            <textarea class="form-control" id="FormControlTextarea1" rows="3" placeholder="Comentarios"></textarea>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <input type="submit" class="btn btn-outline-secondary borde" value="Registrar">
                    </div>
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
            contacto: {
                cedula: "",
                apellido: ""
            }
        }
    },
    methods: {
        enviarFormulario: function () {
            console.log("enviar formulario");
        }
    },
    created() {
        document.title = "Contáctenos"
    }
}
</script>