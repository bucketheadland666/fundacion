$(document).ready(function() {
    var user_id, opcion;
    opcion = 4;

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



    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $('#formUsuarios').submit(function(e) {
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        username = $.trim($('#username').val());
        first_name = $.trim($('#first_name').val());
        last_name = $.trim($('#last_name').val());
        gender = $.trim($('#gender').val());


        $.ajax({
            url: "bd/crud_informacion_api.php",
            type: "POST",
            datatype: "json",
            data: { user_id: user_id, username: username, first_name: first_name, last_name: last_name, gender: gender, opcion: opcion },
            success: function(data) {
                tablaUsuarios.ajax.reload(null, false);
            }
        });
        $('#modalCRUD').modal('hide');
    });



    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function() {
        opcion = 1; //alta           
        user_id = null;
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css("background-color", "#17a2b8");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Agregar información");
        $('#modalCRUD').modal('show');
    });

    //Editar        
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
        $("#username").val(username);
        $("#first_name").val(first_name);
        $("#last_name").val(last_name);
        $("#gender").val(gender);
        $("#password").val(password);
        $("#status").val(status);
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Información");
        $('#modalCRUD').modal('show');
    });

    //Borrar
    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        user_id = parseInt($(this).closest('tr').find('td:eq(0)').text());
        opcion = 3; //eliminar        
        var respuesta = confirm("¿Está seguro de borrar el registro " + user_id + "?");
        if (respuesta) {
            $.ajax({
                url: "bd/crud_informacion_api.php",
                type: "POST",
                datatype: "json",
                data: { opcion: opcion, user_id: user_id },
                success: function() {
                    tablaUsuarios.row(fila.parents('tr')).remove().draw();
                }
            });
        }
    });


    getNombresAxios();

});

const getNombresAxios = async() => {
    try {

        const resPost = await axios.post(`http://localhost:1337/entradas`, { titulo: 'worlfsdd' })
        console.log(resPost.data);
        

    } catch (error) {
        console.log(error)
    }



};