var modelos = []
modelos.push(new modelo("2993647","p15","calibre 5,5","98767654","ArmeriaValdes@GAMAIL.COM", 
                                            "RANCAGUA", "MASCULINO", "98767654"))
modelos.push(new modelo("7736455", "m22", "calibre 4,5", "879695943", 
                                            "ArmeriaValdes@GMAIL.COM","GRANEROS", "FEMENINO", "879695943"))

function listarmodelos(){
    var filas = "";
    for (let i = 0; i < modelos.length; i++) {
        var e = modelos[i];
        filas = filas + "<tr>";
            filas = filas + "<td>"+e.id.toUpperCase()+"</td>";
            filas = filas + "<td>"+e.nombre.toUpperCase()+"</td>";
            filas = filas + "<td>"+e.descripcion.toUpperCase()+"</td>";
            filas = filas + "<td>"+e.telefono.toUpperCase()+"</td>";
            filas = filas + "<td>"+e.contacto.toUpperCase()+"</td>";
            filas = filas + "<td>"+e.comuna.toUpperCase()+"</td>";
            filas = filas + "<td>"+e.sexo.toUpperCase()+"</td>";
            filas = filas + "<td>*************</td>";
        filas = filas + "</tr>";
    }
    document.getElementById("tabladedatos").innerHTML = filas;
}

document.addEventListener("DOMContentLoaded", function(){ listarmodelos() });

function limpiarCampos(x){
    if(x===1){
        document.getElementById("txtrut").value = "";
    }
    document.getElementById("txtnom").value = "";
    document.getElementById("txtape").value = "";
    document.getElementById("txttel").value = "";
    document.getElementById("cbocom").value = "";
    document.getElementById("opsexm").checked = true;
    document.getElementById("txtpas").value = "";
    document.getElementById("txtrep").value = "";
}

function consultar(){
    var id = document.getElementById("txtrut").value;
    if(id.trim().length<11 || id.trim().length>12){
        alert("Debe digitar un id para buscar!");
        document.getElementById("txtrut").value = "";
        document.getElementById("txtrut").focus();
    }else{
        let sw = 0;
        for (let i = 0; i < modelos.length; i++) {
            var e = modelos[i];
            if(id === e.id){
                sw = 1;
                document.getElementById("txtnom").value = e.nombre;
                document.getElementById("txtape").value = e.apellido;
                document.getElementById("txttel").value = e.telefono;
                document.getElementById("txtema").value = e.email;
                document.getElementById("cbocom").value = e.comuna;
                if(e.sexo === "MASCULINO"){
                    document.getElementById("opsexm").checked = true;
                }else{
                    document.getElementById("opsexf").checked = true;
                }
                document.getElementById("txtpas").value = e.password;
                document.getElementById("txtrep").value = e.password;
            }   
        }
        var msg = "";
        if(sw === 0){
            msg = msg + "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
            msg = msg + "<strong>Estudiante no encontrado!</strong>"
            msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            msg = msg + "</div>"
        }else if(sw === 1){
            msg = msg + "<div class='alert alert-success alert-dismissible fade show' role='alert'>"
            msg = msg + "<strong>Estudiante encontrado!</strong>"
            msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            msg = msg + "</div>"
        }
        document.getElementById("mensajes").innerHTML = msg;
    }
}

