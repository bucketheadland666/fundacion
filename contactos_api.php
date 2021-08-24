<?php 	
include 'bd/sesion.php';
$usuario=verificacion_sesion();
$tipo_usuario=tipo_usuario();

if($tipo_usuario == 'administrador'){
}else if($tipo_usuario == 'doctor'){
    header('location: m_dcotor.php');  
}else if($tipo_usuario == 'paciente'){
    header('location: m_paciente.php');  
}


?>


<!DOCTYPE html>
<html class='no-js' lang='en'>

<head>
    <meta charset='utf-8'>
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible'>
    <title>API Contactos</title>
    <meta content='lab2023' name='author'>
    <meta content='' name='description'>
    <meta content='' name='keywords'>



    <link href="assets/stylesheets/application-a07755f5.css" rel="stylesheet" type="text/css" />
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.0/css/font-awesome.min.css" rel="stylesheet"
        type="text/css" />
    <link href="assets/images/favicon.ico" rel="icon" type="image/ico" />

    <!--datables CSS básico-->
    <link rel="stylesheet" type="text/css" href="assets/datatables/datatables.min.css" />
    <!--datables estilo bootstrap 4 CSS-->
    <link rel="stylesheet" type="text/css"
        href="assets/datatables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css">

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<body class='main page' style="background-color: white;   margin:0;
  padding:0">
    <!-- Navbar -->
    <div class='navbar navbar-default' id='navbar' style="  margin:0; padding:0" >
        <a class='navbar-brand' href='#'>
            <!-- <i><img src="/assets/images/logoBlanco.png"></i> -->
            <img src='assets/images/logoClaro.PNG' width="180px" alt='logo' />

        </a>
        <ul class='nav navbar-nav pull-right' >
<br>
            <li style="font-size: 15px;">
                <a href='#'>
                <img src='assets/images/setting.png' style="width: 30px; height: 30px;" alt='logo' />
                    <strong>Ajustes</strong>
                </a>
            </li>
            <li style="font-size: 15px;">
                <a href='#'>
                <img src='assets/images/logoClaro.PNG' style="width: 30px; height: 30px;" alt='logo' />
                    <strong><?php echo $usuario; ?></strong>
                </a>
            </li>
            
        </ul>
    </div>
    <div id='wrapper' style="margin-top: 20px;">
        <!-- Sidebar -->
        <section id='sidebar'>
            <i class='icon-align-justify icon-large' id='toggle'></i>
            <ul id='dock'>
                <li class='launcher'>
                    <i class='icon-dashboard'></i>
                    <a href="dashboard.html">Estadísticas</a>
                </li>
                <li class='active launcher'>
                    <i class='icon-file-text-alt'></i>
                    <a href="administracion.php">Administración</a>
                </li>
                <li class='launcher'>
                    <i class='icon-table'></i>
                    <a href="tables.php">Configuración</a>
                </li>

            </ul>
            <!-- <div data-toggle='tooltip' id='beaker' title='Made by lab2023'></div> -->
        </section>
        <!-- Tools -->
        <section id='tools'>
            <ul class='breadcrumb' id='breadcrumb'>
                <li class='title'>Administración</li>
                <li><a href="#">Apis</a></li>
                <li><a href="#"><u> <i class='material-icons' >description</i> Api Información</u></a></li>

            </ul>

        </section>
        <!-- Content -->
        <div id='content'>
            <div class='panel panel-default grid'>
                <div class='panel-heading'>
                    <!-- <i class='icon-table icon-large'></i> -->
                    Api Información &nbsp;&nbsp; <button id="btnNuevo" class='btn btn-danger btn-sm'><i
                            class='material-icons'>add</i></button>
                            <button class='btn btn-danger btn-sm btn'><i class='material-icons'>delete</i></button>

                    <div class='panel-tools'>
                        <div class='btn-group' >

                            <a class="btn" href="forms.html" >
                                <i class="icon-reply"></i> Atras</a>
                            <!-- <i class='icon-refresh'></i> -->
                            </a>
                        </div>
                        <!-- <div class='badge'>3 record</div> -->
                    </div>
                </div>
                <div class='panel-body filters' style="">
                    <div class='row' style="margin-left: 20px; margin-right: 20px;">
                        <div class="table-responsive" style="justify-content: center;">
                            <table id="tablaUsuarios" class="table table-striped table-bordered table-condensed"
                                style="width:100%">
                                <thead class="text-center">
                                    <tr>
                                        <th>Id</th>
                                        <th>Título</th>
                                        <th>Descripcion</th>


                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody id="divTabla">
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                <!-- Inicio modal ============================================================================= -->


                <div class="modal fade" id="modalCRUD" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form id="formUsuarios">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Título:</label>
                                                <input type="text" class="form-control" id="username">
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Descripción</label>
                                                <input type="text" class="form-control" id="first_name">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Información</label>
                                                <!-- <input type="textarea" class="form-control" id="last_name"> -->
                                                <textarea name="textarea" id="last_name" rows="10" cols="34"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Departamento</label>
                                                <input type="text" class="form-control" id="gender">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row text-rigth">
                                        <div class='col-lg-6'>
                                              <label for="" class="col-form-label">Imagen</label>
                                            <img src='assets/images/logo.PNG' width="100%" alt='logo' />
                                            <br>
                                            <br>
                                            <input type="file">
                                           
                                        </div>
                                    </div>
                                    <div class="row fade">
                                        <div class="col-lg-9">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Password</label>
                                                <input type="text" class="form-control" id="password">
                                            </div>
                                        </div>
                                        <div class="col-lg-3">
                                            <div class="form-group">
                                                <label for="" class="col-form-label">Status</label>
                                                <input type="number" class="form-control" id="status">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                                    <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
                                    <button id="carga_ajax">Carga contenido</button>                                 </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Final modal ============================================================================= -->












            </div>

        </div>
    </div>
    <!-- Footer -->
    <!-- Javascripts -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" type="text/javascript"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js" type="text/javascript"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js" type="text/javascript"></script>
    <script src="assets/javascripts/application-985b892b.js" type="text/javascript"></script>

    <!-- datatables JS -->

    <script type="text/javascript" src="assets/datatables/datatables.min.js"></script>
    <script type="text/javascript" src="assets/js/contactos_api.js"></script>




    <!-- MultipleSelect -->
    <script src="https://unpkg.com/multiple-select@1.5.2/dist/multiple-select.min.js"></script>



    <!-- Google Analytics -->
    <script>
    var _gaq = [
        ['_setAccount', 'UA-XXXXX-X'],
        ['_trackPageview']
    ];
    (function(d, t) {
        var g = d.createElement(t),
            s = d.getElementsByTagName(t)[0];
        g.src = ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g, s)
    }(document, 'script'));
    </script>
</body>

</html>