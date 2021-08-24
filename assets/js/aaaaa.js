tablaUsuarios = $('#tablaUsuarios').DataTable({
    "ajax": {
        "url": "bd/crud_informacion_api.php",
        "method": 'POST', //usamos el metodo POST
        "data": { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
        "dataSrc": ""
    },


    "columns": [
        { "data": "id" },
        { "data": "titulo" },
        { "data": "descripcion" },
        { "data": "informacion" },
        { "data": "departamento" },
        /*             { "defaultContent": "<div class='text-center'><img src='assets/images/logo.PNG' width='150px' alt='logo' /></div>" },
         */
        {
            "data": "imagen",
            render: function(data, type, row) {
                /*                     return '<a>(' + data + ')</a>';
                 */
                return '<a>Ver imagen</a>';

            }
        },

        { "defaultContent": "<div class='text-center'><div class='btn-group' '><button class='btn btn-primary btn-sm btnEditar' ><i class='material-icons' >edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>" }
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



















const makeRequest = () => {

    var resultado;
    var prueba;

    axios.get('http://localhost:1337/entradas')
        .then((response) => {
            resultado = response.data;
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
            { "data": "titulo" },
            { "data": "descripcion" },
            { "data": "informacion" },
            { "data": "departamento" },
            {
                "data": "imagen[0].url",
                render: function(data, type, row) {
                    /* return '<a>(' + data + ')</a>';*/
                    return '<a>' + data + '</a>';

                }
            },

            { "defaultContent": "<div class='text-center'><div class='btn-group' '><button class='btn btn-primary btn-sm btnEditar' ><i class='material-icons' >edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>" }
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


makeRequest();