function registrar(){
    var id = document.getElementById("txtrut").value.toUpperCase();
    var nom = document.getElementById("txtnom").value.toUpperCase();
    var des = document.getElementById("txtape").value.toUpperCase();
    var tel = document.getElementById("txttel").value.toUpperCase();
    var con = document.getElementById("txtema").value.toUpperCase();
    var com = document.getElementById("cbocom").value.toUpperCase();

    var sex = "";
    if(document.getElementById("opsexm").checked === true){
        sex = "MASCULINO";
    }else{
        sex = "FEMENINO";
    }

    var pas1 = document.getElementById("txtpas").value.toUpperCase();
    var pas2 = document.getElementById("txtrep").value.toUpperCase();

    var errores = "";
    if(id.trim().length<11 || id.trim().length>12){
        errores = errores + "El id debe contener entre 11 y 12 caracteres! \n";
    }else{
        for (let i = 0; i < modelos.length; i++) {
            var e = modelos[i];
            if(id === e.id){
                errores = errores + "El id ya se encuentra registrado!\n";
                break;
            }
        }
    }

    if(nom.trim().length<5 || nom.trim().length>30){
        errores = errores + "El nombre debe contener entre 5 y 30 caracteres! \n";
    }

    if(des.trim().length<5 || des.trim().length>30){
        errores = errores + "La descripcion debe contener entre 5 y 30 caracteres! \n";
    }

    if(tel.trim().length !== 11){
        errores = errores + "El telefono debe contener 11 digitos!";
    }

    if(con.trim().length === 0){
        errores = errores + "Debe ingresar el contacto \n";
    }else if(!con.endsWith("@GMAIL.COM")){
        errores = errores + "El contacto debe ser de GMAIL.COM";
    }

    if(com.trim().length === 0){
        errores = errores + "Debe ingresar la comuna! \n";
    }

    if(pas1.trim().length === 0){
        errores = errores + "Debe ingresar el numero de contacto1! \n";
    }else if(pas1.trim().length<8 || pas1.trim.length>20){
        errores = errores + "el numero de contacto debe contener entre 8 y 20 caracteres! \n";
    }

    if(pas2.trim().length === 0){
        errores = errores + "Debe ingresar el numero de contacto2! \n";
    }else if(pas2.trim().length<8 || pas2.trim.length>20){
        errores = errores + "el numero de contacto debe contener entre 8 y 20 caracteres! \n";
    }

    if(pas1 !== pas2){
        errores = errores + "las contraseñas no coinciden \n";
    }

    if(errores !== ""){
        alert(errores)
    }else{
        var e = newmodelos(id, nom, des, tel, con, com, sex, pas1);
        modelos.push(e);

        var msg = "";
        msg = msg + "<div class='alert alert-success alert-dismissible fade show' role='alert'>"
        msg = msg + "<strong>Estudiante registrado correctamente!</strong>"
        msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
        msg = msg + "</div>"
        document.getElementById("mensajes").innerHTML = msg;
        listarmodelos();
        limpiarCampos();
    }
}

function modificar(){
    var id = document.getElementById("txtrut").value.toUpperCase();
    var nom = document.getElementById("txtnom").value.toUpperCase();
    var des = document.getElementById("txtape").value.toUpperCase();
    var tel = document.getElementById("txttel").value.toUpperCase();
    var con = document.getElementById("txtema").value.toUpperCase();
    var com = document.getElementById("cbocom").value.toUpperCase();

    var sex = "";
    if(document.getElementById("opsexm").checked === true){
        sex = "MASCULINO";
    }else{
        sex = "FEMENINO";
    }

    var pas1 = document.getElementById("txtpas").value.toUpperCase();
    var pas2 = document.getElementById("txtrep").value.toUpperCase();

    var errores = "";
    if(id.trim().length<11 || id.trim().length>12){
        errores = errores + "El rut debe contener entre 11 y 12 caracteres! \n";
    }else{
        let x = 0;
        for (let i = 0; i < modelos.length; i++) {
            var e = modelos[i];
            if(id === e.id){
                x = 1;
                break;
            }
        }
        if(x === 0){
            errores = errores + "El rut no se encuentra registrado!\n";
        }
    }

    if(nom.trim().length<5 || nom.trim().length>30){
        errores = errores + "El nombre debe contener entre 5 y 30 caracteres! \n";
    }

    if(des.trim().length<5 || des.trim().length>30){
        errores = errores + "El apellido debe contener entre 5 y 30 caracteres! \n";
    }

    if(tel.trim().length !== 11){
        errores = errores + "El telefono debe contener 11 digitos!";
    }

    if(con.trim().length === 0){
        errores = errores + "Debe ingresar el email! \n";
    }else if(!con.endsWith("@GMAIL.COM")){
        errores = errores + "El email debe ser de GMAIL.COM";
    }

    if(com.trim().length === 0){
        errores = errores + "Debe ingresar la comuna! \n";
    }

    if(pas1.trim().length === 0){
        errores = errores + "Debe ingresar el password1! \n";
    }else if(pas1.trim().length<8 || pas1.trim.length>20){
        errores = errores + "el password debe contener entre 8 y 20 caracteres! \n";
    }

    if(pas2.trim().length === 0){
        errores = errores + "Debe ingresar el password2! \n";
    }else if(pas2.trim().length<8 || pas2.trim.length>20){
        errores = errores + "el password debe contener entre 8 y 20 caracteres! \n";
    }

    if(pas1 !== pas2){
        errores = errores + "las contraseñas no coinciden \n";
    }

    if(errores !== ""){
        alert(errores)
    }else{
        var sw = 0;
        for (let i = 0; i < modelos.length; i++) {
            var e = modelos[i];
            if(id === e.id){
                var x = confirm("Desea modificar el registro?");
                if(x === true){
                    sw=1;
                    modelos[i].nombre = nom;
                    modelos[i].descripcion = des;
                    modelos[i].telefono = tel;
                    modelos[i].contacto = con;
                    modelos[i].comuna = com;
                    modelos[i].sexo = sex;
                    modelos[i].numero_de_contacto = pas1;
                    break;
                }else{
                    sw = 2;
                }
            }
        }

        var msg = "";
        if(sw === 0){
            msg = msg + "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
            msg = msg + "<strong>Estudiante no encontrado!</strong>"
            msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            msg = msg + "</div>"
        }else if(sw === 1){
            msg = msg + "<div class='alert alert-success alert-dismissible fade show' role='alert'>"
            msg = msg + "<strong>Estudiante modificado correctamente!</strong>"
            msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            msg = msg + "</div>"
        }else if(sw === 2){
            msg = msg + "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
            msg = msg + "<strong>El Estudiante no fue modificado!</strong>"
            msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            msg = msg + "</div>"
        }
        document.getElementById("mensajes").innerHTML = msg;
        listarmodelos();
        limpiarCampos();
    }
}

