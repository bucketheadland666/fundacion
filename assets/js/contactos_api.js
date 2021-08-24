$(document).ready(function() {
    var user_id, opcion;
    opcion = 4;


    /*  let datos = ""; */
    /*     var datos = [];
        buildTable(datos); */


    /*  $.ajax({
        method: 'GET',
        url: 'http://localhost:1337/entradas',
        success: function(response) {


            console.log(response.data);
        }
    });
 */


    const makeRequest = () => {

        var resultado;


        axios.get('http://localhost:1337/contactos-2-s')
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
                { "data": "nombre" },
                { "data": "informacion" },

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






    /*  let myData = makeRequest();
        console.log(myData);

        tablaUsuarios = $('#tablaUsuarios').DataTable({
            "data": myData,
            "columns": [
                { "data": "id" },
                { "data": "titulo" },
                { "data": "descripcion" },
                { "data": "informacion" },
                { "data": "departamento" },
                { "defaultContent": "<div class='text-center'><img src='assets/images/logo.PNG' width='150px' alt='logo' /></div>" },


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

     */
    var fila;

    //Borrar
    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        user_id = parseInt($(this).closest('tr').find('td:eq(0)').text());
        var respuesta = confirm("¿Está seguro de borrar el registro " + user_id + "?");
        if (respuesta) {
            eliminarAxios(user_id);
            tablaUsuarios.row(fila.parents('tr')).remove().draw();
        }


    });

    const eliminarAxios = async(id) => {
        try {
            const resPost = await axios.delete(`http://localhost:1337/contactos-2-s/${id}`);
        } catch (error) {
            console.log(error);
        }
    };
    //boton Guardar
    var boton = document.getElementById('carga_ajax');
    boton.addEventListener('click', function() {

        if (opcion == 1) {
            agregarAxios();
            console.log("agregando");
        } else if (opcion == 2) {
            console.log(opcion);
            editarAxios(user_id);
            console.log("editando");
        }

        $('#formUsuarios').submit(function(e) {
            e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
            $('#modalCRUD').modal('hide');

        });

    });
    //agregar
    $("#btnNuevo").click(function() {
        opcion = 1; //alta           
        user_id = null;
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css("background-color", "#17a2b8");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Agregar información");
        $('#modalCRUD').modal('show');
    });

    const agregarAxios = async() => {

        try {
            titulo = $.trim($('#username').val());
            descripcion = $.trim($('#first_name').val());

            const resPost = await axios.post(`http://localhost:1337/contactos-2-s`, { nombre: titulo, informacion: descripcion });


            //recargar tabla pero aun esta mal se nota el cambio
            $('#tablaUsuarios').DataTable().clear().destroy();
            makeRequest();

        } catch (error) {
            console.log(error);
        }

    };
    //editar
    $(document).on("click", ".btnEditar", function() {
        opcion = 2; //editar
        fila = $(this).closest("tr");
        user_id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        username = fila.find('td:eq(1)').text();
        first_name = fila.find('td:eq(2)').text();

        $("#username").val(username);
        $("#first_name").val(first_name);

        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Información");
        $('#modalCRUD').modal('show');
    });

    const editarAxios = async(id) => {
        try {
            titulo = $.trim($('#username').val());
            descripcion = $.trim($('#first_name').val());


            const resPost = await axios.put(`http://localhost:1337/contactos-2-s/${id}`, {
                titulo: titulo,
                descripcion: descripcion,

            });


            //recargar tabla
            $('#tablaUsuarios').DataTable().clear().destroy();
            // $('#tablaUsuarios').DataTable().clear().destroy().ajax.reload(null, false);
            makeRequest();
            // tablaUsuarios.ajax.reload(null, false);
        } catch (error) {
            console.log(error);
        }
    };




});