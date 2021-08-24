$(document).ready(function() {
    var user_id, opcion;
    opcion = 4;
    const API = "http://localhost:1337/entradas";

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
                { "data": "titulo" },
                { "data": "descripcion" },
                { "data": "informacion" },
                { "data": "departamento" },
                {
                    "data": "imagen[0].url",
                    render: function(data, type, row) {
                        return '<div class=""><img src="http://localhost:1337' + data + '?452909.60000002384" width="200px" /></div>';

                        /* return '<a>(' + data + ')</a>';*/

                        /* return '<div class=""><img src="https://funsacion.herokuapp.com' + data + '?399314.5" width="200px" /></div>';
                         */
                    }
                },

                { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-xs btnEditar'><i class='material-icons' style='font-size:18px;'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons' style='font-size:18px;'>delete</i></button></div></div>" }

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
            const resPost = await axios.delete(`${API}/${id}`);
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
        //cargar imagen en el modal 
        $("#img1").attr("src", 'assets/images/nodisponible.png');

        $("#formUsuarios").trigger("reset");
        $(".modal-header").css("background-color", "#002856");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Agregar información");
        $('#modalCRUD').modal('show');
    });

    const agregarAxios = async() => {

        try {
            titulo = $.trim($('#username').val());
            descripcion = $.trim($('#first_name').val());
            informacion = $.trim($('#last_name').val());
            departamento = $.trim($('#gender').val());
            const resPost = await axios.post(`${API}`, { titulo: titulo, descripcion: descripcion, informacion: informacion, departamento: departamento });


            //recargar tabla
            $('#tablaUsuarios').DataTable().clear().destroy();
            obtenerDatos();

        } catch (error) {
            console.log(error);
        }

    };
    //editar

    const cargarImagen = (id) => {
        var resultado;
        axios.get(`http://localhost:1337/entradas/${id}`)
            .then((response) => {
                resultado = response.data.imagen[0].url;

                var rutaImagen = 'http://localhost:1337' + resultado + '?452909.60000002384';
                console.log(rutaImagen);
                //cargar imagen en el modal 
                $("#img1").attr("src", `${rutaImagen}`);

                console.log("Datos para imagen")
                console.log(resultado)

            })
            .catch((error) => {
                console.log(error);
            });


    }


    $(document).on("click", ".btnEditar", function() {
        opcion = 2; //editar
        fila = $(this).closest("tr");
        user_id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        username = fila.find('td:eq(1)').text();
        first_name = fila.find('td:eq(2)').text();
        last_name = fila.find('td:eq(3)').text();
        gender = fila.find('td:eq(4)').text();
        password = fila.find('td:eq(5)').text();
        status = fila.find('td:eq(6)').text();

        cargarImagen(user_id);

        $("#username").val(username);
        $("#first_name").val(first_name);
        $("#last_name").val(last_name);
        $("#gender").val(gender);
        $("#password").val(password);
        $("#status").val(status);
        $(".modal-header").css("background-color", "#87CEFA");
        $(".modal-header").css("text-color", "white");
        $(".modal-title").text("Editar Información");
        $('#modalCRUD').modal('show');
    });

    const editarAxios = async(id) => {
        try {
            titulo = $.trim($('#username').val());
            descripcion = $.trim($('#first_name').val());
            informacion = $.trim($('#last_name').val());
            departamento = $.trim($('#gender').val());

            const resPost = await axios.put(`${API}/${id}`, {
                titulo: titulo,
                descripcion: descripcion,
                informacion: informacion,
                departamento: departamento
            });

            //recargar tabla
            $('#tablaUsuarios').DataTable().clear().destroy();
            // $('#tablaUsuarios').DataTable().clear().destroy().ajax.reload(null, false);
            obtenerDatos();
            // tablaUsuarios.ajax.reload(null, false);
        } catch (error) {
            console.log(error);
        }
    };




});