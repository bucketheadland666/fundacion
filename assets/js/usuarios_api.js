$(document).ready(function() {
    var user_id, opcion;
    opcion = 4;
    const API = "http://localhost:1337/usuarios-apps";

    const obtenerDatos = () => {

        var resultado;
        axios.get(`${API}`)
            .then((response) => {
                resultado = response.data;

                //llenado de la tabla
                llenarTabla(resultado);

                console.log("Datos para llenar la tabla")
                console.log(resultado)

            })
            .catch((error) => {
                console.log(error);
            });


    }

    function llenarTabla(datos) {
        tablaUsuarios = $('#tablaUsuarios').DataTable({
            "data": datos,
            "columns": [
                { "data": "id" },
                { "data": "nombres" },
                { "data": "telefono" },
                { "data": "correo" },
                { "data": "direccion" },
                { "data": "created_at" },
            ],
            "language": {
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "sProcessing": "Procesando...",
            }
        });



    }
    obtenerDatos();






});