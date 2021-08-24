<?php
    include 'bd/conn.php';
    if($_POST){

        $email = $_POST['email']; 
        $password = $_POST['password'];

      
			
    // Connection variables
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    // recivo los datos de login.php
    $email = $_POST['email']; 
    $password = $_POST['password'];

 
    
    // consulto en mi base de datos si existe ese usuario
    $result = mysqli_query($conn, "SELECT correo, contrasena, usuario, tipo_usuario, estado FROM usuarios_api WHERE correo = '$email'");
    
    // guardo mi consultay
    $row = mysqli_fetch_assoc($result);
    
    // contrasena y tipo de usuario
    $hash = $row['contrasena'];
    $tipo_usuario = $row['tipo_usuario'];


    $estado = $row['estado'];


if((strcmp($estado, 'desactivada') == 0)){
    echo "<div class='alert alert-danger mt-4' role='alert'>Tu cuenta se encuentra desactivada. Ingresa a tu correo para activarla.
    <p><a href='login.php'><strong>Debes ingresar a tu correo para activar tu cuenta.</strong></a></p></div>";
    echo "<script>
    Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
    </script>";
 
}else{


    // ______________________
    if (password_verify($_POST['password'], $hash)) {	


        session_start();
        $_SESSION['loggedin'] = true;
        $_SESSION['name'] = $row['usuario'];
        $_SESSION['start'] = time();
        $_SESSION['tipo_usuario'] = $tipo_usuario;
        $_SESSION['correo'] = $email;
        $_SESSION['expire'] = $_SESSION['start'] + (30 * 60) ;			

        $nombre_usuario = $row["usuario"];

                switch ($tipo_usuario) {
                case "administrador":
                    header('location: dashboard.html');
                    break;
                case "doctor":
                
                    header('location: m_doctor.php');
                    break;
                case "paciente":

                    header('location: m_paciente.php');

                    break;
                }  
    } else {
        echo "<div class='alert alert-danger mt-4' role='alert'>El correo o la contrasena son incorrectos!
        <p><a href='login.php'><strong>Por favor intentelo de nuevo!</strong></a></p></div>";	
        echo "<script>
    Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
    </script>";		
    }	
    
    // ______________________


}

}


		
      ?>

<!DOCTYPE html>
<html class='no-js' lang='en'>

<head>
    <meta charset='utf-8'>
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible'>
    <title>Acceder</title>
    <meta content='lab2023' name='author'>
    <meta content='' name='description'>
    <meta content='' name='keywords'>
    <link href="assets/stylesheets/application-a07755f5.css" rel="stylesheet" type="text/css" />
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/images/favicon.ico" rel="icon" type="image/ico" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.0/dist/chart.min.js" integrity="sha256-yz7K02nILYEeRDwEfzu/1zI9SpBKod/nLYMTFh7vszs=" crossorigin="anonymous"></script>


</head>

<body class='login'>
    <div class='wrapper' style="background-color: 00254E;">
        <div class='row'>
            <div class='col-lg-12'>
                <div class='brand text-center'>
                    <h2 style="font-size: 40px;">
                        <div class=''>
                            <img src='assets/images/logo.PNG' width="200px" alt='logo' />
                        </div>
                    </h2>

                </div>
            </div>
        </div>
        <div class='row'>
        <div class='col-lg-12'>
        <form action="" method="post">
            <fieldset class='text-center'>
              <legend>Acceda a su cuenta</legend>
              
              <div class='form-group'>
                <input class='form-control' placeholder='Correo electrónico' name="email" type='text'>
              </div>
              <div class='form-group'>
                <input class='form-control' placeholder='Contraseña' name="password" type='password'>
              </div>
              
              <div class='text-center'>
                <div class='checkbox'>
                  <label>
                    <input type='checkbox'>
                    Recuérdame en este ordenador
                  </label>
                </div>
                <div class="form-button">
                      <button class="button button-block button-primary button-nina"type="submit">Ingresar</button>
                </div>
                <br>
                <a href="forgot_password.html">¿Ha olvidado su contraseña?</a>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <!-- Javascripts -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js" type="text/javascript"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js" type="text/javascript"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js" type="text/javascript"></script>
    <script src="assets/javascripts/application-985b892b.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.0/chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.0/chart.esm.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.0/helpers.esm.min.js"></script>
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