function eliminar(){
    var id = document.getElementById("txtrut").value.toUpperCase();

    var errores = "";
    if(id.trim().length<11 || rut.trim().length>12){
        errores = errores + "El rut debe contener entre 11 y 12 caracteres! \n";
    }else{
        let x = 0;
        for (let i = 0; i < modelos.length; i++) {
            var e = modelos[i];
            if(id === e.id){
                x = 1;
                break;
            }
        }
        if(x === 0){
            errores = errores + "El rut no se encuentra registrado!\n";
        }
    }

    
    if(errores !== ""){
        alert(errores)
    }else{
        var sw = 0;
        for (let i = 0; i < modelos.length; i++) {
            var e = modelos[i];
            if(id === e.id){
                var x = confirm("Desea eliminar el registro?");
                if(x === true){
                    sw=1;
                    modelos.splice(i, 1)
                    break;
                }else{
                    sw = 2;
                }
            }
        }

        var msg = "";
        if(sw === 0){
            msg = msg + "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
            msg = msg + "<strong>Estudiante no encontrado!</strong>"
            msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            msg = msg + "</div>"
        }else if(sw === 1){
            msg = msg + "<div class='alert alert-success alert-dismissible fade show' role='alert'>"
            msg = msg + "<strong>Estudiante eliminado correctamente!</strong>"
            msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            msg = msg + "</div>"
        }else if(sw === 2){
            msg = msg + "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"
            msg = msg + "<strong>El Estudiante no fue eliminado!</strong>"
            msg = msg + "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>"
            msg = msg + "</div>"
        }
        document.getElementById("mensajes").innerHTML = msg;
        listarmodelos();
        limpiarCampos();
    }
}

var alerta = document.getElementById("alerta");
var mensaje = document.getElementById("mensaje");


function isNumber(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode === 75) return false;
  return true;
}


function checkid(id) {
  
  var valor = clean(id.value);

  
  cuerpo = valor.slice(0, -1);
  dv = valor.slice(-1).toUpperCase();

 
  id.value = format(id.value);

  
  suma = 0;
  multiplo = 2;

 
  for (i = 1; i <= cuerpo.length; i++) {
   
    index = multiplo * valor.charAt(cuerpo.length - i);

 
    suma = suma + index;

   
    if (multiplo < 7) {
      multiplo = multiplo + 1;
    } else {
      multiplo = 2;
    }
  }

  
  dvEsperado = 11 - (suma % 11);

 
  dv = dv == "K" ? 10 : dv;
  dv = dv == 0 ? 11 : dv;

}


function format (id) {
  id = clean(id)

  var result = id.slice(-4, -1) + '-' + id.substr(id.length - 1)
  for (var i = 4; i < id.length; i += 3) {
    result = id.slice(-3 - i, -i) + '.' + result
  }

  return result
}


function clean (id) {
  return typeof id === 'string'
    ? id.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
}
