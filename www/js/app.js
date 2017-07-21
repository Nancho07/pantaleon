/*****************************************/
/*           Elaborado por:              */
/*           Hernan Guevara              */
/*            IMIX DIGITAL               */
/*****************************************/
    function comentarios(value){
		var id = value.substring(12);
		document.getElementById("coment-content").innerHTML=parseInt(id);	
		if(id!=0){
			document.location.href = "#dialog"; 
		}		  
	}
    function toPies() {
        var toPies1 = 0;
            toPies1 = $("#alturaMetros").val() * 3.2808;
        $("#alturaPies").val(toPies1.toFixed(2));
        imc();
    }
    function toMetros() {
        var toPies1 = $("#alturaPies").val() / 3.2808;
        $("#alturaMetros").val(toPies1.toFixed(2));
        imc();
    }
    function toLibras() {
        var toLibra1 = $("#pesoKilo").val() * 2.2046;
        $("#pesoLibras").val(toLibra1.toFixed(2));
        imc();
    }
    function toKilo() {
        var toKilo1 = $("#pesoLibras").val() / 2.2046;
        $("#pesoKilo").val(toKilo1.toFixed(2));
        imc();
    }
    function imc(){            
        if($("#alturaMetros").val()!==0 && $("#pesoKilo").val()!==0){ 
            var metros = $("#alturaMetros").val();
            var metrosc= metros*metros;
            var peso_kilo=$("#pesoKilo").val();
            var imc1=(peso_kilo/metrosc);
            var imcf=imc1.toFixed(2);
            var vresp="";
            if(imcf>18 && imcf<24.9){
                vresp = " ¡felicidades!, usted esta en peso ideal";
            }else if(imcf>25 && imcf<26.9){
                vresp = " Lo siento, usted esta en sobre peso";
            }else if(imcf>27 && imcf<29.9){
                vresp = " ¡Fatal!, usted esta en estado de obesidad grado I. Riesgo relativo alto para desarrollar enfermedades cardiovasculares";
            }else if(imcf>30 && imcf<39.9){
                vresp = " ¡Fatal!, usted esta en estado de obesidad grado II. Riesgo relativo muy alto para el desarrollo de enfermedades cardiovasculares";
            }else if(imcf>40){
                vresp = " ¡Fatal!, usted esta en estado de obesidad grado III Extrema o Mórbida. Riesgo relativo extremadamente alto para el desarrollo de enfermedades cardiovasculares";
            }
            $("#observacionesEstadoFisico").text("Indice de masa corporal es: "+imcf+vresp);
        }
    }
    function gruposangre(e) {
        $("#lgs").text(e);
    }
    function factorh(e) {
        $("#lrh").text(e);
    }
    function pielColor(e) {
        $("#lpiel").text(e);
    }
    function contexturas(e) {
        $("#lcontextura").text(e);
    }
    function colorPelo(e) {
        $("#lpelo").text(e);
    }
    function colorOjos(e) {
        $("#lojos").text(e);
    }
    function actualizarContactos(){
        $("#solicit_fecha").click();
    }
    function sendMessage(value){
    	var message = {};
        var id_nota = value;
        var comentario = $('#comentario_'+value).val();
        if(comentario!=""){
			message.id_nota=id_nota;
        	message.comentario=comentario;
        	message.fecha=new Date();
        	datos_usuario.message=message;
        	socket.emit('sendMessage',datos_usuario);
        	$('#comentario_'+value).val("");		
		}else{
			alertas.contenido="No hay mensaje";
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
		}
        
    }
    function desplegar_message(){
    	//console.log("Hernan E. Guevara");
        if ($('#coment-todos-all').hasClass('collapsed')) {
            $(".hangout").removeClass('hangout mdi-chevron-up').addClass('hangout mdi-chevron-down');
            $('#coment-todos-all').removeClass('panel-footing collapsed col-xs-12').addClass('panel-footing col-xs-12');

        } else {
            $(".hangout").removeClass('hangout mdi-chevron-down').addClass('hangout mdi-chevron-up');
            $('#coment-todos-all').removeClass('panel-footing col-xs-12').addClass('panel-footing collapsed col-xs-12');
            //$('.hangout').toggleClass('open');
        }
	}
    $( document ).ready(function() {
		var myHeight = window.innerHeight; 
		var xh = $(".encabezado").height();
		var xr = $(".nav-tabs").height();
		var valto = myHeight-xr-xh-60;
	    $(".tab-content").height(valto);
	    $('.tab-content').css('overflowY', 'auto');
	});
    
document.addEventListener('deviceready', function () {    
}, false);

function onAppReady() {  
    idDevice = device.uuid;
    datos_usuario.uuid=device.uuid;
    db = window.sqlitePlugin.openDatabase({
      name: 'imix.db',
      location: 'default',
      androidDatabaseImplementation: 2,
      androidLockWorkaround: 1
    }, onSucces, onError);
    function desplegar(){
        $('#accordion .panel-collapse').collapse("toggle");
        var datos = {};
        datos.socketId=datos_usuario.socketId;
        datos.uuid=idDevice;
        datos.url     = "";
        datos.usuario = datos_usuario.usuario;
        datos.seccion = "Nota del Día";
        datos.prefijo = "imix";
        socket.emit('notaDia',datos);
        datos.urlCatego     = "";
        socket.emit('getCatego',datos);
    }
    function corregirDiaMes(fecha){
        fecha=fecha.toString();
        if(fecha.length==1){
            var nuevoValor="0"+fecha;
            return nuevoValor;
        }else{
            return fecha;
        }        
    }
    function fecha_hoy(){
        var f = new Date();
        var mes = corregirDiaMes(f.getMonth() +1);
        var dia = corregirDiaMes(f.getDate());
        var hoy = f.getFullYear()+ "-" + mes + "-" +dia;
        return hoy;
    }
    function fecha_hoy_presentacion(){
        var f = new Date();
        var mes = corregirDiaMes(f.getMonth() +1);
        var dia = corregirDiaMes(f.getDate());
        var hoy = f.getFullYear()+ "/" + mes + "/" +dia;
        return hoy;
    }
    fecha_hoyc = fecha_hoy();
    fecha_de_hoy = fecha_hoy();
    //var miHora = setInterval(function(){ getHora(); }, 1000);
    function getHora(){ 
        var f=new Date();
            cad=f.toLocaleTimeString();
            document.getElementById("horahoy").innerHTML=cad;
    }    
    function hora_actual(){ 
        var f=new Date();
            cad=f.toLocaleTimeString();
            return cad;
    }
    function convertDate(d) {
        var date = new Date(d);
        var day = ""+date.getDate();
        if( day.length == 1)day = "0"+day;
        var month = "" +( date.getMonth() + 1);
        if( month.length == 1)month = "0"+month;
        var year = "" + date.getFullYear();
        
        //alert  (day + "/" + month + "/" + year);
        return date;        
    }
    
    function logs(){
        var usuario = document.getElementById("nameUsuario").value;
        db.transaction(function(tx) {
           var hoy = fecha_hoyc;
           tx.executeSql('INSERT INTO logs(descripcion,fecha,hora,usuario) VALUES (?,?,?,?)', [texto,hoy,hora_actual(),usuario],
            function (){
                tx.executeSql("SELECT * FROM logs order by log_id desc",[],function(tx, data) {
                    total_logs = data.rows.length;
                    var Log = "";
                    if(total_logs !== 0 ){
                    for(var i = 0; i < data.rows.length; i++){
                    Log += "<div class='logs col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+
                                "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+
                                    "<div class='derecha col-xs-4 col-sm-4 col-md-4 col-lg-4'>" + data.rows.item(i).fecha+"</div>"+
                                    "<div class='derecha col-xs-4 col-sm-4 col-md-4 col-lg-4'>" + data.rows.item(i).hora +"</div>"+
                                    "<div class='izquierda col-xs-4 col-sm-4 col-md-4 col-lg-4'>" + data.rows.item(i).usuario+"</div>"+
                                "</div>"+
                                "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+
                                    "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+ data.rows.item(i).descripcion +"</div>"+
                               "</div>"+
                           "</div>";
                    }                   
                    document.getElementById("Logs").innerHTML=Log;
                    document.getElementById("msjInicio").innerHTML = "Mens: Log database OK";
                    }
                }, function(error) {
                   alertas.contenido='ERROR transaction tabla logs : ' + error.message;
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);

                });
           },
            function(error){
                alertas.contenido='Insert database logs ERROR: ' + JSON.stringify(err);
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
           }); 
        });
    }
    function actualizarLogs(){
        db.transaction(function(tx) {
           tx.executeSql("SELECT * FROM logs order by CONCAT(DATE(fecha),hora) desc",[],function(tx, data) {
                total_logs = data.rows.length;
                var Log = "<table class='contenido_mensaje'>";
                if(total_logs !== 0 ){
                    for(var i = 0; i < data.rows.length; i++){
                        Log += "<tr><td class='fecha_mensaje'>" + data.rows.item(i).fecha+"</td>"+
                                   "<td class='fecha_mensaje'>" + data.rows.item(i).hora +"</td>"+
                                   "<td class='mensaje_mensaje'>" + data.rows.item(i).descripcion +"</td>"+
                                   "<td class='usuario_mensaje'>" + data.rows.item(i).usuario +"</td>"+
                                   "<td class='usuario_mensaje'>" + data.rows.item(i).transferido +"</td>"+
                               "</tr>";
                    }
                    Log += "</table>";                    
                    document.getElementById("Logs").innerHTML=Log;
                    document.getElementById("msjInicio").innerHTML = "Mens: Log database OK";
                }
            }, function(error) {
                alertas.contenido='ERROR transaction tabla logs : ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
            });
        });
    }
    function actualizarNotificaciones(){
        db.transaction(function(tx) {
           tx.executeSql("SELECT * FROM notificaciones order by notificaciones_k desc",[],function(tx, data) {
                total_noti = data.rows.length;
                var not = "";
                if(total_noti !== 0 ){
                    for(var i = 0; i < data.rows.length; i++){
                        not += "<div class='logs reg col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+
                            "<div class='reg col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+
                                "<div class='titulo_mensaje reg col-xs-4 col-sm-4 col-md-4 col-lg-4'>" + data.rows.item(i).titulo+"</div>"+
                                "<div class='izquierda col-xs-4 col-sm-4 col-md-4 col-lg-4'>" + data.rows.item(i).fecha_creacion +"</div>"+
                                "<div class='izquierda col-xs-4 col-sm-4 col-md-4 col-lg-4'>" +data.rows.item(i).hora_creacion+"</div>"+
                            "</div>"+
                            "<div class='reg col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+
                                "<div class='reg col-xs-12 col-sm-12 col-md-12 col-lg-12'>"+ data.rows.item(i).mensaje +"</div>"+
                           "</div>"+
                       "</div>";
                    }                   
                    document.getElementById("Notificaciones").innerHTML=not;
                    document.getElementById("msjInicio").innerHTML = "Mens: Notificaciones database OK";
                }else{
                    document.getElementById("msjInicio").innerHTML = "Mens: No hay registros en notificaciones";
                }
            }, function(error) {
               alertas.contenido='ERROR transacción tabla notificaciones : ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
            });
        });
    }
    
    function setName(){
        var usuario = document.getElementById("nameUsuario").value;
        if(conectado != "No hay coneccion" && conectado!==undefined){
            socket.emit('identify', datos_usuario);            
        }
    }  
   
    function cargarDatosConyugue(){
        var idUsuario = document.getElementById("id").value;
        var identificacionUsuario = document.getElementById("identificacionUsuario").value;
        var usuario = document.getElementById("nameUsuario").value;

        if(identificacionUsuario!==""){
            db.transaction(function(tx) {
                    tx.executeSql("SELECT * FROM conyugues where identificacion_usuario = ?",[identificacionUsuario], function(tx, data) {
                        var total_conyugue=data.rows.length;
                        //alert(total_conyugue);
                        if(total_conyugue!==0){
                            for(var i=0; i < data.rows.length; i++){                     
                                document.getElementById("idConyugue").value=data.rows.item(i).con_k;
                                datos_conyugue.perfil_k=data.rows.item(i).con_k;
                                document.getElementById("nombreConyugue").value=data.rows.item(i).nombre;
                                //$("#nombreUsuario").val(data.rows.item(i).nombre);
                                datos_conyugue.nombre=data.rows.item(i).nombre;
                                document.getElementById("apellidoConyugue").value=data.rows.item(i).apellido;
                                datos_conyugue.apellido=data.rows.item(i).apellido;
                                document.getElementById("fechanacimientoConyugue").value=data.rows.item(i).nacimiento;
                                datos_conyugue.nacimiento=data.rows.item(i).nacimiento;
                                document.getElementById("identificacionConyugue").value=data.rows.item(i).identificacion;
                                datos_conyugue.identificacion=data.rows.item(i).identificacion;
                                document.getElementById("emailConyugue").value=data.rows.item(i).email;
                                datos_conyugue.email=data.rows.item(i).email;
                                document.getElementById("telefonoConyugue").value=data.rows.item(i).telefono;
                                datos_conyugue.telefono=data.rows.item(i).telefono;
                                document.getElementById("generoConyugue").value=data.rows.item(i).genero;
                                datos_conyugue.genero=data.rows.item(i).genero;
                                document.getElementById("nacionalidadConyugue").value=data.rows.item(i).nacionalidad;
                                datos_conyugue.nacionalidad=data.rows.item(i).nacionalidad;
                                document.getElementById("estadofisicoConyugue").value=data.rows.item(i).estado_fisico;
                                datos_conyugue.estado_fisico=data.rows.item(i).estado_fisico;
                                document.getElementById("paisConyugue").value=data.rows.item(i).pais;
                                datos_conyugue.pais=data.rows.item(i).pais;
                                document.getElementById("estadoConyugue").value=data.rows.item(i).estado;
                                datos_conyugue.estado=data.rows.item(i).estado;
                                document.getElementById("municipioConyugue").value=data.rows.item(i).municipio;
                                datos_conyugue.municipio=data.rows.item(i).municipio;
                                document.getElementById("direccionConyugue").value=data.rows.item(i).direccion;
                                datos_conyugue.direccion=data.rows.item(i).direccion;
                                document.getElementById("observacionesConyugue").value=data.rows.item(i).observaciones;
                                datos_conyugue.observaciones=data.rows.item(i).observaciones;
                                //document.getElementById("nombreimagenConyugue").value=data.rows.item(i).dir_foto;
                                //datos_conyugue.dir_foto=data.rows.item(i).dir_foto;
                                datos_conyugue.transferido=data.rows.item(i).transferido;
                                datos_conyugue.web="NO";                                 
                                /*alert(datos_conyugue.nombre+","+datos_conyugue.apellido+","+datos_conyugue.nacimiento+","+datos_conyugue.identificacion+"," + datos_conyugue.email+"," +datos_conyugue.telefono+","+datos_conyugue.fecha_creacion+"," +datos_conyugue.fecha_modificacion+"," +datos_conyugue.genero+"," +datos_conyugue.nacionalidad+"," +datos_conyugue.estado_fisico+","+datos_conyugue.pais+"," +datos_conyugue.estado+"," +datos_conyugue.municipio+"," +datos_conyugue.direccion+"," +datos_conyugue.observaciones+"," +datos_conyugue.dir_foto)*/
                            }  
                            return false;
                        }else{
                            document.getElementById("msjConyugue").innerHTML = "Mens: No hay registros para este usuario";
                        }
                    /*************************** Lista de participantes *************************/
                },function(err) {
                    alertas.contenido='ERROR abriendo db conyugues: ' + JSON.stringify(err);
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    texto="<span class='imixio' style='color:#ff0000'>ERROR abriendo db conyugues, usuario: "+usuario +", "+ JSON.stringify(err)+"</span>";
                });
            }, function(error) {
                alertas.contenido='transaction conyugues error: ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
                texto="<span class='imixio' style='color:#ff0000'>transaction conyugues error, usuario: "+usuario +", " +JSON.stringify(error)+"</span>";
            }, function() {
              document.getElementById("msjConyugue").innerHTML = "Mens: transacción ok";
            });
        }else{
            document.getElementById("msjConyugue").innerHTML = "Mens: Usuario no tiene identificacion";
            texto="<span class='imixio' style='color:#ff0000'>Usuario no tiene identificacion, usuario: "+usuario+"</span>";
        }
        logs();
    }
    function cargarDatosEstadoFisico(){
        alertas.contenido="cargar datos de" + page + " - "+pageViene + " - "+$("#id").val() + " - "+$("#identificaciondUsuario").val();
        alertas.btnConfirma="No";
        alertas.funcionConfirma="";
        alertas.funcionCancela="";
        alerta(alertas);
    }
    function cargarUsuario(){
        if(document.getElementById("nameUsuario").value!=="" && document.getElementById("passwordUsuario").value !==""){
            var usuario   =   document.getElementById("nameUsuario").value;
            var clave     =   MD5(document.getElementById("passwordUsuario").value);
            db.transaction(function(tx) { 
                tx.executeSql("SELECT * FROM perfiles where usuario = ? and  clave = ?",[usuario,clave], function(tx, data) {
                    var total_usuario=data.rows.length;
                    var usuario_reg = "";
                    if(total_usuario!==0){
                        texto="";
                        for(var i=0; i < data.rows.length; i++){     
                            datos_usuario.perfil_k=data.rows.item(i).perfil_k;
                            datos_usuario.nombre=data.rows.item(i).nombre;
                            datos_usuario.apellido=data.rows.item(i).apellido;
                            datos_usuario.nacimiento=data.rows.item(i).nacimiento;
                            datos_usuario.identificacion=data.rows.item(i).identificacion;
                            datos_usuario.email=data.rows.item(i).email;
                            datos_usuario.telefono=data.rows.item(i).telefono;
                            datos_usuario.usuario=data.rows.item(i).usuario;
                            datos_usuario.clave=data.rows.item(i).clave;
                            datos_usuario.genero=data.rows.item(i).genero;
                            datos_usuario.nacionalidad=data.rows.item(i).nacionalidad;
                            datos_usuario.estado_civil=data.rows.item(i).estado_civil;
                            datos_usuario.conyugue=data.rows.item(i).conyugue;
                            datos_usuario.cargo=data.rows.item(i).cargo;
                            datos_usuario.estado_fisico=data.rows.item(i).estado_fisico;
                            datos_usuario.pais=data.rows.item(i).pais;
                            datos_usuario.estado=data.rows.item(i).estado;
                            datos_usuario.municipio=data.rows.item(i).municipio;
                            datos_usuario.direccion=data.rows.item(i).direccion;
                            datos_usuario.observaciones=data.rows.item(i).observaciones;
                            datos_usuario.dir_foto=data.rows.item(i).dir_foto;
                            datos_usuario.fecha_modificacion=data.rows.item(i).fecha_modificacion;
                            datos_usuario.fecha_creacion=data.rows.item(i).fecha_creacion;
                            datos_usuario.transferido=data.rows.item(i).transferido;
                            datos_usuario.web="NO";     
                            setName();
                            var x = document.getElementsByClassName("me_name");
                            var y = document.getElementsByClassName("me_names");
                                x[0].innerHTML = datos_usuario.usuario;
                                y[0].innerHTML = datos_usuario.usuario;
                                document.getElementById("username").value=datos_usuario.usuario;
                            texto="<span class='imixio' tyle='color:#387ef5'>Estableciendo conneccion, por: "+usuario+"</span>";
                        }   
                        document.location.href = "#menu";   
                        return false;
                    }else{
                        datos_usuario.usuario=usuario;
                        datos_usuario.clave = clave;
                        $.confirm({
                            title: 'Advertencia:',
                            content: 'El usuario no existe en este dispositivo ¿deseas buscar en el servidor?',
                            icon: 'fa fa-question-circle',
                            animation: 'scale',
                            closeAnimation: 'scale',
                            opacity: 0.5,
                            buttons:{
                                confirm:{
                                    text: 'Deacuerdo',
                                    btnClass: 'btn-warning',
                                    action: function(){
                                        socket.emit('validar_datos', datos_usuario);
                                    }
                                },
                                cancel: function(){
                                    $.alert('tu decidiste <strong>No</strong>');
                                }
                            }
                        });
                    }
                },function(err) {
                    alertas.contenido='ERROR abriendo db usuarios: ' + JSON.stringify(err);
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    texto="<span class='imixio' style='color:#ff0000'>ERROR abriendo db usuarios por: "+usuario+"</span>";
                });               
            }, function(error) {
              texto="<span class='imixio' style='color:#ff0000'>transacción cargar users error por: "+usuario+"</span>";
            });
        }else{
            alertas.contenido="Error en datos de ingreso";
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
            document.getElementById("msjUsuarioAcceso").innerHTML = "Mens: Faltan datos";
            texto="<span class='imixio' style='color:#ff8000'>Error en datos de ingreso por: "+usuario+"</span>";
        }
        logs();
    } /******por aqui 1 *****/
    function cargarUsuario2(){
        if(document.getElementById("nameUsuario").value!=="" && document.getElementById("passwordUsuario").value !==""){
            db.transaction(function(tx) {
                var usuario   =   document.getElementById("nameUsuario").value;
                var clave     =   MD5(document.getElementById("passwordUsuario").value); 
                tx.executeSql("SELECT * FROM perfiles where usuario = ? and  clave = ?",[usuario,clave], function(tx, data) {
                    var total_usuario=data.rows.length;
                    var usuario_reg = "";
                    if(total_usuario!==0){
                        texto="";
                        for(var i=0; i < data.rows.length; i++){
                            /*usuario_reg += '<a class="list-group-item allow-badge widget uib_w_113" data-uib="twitter%20bootstrap/list_item" data-ver="1">'+
                                                '<span class="badge"></span>'+
                                                '<h4 class="list-group-item-heading" id="nombreTec">'+data.rows.item(i).nombre+'</h4>'+
                                                '<p class="list-group-item-text" id="claveTec">'+data.rows.item(i).clave+'</p>'+
                                                '<p class="list-group-item-text" id="identificacionTec">'+data.rows.item(i).identificacion+'</p>'+
                                            '</a>';*/
                            /*document.getElementById("usuario_reg").innerHTML="";
                            document.getElementById("usuario_reg").innerHTML=usuario_reg;*/                            
                            document.getElementById("id").value=data.rows.item(i).perfil_k;
                            datos_usuario.perfil_k=data.rows.item(i).perfil_k;
                            document.getElementById("nombreUsuario").value=data.rows.item(i).nombre;
                            //$("#nombreUsuario").val(data.rows.item(i).nombre);
                            datos_usuario.nombre=data.rows.item(i).nombre;
                            document.getElementById("apellidoUsuario").value=data.rows.item(i).apellido;
                            datos_usuario.apellido=data.rows.item(i).apellido;
                            document.getElementById("fechanacimientoUsuario").value=data.rows.item(i).nacimiento;
                            datos_usuario.nacimiento=data.rows.item(i).nacimiento;
                            document.getElementById("identificacionUsuario").value=data.rows.item(i).identificacion;
                            datos_usuario.identificacion=data.rows.item(i).identificacion;
                            document.getElementById("emailUsuario").value=data.rows.item(i).email;
                            datos_usuario.email=data.rows.item(i).email;
                            document.getElementById("telefonoUsuario").value=data.rows.item(i).telefono;
                            datos_usuario.telefono=data.rows.item(i).telefono;
                            document.getElementById("usuarioNombre").value=data.rows.item(i).usuario;
                            datos_usuario.usuario=data.rows.item(i).usuario;
                            document.getElementById("usuarioClave").value=data.rows.item(i).clave;
                            datos_usuario.clave=data.rows.item(i).clave;
                            document.getElementById("confirmarUsuarioClave").value="";
                            document.getElementById("generoUsuario").value=data.rows.item(i).genero;
                            datos_usuario.genero=data.rows.item(i).genero;
                            document.getElementById("nacionalidadUsuario").value=data.rows.item(i).nacionalidad;
                            datos_usuario.nacionalidad=data.rows.item(i).nacionalidad;
                            document.getElementById("estadocivilUsuario").value=data.rows.item(i).estado_civil;
                            datos_usuario.estado_civil=data.rows.item(i).estado_civil;
                            //document.getElementById("conyugueUsuario").value=data.rows.item(i).conyugue;
                            datos_usuario.conyugue=data.rows.item(i).conyugue;
                            document.getElementById("cargoUsuario").value=data.rows.item(i).cargo;
                            datos_usuario.cargo=data.rows.item(i).cargo;
                            //document.getElementById("estadofisicoUsuario").value=data.rows.item(i).estado_fisico;
                            datos_usuario.estado_fisico=data.rows.item(i).estado_fisico;
                            document.getElementById("paisUsuario").value=data.rows.item(i).pais;
                            datos_usuario.pais=data.rows.item(i).pais;
                            document.getElementById("estadoUsuario").value=data.rows.item(i).estado;
                            datos_usuario.estado=data.rows.item(i).estado;
                            document.getElementById("municipioUsuario").value=data.rows.item(i).municipio;
                            datos_usuario.municipio=data.rows.item(i).municipio;
                            document.getElementById("direccionUsuario").value=data.rows.item(i).direccion;
                            datos_usuario.direccion=data.rows.item(i).direccion;
                            document.getElementById("observacionesUsuario").value=data.rows.item(i).observaciones;
                            datos_usuario.observaciones=data.rows.item(i).observaciones;
                            //document.getElementById("nombreimagenUsuario").value=data.rows.item(i).dir_foto;
                            //datos_usuario.dir_foto=data.rows.item(i).dir_foto;
                            datos_usuario.fecha_modificacion=data.rows.item(i).fecha_modificacion;
                            datos_usuario.fecha_creacion=data.rows.item(i).fecha_creacion;
                            datos_usuario.transferido=data.rows.item(i).transferido;
                            datos_usuario.web="NO";                            
                            $('#generoUsuario').selectmenu('refresh', true);
                            $('#estadocivilUsuario').selectmenu('refresh', true);
                            /*tx.executeSql("SELECT * FROM conyugues where identificacion_usuario = ?",[datos_usuario.identificacion], function(tx, data) {
                                var total_usuario=data.rows.length;
                                if(total_usuario!==0){
                                    for(var i=0; i < data.rows.length; i++){                         
                                        document.getElementById("conyugueUsuario").value=data.rows.item(i).nombre+" "+data.rows.item(i).apellido;
                                    }
                                }else{
                                    document.getElementById("conyugueUsuario").value="No existe registro";
                                    texto="<span class='imixio' style='color:#ff0000'>No existe registro de conyugue, por: "+usuario+"</span>";
                                }
                            });  */                           
                            texto="<span class='imixio' style='color:#387ef5'>Estableciendo conneccion, por: "+usuario+"</span>";
                        }                      
                        return false;
                    }else{
                        alertas.contenido="Usuario no encontrado";
                        alertas.btnConfirma="No";
                        alertas.funcionConfirma="";
                        alertas.funcionCancela="";
                        alerta(alertas);
                        document.getElementById("msjUsuario").innerHTML = "Mens: Usuario no encontrado";
                        texto="<span class='imixio' style='color:#ff0000'>Usuario no encontrado, nombre: "+usuario+"</span>";
                    }
                },function(err) {
                    alertas.contenido='ERROR abriendo db usuarios: ' + JSON.stringify(err);
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    texto="<span class='imixio' style='color:#ff0000'>ERROR abriendo db usuarios por: "+usuario+"</span>";
                });               
            }, function(error) {
                alertas.contenido='transaction upload2 users error: ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
              texto="<span class='imixio' style='color:#ff0000'>transacción cargar2 users error por: "+usuario+"</span>";
            });
        }else{
            alertas.contenido="Error en datos de ingreso";
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
            document.getElementById("msjUsuario").innerHTML = "Mens: Faltan datos";
            texto="<span class='imixio' style='color:#ff8000'>Error en datos de ingreso por: "+usuario+"</span>";
        }
        logs();
    } 
    function validarUsuario(){
        if(document.getElementById("nameUsuario").value!=="" && document.getElementById("passwordUsuario").value !==""){
            db.transaction(function(tx) {
                var usuario   =   document.getElementById("nameUsuario").value;
                var clave     =   MD5(document.getElementById("passwordUsuario").value);               
                
                tx.executeSql("SELECT * FROM perfiles where usuario = ? and  clave = ?",[usuario,clave], function(tx, data) {
                    var total_usuario=data.rows.length;
                    var usuario_reg = "";
                    if(total_usuario!==0){
                        for(var i=0; i < data.rows.length; i++){
                           texto="Ingreso de usuario: "+data.rows.item(i).usuario;
                        }  
                        document.location.href = "#menu";                        
                        return false;
                    }else{
                        alertas.contenido="Usuario no encontrado";
                        alertas.btnConfirma="No";
                        alertas.funcionConfirma="";
                        alertas.funcionCancela="";
                        alerta(alertas);
                        document.getElementById("msjUsuario").innerHTML = "Mens: Usuario no encontrado";
                        texto="<span class='imixio' style='color:#ff8000'> Usuario no encontrado, usuario: "+usuario+"</span>";
                    }
                },function(err) {
                    alertas.contenido='ERROR abriendo db usuarios: ' + JSON.stringify(err);
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    texto="<span class='imixio' style='color:#ff0000'> ERROR abriendo db usuarios: " + JSON.stringify(err)+"</span>";
                });               
            }, function(error) {
                alertas.contenido='transaction val users error: ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
              texto="<span class='imixio' style='color:#ff0000'> transacción validar users error: " + error.message + '</span>';
            });
        }else{
            document.getElementById("msjUsuario").innerHTML = "Mens: Faltan datos, usuario: "+usuario;
            texto="<span class='imixio' style='color:#ff8000'>Error en datos de ingreso por: "+usuario+"</span>";
        }
        logs();
    } 
    function onSucces(){
        document.getElementById("msjInicio").innerHTML = "Mens: Conección local establecida";
    }
    function onError(){
        document.getElementById("msjInicio").innerHTML = "Mens: No hay coneccion local";
    }
    function cargarNota(notaId){
        $("#notaConsulta").empty();
        datos_usuario.notaId=notaId;
        socket.emit("consultarNota",datos_usuario);
    }
    function cargarCatego(categoId,configCatego){
        $("#notaCategoria").empty();
        datos_usuario.categoId=categoId;
        socket.emit("noticiaCategoria",datos_usuario);
        
        document.location.href = "#listaNotasCategorias";
        $("#header-notaCategorias > .categoria").text(configCatego.nombre); 
        $("#header-notaCategorias").css("background-color",configCatego.catego_color);
        $("#header-notaCategorias > .categoria").css("color",configCatego.catego_text_color);
    }
    
    db.sqlBatch([
        'DROP TABLE IF EXISTS paises',
        'CREATE TABLE IF NOT EXISTS paises (codigo TEXT,id INTEGER PRIMARY KEY,pais TEXT)',
        [ 'INSERT INTO paises(codigo,id,pais) VALUES (?,?,?)', ['HN', 99, 'Honduras'] ],
        [ 'INSERT INTO paises(codigo,id,pais) VALUES (?,?,?)', ['GT', 179, 'Guatemala'] ],
        [ 'INSERT INTO paises(codigo,id,pais) VALUES (?,?,?)', ['NI', 246, 'Nicaragua'] ],
    ], function() {
        db.executeSql('SELECT * FROM paises', [], function (resultSet) {
            //console.log('Sample column value: ' + resultSet.rows.item(0).SampleColumn);
            var paises = "";
            for(var i=0; i < resultSet.rows.length; i++){
                paises += "<option value='"+resultSet.rows.item(i).pais+"'>" + resultSet.rows.item(i).pais +"</option>";
            }
            document.getElementById("paisUsuario").innerHTML="";
            document.getElementById("paisUsuario").innerHTML=paises;

            document.getElementById("nacionalidadUsuario").innerHTML="";
            document.getElementById("nacionalidadUsuario").innerHTML=paises;

            document.getElementById("nacionalidadParticipante").innerHTML="";
            document.getElementById("nacionalidadParticipante").innerHTML=paises;

            document.getElementById("nacionalidadConyugue").innerHTML="";
            document.getElementById("nacionalidadConyugue").innerHTML=paises;
        });
    }, function(error) {
        alertas.contenido='Paises error: ' + JSON.stringify(error);
        alertas.btnConfirma="No";
        alertas.funcionConfirma="";
        alertas.funcionCancela="";
        alerta(alertas);
    });
    db.sqlBatch([
            'DROP TABLE IF EXISTS departamentos',
            'CREATE TABLE IF NOT EXISTS departamentos(codigo INTEGER PRIMARY KEY,departamento TEXT)',
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['01','ATLANTIDA'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['02','COLON'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['03','COMAYAGUA'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['04','COPAN'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['05','CORTES'] ], 
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['06','CHOLUTECA'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['07','EL PARAISO'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['08','FRANCISCO MORAZAN'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['09','GRACIAS A DIOS'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['10','INTIBUCA'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['11','ISLAS DE LA BAHIA'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['12','LA PAZ'] ], 
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['13','LEMPIRA'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['14','OCOTEPEQUE'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['15','OLANCHO'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['16','SANTA BARBARA'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['17','VALLE'] ],
            [ 'INSERT INTO departamentos(codigo,departamento) VALUES (?,?)', ['18','YORO'] ],  
    ], function() {
            tx.executeSql("SELECT * FROM departamentos",[], function(data) {
                var total_departamentos=data.rows.length;
                var deptos = "";
                if(total_departamentos!==0){
                    for(var i=0; i < data.rows.length; i++){                     
                        deptos += "<option value='"+data.rows.item(i).codigo+"'>" + data.rows.item(i).departamento +"</option>";
                    }
                }
                /*document.getElementById("estadoUsuario").innerHTML="";
                document.getElementById("estadoUsuario").innerHTML=deptos;*/
                $("#estadoUsuario").empty();
                $("#estadoUsuario").append(deptos);
                
            },function(err) {
                alertas.contenido='ERROR abriendo db departamentos: ' + JSON.stringify(err);
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
                texto="<span class='imixio' style='color:#ff0000'>ERROR abriendo db departamentos, "+ JSON.stringify(err)+"</span>";
            });
        tx.executeSql("SELECT * FROM municipalidades",[], function(data) {
                var total_municipalidades=data.rows.length;
                var munis = "";
                if(total_municipalidades!==0){
                    for(var i=0; i < data.rows.length; i++){                     
                        munis += "<option value='"+data.rows.item(i).cod_mun+"'>" + data.rows.item(i).municipalidad +"</option>";
                    }
                }
                /*document.getElementById("estadoUsuario").innerHTML="";
                document.getElementById("estadoUsuario").innerHTML=deptos;*/
                $("#municipioUsuario").empty();
                $("#municipioUsuario").append(munis);
                
            },function(err) {
                alertas.contenido='ERROR abriendo db municipalidades: ' + JSON.stringify(err);
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
                texto="<span class='imixio' style='color:#ff0000'>ERROR abriendo db municipalidades, "+ JSON.stringify(err)+"</span>";
            });
    }, function(error) {
            alertas.contenido='Departamentos error: ' + JSON.stringify(error);
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
    });
    db.transaction(function(tx) { 
        tx.executeSql('CREATE TABLE IF NOT EXISTS logs ('+
                      'log_id INTEGER PRIMARY KEY AUTOINCREMENT,'+
                      'descripcion TEXT,'+
                      'fecha DATE,'+
                      'hora TIME,'+
                      'usuario CHAR (20),'+
                      'transferido BOOLEAN (1)     DEFAULT (0),'+
                      'borrado     BOOLEAN (1)     DEFAULT (0))');
        tx.executeSql('SELECT * FROM logs where borrado = ? and log_id=?', [0,1], function (tx,resultSet) {
            if(resultSet.rows.length===0){
                var hoy = fecha_hoyc;
               tx.executeSql('INSERT INTO logs(descripcion,fecha,hora) VALUES (?,?,?)', ['Creado por Imix Digital, Autor: Hernan Guevara',hoy,cad],null,null); 
            }
        }, function(error) {
            alertas.contenido='Transaction inicio logs ERROR: ' + error.message;
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        });
        texto="Inicio de sesión a: "+hora_actual()+" fecha: "+ fecha_de_hoy;
        logs();
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS notificaciones ('+
                      'notificaciones_k INTEGER PRIMARY KEY AUTOINCREMENT,'+
                      'notificacionid CHAR (50),'+
                      'titulo TEXT,'+
                      'mensaje TEXT,'+
                      'fecha_creacion DATE,'+
                      'hora_creacion TIME)');
        actualizarNotificaciones();
        
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS perfiles ('+
            'perfil_k          INTEGER         PRIMARY KEY AUTOINCREMENT,'+
            'nombre             CHAR (100)      NOT NULL,'+
            'apellido           CHAR (100)      NOT NULL,'+
            'nacimiento         DATE            NOT NULL,'+
            'clave              TEXT (64)       NOT NULL,'+
            'usuario            CHAR (50),'+
            'telefono           INTEGER (12),'+
            'email              CHAR (70),'+
            'latitud            NUMERIC (3, 12),'+
            'longitud           NUMERIC (3, 12),'+
            'genero             CHAR (20),'+
            'identificacion     CHAR (20)       UNIQUE,'+
            'nacionalidad       CHAR (30),'+
            'estado_civil       CHAR (1),'+
            'conyugue           CHAR (20),'+
            'cargo              CHAR (50),'+
            'estado_fisico      CHAR (30),'+
            'pais               CHAR (30),'+
            'estado             CHAR (30),'+
            'municipio          CHAR (30),'+
            'direccion          TEXT,'+
            'observaciones      TEXT,'+
            'transferido        INT (1)     DEFAULT (0),'+
            'fecha_creacion     DATE,'+
            'fecha_modificacion DATE,'+
            'id_municipal       CHAR (20),'+
            'dir_foto           TEXT,'+
            'borrado            BOOLEAN (1)     DEFAULT (0))');
        tx.executeSql("SELECT * FROM perfiles",[],function(tx, data) {
            total_usuarios = data.rows.length;
            var usuarios = "";
            var usuarios_reg = "<tableclass='contenido_mensaje'><caption>Usuarios registrados</caption>";
            if(total_usuarios !== 0 ){
                for(var i = 0; i < data.rows.length; i++){
                    usuarios += "<option>" + data.rows.item(i).nombre +"</option>";
                    usuarios_reg += "<tr>"+
                                        "<td class='usuario_rgistrado'>" + data.rows.item(i).usuario +"</td>"+
                                        "<td class='usuario_rgistrado'>"  +" "+data.rows.item(i).clave +"</td>"+
                                    "</tr>";
                }
                usuarios_reg += "</table>";                    
                document.getElementById("usuarios_reg").innerHTML=usuarios_reg;
                document.getElementById("usuariosRegistrados").innerHTML=usuarios_reg;
            }else{
                document.getElementById("msjInicio").innerHTML = "Mens: Bienvenido, debe registrarse";
            }
        }, function(error) {
            alertas.contenido='Transaction inicio perfiles ERROR: ' + error.message;
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        });
        tx.executeSql('CREATE TABLE IF NOT EXISTS participantes ('+
            'participante_k     INTEGER         PRIMARY KEY AUTOINCREMENT NOT NULL,'+
            'nombre             CHAR (100)      NOT NULL,'+
            'apellido           CHAR (100)      NOT NULL,'+
            'genero             CHAR (20),'+
            'identificacion     CHAR (20)       UNIQUE NOT NULL,'+
            'fecha_nacimiento   DATE,'+
            'nacionalidad       CHAR (30),'+
            'telefono           INTEGER (12),'+
            'email              CHAR (70),'+
            'direccion          TEXT,'+
            'estado_civil       CHAR (10),'+
            'observaciones      TEXT,'+
            'estado_fisiologico CHAR (30),'+  
            'conyugue           CHAR (20),'+     
            'desendientes       INT (3),'+
            'id_grupo           INTEGER (11),'+            
            'dir_foto           TEXT,'+  
            'fecha_creacion     DATE,'+
            'fecha_modificacion DATE,'+
            'id_tecnico         CHAR (20),'+
            'comunidad          CHAR (30),'+
            'movil_k            INT (11),'+
            'relacion           CHAR (30),'+
            'transferido        INT (1)     DEFAULT (0),'+  
            'borrado            INT (1)     DEFAULT (0))');
        tx.executeSql("SELECT * FROM participantes",[],function(tx, data) {
            total_participantes = data.rows.length;
            var participantes = "";
            if(total_participantes !== 0 ){
                for(var i = 0; i < data.rows.length; i++){
                    participantes += "<li>"+data.rows.item(i).nombre +" "+data.rows.item(i).apellido+"</li>";
                }               
                document.getElementById("participantesRegistrados").innerHTML=participantes;
            }else{
                document.getElementById("msjInicio").innerHTML = "Mens: Bienvenido, debe registrarse";
            }
        }, function(error) {
            alertas.contenido='Transaction inicio Participantes ERROR: ' + error.message;
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        });
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS grupos ('+
            'grupo_k    INTEGER     PRIMARY KEY AUTOINCREMENT NOT NULL,'+
            'grupo_server_k    INTEGER(11),'+
            'nombre     CHAR (100)  NOT NULL,'+
            'borrado    INT (1)  DEFAULT (0),'+
            'transferido    INT (1)  DEFAULT (0),'+
            'id_tecnico CHAR (20))');
        tx.executeSql("SELECT * FROM grupos",[],function(tx, data) {
            var total_grupos = data.rows.length;
            var grupos = "";
            if(total_grupos !== 0 ){
                $("#listaGrupo").empty();
                for(var i = 0; i < data.rows.length; i++){
                    grupos = '<li id="'+data.rows.item(i).grupo_k+'" class="userLink" data-link="'+data.rows.item(i).nombre+'">'+
                                '<div class="content-container">'+
                                    '<span class="name"><a href="#">'+data.rows.item(i).nombre+'</a></span>'+
                                '</div>'+
                             '</li>';
                }                 
                $("#listaGrupo").append(grupos);
            }else{
                document.getElementById("msjInicio").innerHTML = "Mens: Bienvenido, debe registrarse";
            }
        }, function(error) {
            alertas.contenido='Transaction inicio Grupos ERROR: ' + error.message;
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        });
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS conyugues ('+
            'con_k                  INTEGER      PRIMARY KEY AUTOINCREMENT,'+
            'nombre                 CHAR (50),'+
            'apellido               CHAR (50),'+
            'nacimiento             DATE,'+
            'identificacion         CHAR (20)       UNIQUE,'+
            'email                  CHAR (50),'+
            'telefono               CHAR (20),'+
            'nacionalidad           INTEGER (11),'+
            'id_participante        CHAR (20),'+
            'fecha_creacion         DATE,'+
            'fecha_modificacion     DATE,'+
            'genero                 CHAR (20),'+
            'estado_fisico          CHAR (20),'+
            'pais                   CHAR (20),'+
            'estado                 CHAR (20),'+
            'municipio              CHAR (20),'+
            'direccion              TEXT,'+
            'observaciones          TEXT,'+
            'dir_foto               TEXT,'+
            'transferido            INT (1)     DEFAULT (0),'+
            'identificacion_usuario CHAR (30),'+
            'id_usuario             INT (11),'+
            'borrado            BOOLEAN (1)     DEFAULT (0))');
        tx.executeSql("SELECT * FROM conyugues",[],function(tx, data) {
            var total_conyugues = data.rows.length;
            var conyugues_reg = "<table width='95%'><caption>Conyugues registrados</caption>";
            if(total_conyugues !== 0 ){
                for(var i = 0; i < data.rows.length; i++){
                    conyugues_reg += "<tr>"+
                                        "<td width='50%'>" + data.rows.item(i).nombre +"</td>"+
                                        "<td width='50%'>" +" "+data.rows.item(i).apellido +"</td>"+
                                        "<td width='50%'>" +" "+data.rows.item(i).genero +"</td>"+
                                    "</tr>";
                }             
            }else{
               conyugues_reg=     "<tr><td width='50%'></td></tr>";
            }   
            conyugues_reg += "</table>";                    
            document.getElementById("conyuguesRegistrados").innerHTML=conyugues_reg;
        }, function(error) {
            alertas.contenido='Transaction inicio Conyugues ERROR: ' + error.message;
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        }); 
    }, function(error) {
        alertas.contenido='Transaction inicio general ERROR: ' + JSON.stringify(err);
        alertas.btnConfirma="No";
        alertas.funcionConfirma="";
        alertas.funcionCancela="";
        alerta(alertas);
    });
    ///// PUSH NOTIFICATION /////
      // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      var notificationOpenedCallback = function(jsonData) {
            alertas.contenido=jsonData.payload.body;
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        //console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal
        .startInit("059542ad-9a49-429e-8b87-c3ae9610b3ae")
        //.handleNotificationOpened(notificationOpenedCallback)
          .handleNotificationReceived(function(jsonData) {
            //var json = $.parseJSON(jsonData);
            //alert("titulo: "+jsonData.payload.title+", Mensaje: "+jsonData.payload.body);
                var hoy = fecha_hoyc;
                db.transaction(function(tx) {
                    tx.executeSql('INSERT INTO notificaciones(titulo,mensaje,fecha_creacion,hora_creacion) VALUES (?,?,?,?)', [jsonData.payload.title,jsonData.payload.body,hoy,cad],
                      function(tx, resultSet) {
                        actualizarNotificaciones();
                      }, 
                      function(tx, error) {
                        alertas.contenido="ERROR AL INSERTAR DATOS EN NOTIFICACIONES";
                        alertas.btnConfirma="No";
                        alertas.funcionConfirma="";
                        alertas.funcionCancela="";
                        alerta(alertas);
                      });
                }, function(error) {
                    alertas.contenido='transaction insert mensaje: ' + error.message;
                        alertas.btnConfirma="No";
                        alertas.funcionConfirma="";
                        alertas.funcionCancela="";
                        alerta(alertas);
                  texto="<span class='imixio' style='color:#ff0000'> transacción insertar mensaje error: " + error.message + '</span>';
                });
            logs();
            //alert("Notificación recibida:\n" + JSON.stringify(jsonData));
            //console.log('he recibido una notificación: ' + JSON.stringify(jsonData));
          })
        .endInit();

      // Call syncHashedEmail anywhere in your app if you have the user's email.
      // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
      // window.plugins.OneSignal.syncHashedEmail(userEmail);
    ///// END PUSH NOTIFICATION /////
    /****************************** functios susers app ************************************************/
    
    $(document).on("click","#solicit_fecha",function(){
        var url = "http://www.imixdigital.com/phpmovil/instancias/imixContactos.php";
        socket.emit('get_fromimixurl',datos_usuario,url);
        document.location.href = "#menu4";
    });
    $(document).on("click","#guardarConyugue",function(){
        document.getElementById("msjConyugue").innerHTML = "Msj: guardando datos conyugue";
        var nombre          =   document.getElementById("nombreConyugue").value;
        var apellido        =   document.getElementById("apellidoConyugue").value;
        var nacimiento      =   document.getElementById("fechanacimientoConyugue").value;
        var identificacion  =   document.getElementById("identificacionConyugue").value;
        var email           =   document.getElementById("emailConyugue").value;
        var telefono        =   document.getElementById("telefonoConyugue").value; 
        var genero          =   document.getElementById("generoConyugue").value;
        var nacionalidad    =   document.getElementById("nacionalidadConyugue").value;
        var estado_fisico   =   document.getElementById("estadofisicoConyugue").value;
        var pais            =   document.getElementById("paisConyugue").value;
        var estado          =   document.getElementById("estadoConyugue").value;
        var municipio       =   document.getElementById("municipioConyugue").value;
        var direccion       =   document.getElementById("direccionConyugue").value;
        var observaciones   =   document.getElementById("observacionesConyugue").value;
        var id_conyugue     =   document.getElementById("idConyugue").value;
        var dir_foto        =   "";//document.getElementById("nombreimagenConyugue").value;
        var idUsuario       =   document.getElementById("id").value;
        var identificacionUsuario  =   document.getElementById("identificacionUsuario").value;
        var hoy = fecha_hoyc;           
        if(nombre!=="" && apellido!=="" && identificacion!==""){
            if(id_conyugue === ""){
                db.transaction(function(tx) {
                    tx.executeSql("INSERT INTO "+                        
                                  "conyugues(nombre,apellido,nacimiento,identificacion,email,telefono,fecha_creacion,"+ "fecha_modificacion,genero,nacionalidad,estado_fisico,pais,estado,municipio,direccion,"+
                                  "observaciones,dir_foto,id_usuario,identificacion_usuario) "+
                                  "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[nombre,apellido,nacimiento,identificacion,email,telefono,hoy,hoy,genero,nacionalidad,estado_fisico,pais,estado,municipio,direccion,observaciones,dir_foto,idUsuario,identificacionUsuario],
                      function(tx, resultSet) {
                        document.getElementById("msjConyugue").innerHTML = "Mens: " + resultSet.insertId;
                        document.getElementById("idConyugue").value=resultSet.insertId;
                        document.getElementById("msjConyugue").innerHTML = "Mens: " + resultSet.rowsAffected;
                        texto="<span class='imixio' style='color:#387ef5'> Nuevo Conyugue registrado, nombre: "+nombre+" apellido: "+apellido+", inserId: " + resultSet.insertId+", Lineas afectadas: " + resultSet.rowsAffected+'</span>';
                      }, 
                      function(tx, error) {
                        document.getElementById("msjConyugue").innerHTML = "ERROR INSERT conyugue";
                        texto="<span class='imixio' style='color:#ff0000'>ERROR INSERT conyugue, nombre: "+nombre+" "+apellido+"</span>";
                      });
                }, function(err) {
                    texto="<span class='imixio' style='color:#ff0000'>ERROR Tansaccion guardar conyugue, nombre: "+nombre+" "+apellido+"</span>";
                    document.getElementById("msjConyugue").innerHTML = '<span style="color:#ff0000"> ERROR Tansaccion guardar conyugue</span>';
                }); 
            }else{
                db.transaction(function(tx) {
                    tx.executeSql("UPDATE conyugues SET nombre=?,apellido=?,nacimiento=?,identificacion=?,email=?,telefono=?,fecha_modificacion=?,genero=?,nacionalidad=?,estado_fisico=?,pais=?,estado=?,municipio=?,direccion=?,observaciones=?,dir_foto=?,id_usuario=?,identificacion_usuario=?,transferido=? where identificacion_usuario=? and con_k=?",[nombre,apellido,nacimiento,identificacion,email,telefono,hoy,genero,nacionalidad,estado_fisico,pais,estado,municipio,direccion,observaciones,dir_foto,idUsuario,identificacionUsuario,identificacionUsuario,0,id_conyugue],
                    function(){
                        texto='<span class="imixio" style="color:#387ef5"> Se han actualizado los valores del conyugue: </span>' + nombre+" "+apellido;                        
                    },null);
                }, function(err) {
                     alertas.contenido='UPDATE database conyugue ERROR: ' + JSON.stringify(err);
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    texto='<span class="imixio" style="color:#ff0000"> UPDATE database conyugue ERROR: ' + JSON.stringify(err)+' </span>';
                });
            }
            document.getElementById("conyugueUsuario").value = nombre+ " " +apellido;
        }else{
            //alert('Faltan datos requeridos');
            alertas.contenido='Faltan datos requeridos';
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
            texto='<span class="imixio" style="color:#ff8000"> Faltan datos requeridos </span>';
        }
        logs();
    });
    $(document).on("click","#guardarUsuario",function(){
        var nombre          =   document.getElementById("nombreUsuario").value;
        var apellido        =   document.getElementById("apellidoUsuario").value;
        var clave           =   MD5(document.getElementById("usuarioClave").value);
        var usuario         =   document.getElementById("usuarioNombre").value;
        var nacimiento      =   document.getElementById("fechanacimientoUsuario").value;
        var identificacion  =   document.getElementById("identificacionUsuario").value;
        var email           =   document.getElementById("emailUsuario").value;
        var telefono        =   document.getElementById("telefonoUsuario").value;    
        var genero          =   document.getElementById("generoUsuario").value;
        var nacionalidad    =   document.getElementById("nacionalidadUsuario").value;
        var estado_civil    =   document.getElementById("estadocivilUsuario").value;
        var conyugue        =   "";//document.getElementById("conyugueUsuario").value;
        var cargo           =   document.getElementById("cargoUsuario").value;
        var estado_fisico   =   "";//document.getElementById("estadofisicoUsuario").value;
        var pais            =   document.getElementById("paisUsuario").value;
        var estado          =   document.getElementById("estadoUsuario").value;
        var municipio       =   document.getElementById("municipioUsuario").value;
        var direccion       =   document.getElementById("direccionUsuario").value;
        var observaciones   =   document.getElementById("observacionesUsuario").value;
        var dir_foto        =   "";//document.getElementById("nombreimagenUsuario").value;
        var id_usuario      =   document.getElementById("id").value;
        var confirmar_clave =   MD5(document.getElementById("confirmarUsuarioClave").value); 
        var hoy = fecha_hoyc;
        if(clave===confirmar_clave){
            if(nombre!=="" && apellido!=="" && clave!=="" && usuario!=="" && usuario!==identificacion){
                db.transaction(function(tx) {
                    tx.executeSql("SELECT * FROM perfiles WHERE identificacion=?",[identificacion],function(tx, data) {
                        total_usuarios = data.rows.length;
                        if(total_usuarios === 0 ){
                            tx.executeSql("INSERT INTO perfiles(nombre,apellido,clave,usuario,nacimiento,identificacion,email,telefono,"+
                                 "fecha_creacion,fecha_modificacion,genero,nacionalidad,estado_civil,conyugue,cargo,estado_fisico,"+
                                 "pais,estado,municipio,direccion,observaciones,dir_foto) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[nombre,apellido,clave,usuario,nacimiento,identificacion,email,telefono,hoy,hoy,genero,nacionalidad,estado_civil,conyugue,cargo,estado_fisico,pais,estado,municipio,direccion,observaciones,dir_foto],
                                  function(tx, resultSet) {
                                    document.getElementById("msjUsuario").innerHTML = "Mens: " + resultSet.insertId;
                                    document.getElementById("id").value=resultSet.insertId;
                                    document.getElementById("msjUsuario").innerHTML = "Mens: " + resultSet.rowsAffected;
                                    texto="Nuevo Usuario registrado, nombre: "+nombre+
                                            " apellido: "+apellido+
                                            ", inserId: " + resultSet.insertId+
                                            ", Lineas afectadas: " + resultSet.rowsAffected;
                                  }, function(tx, error) {
                                    alertas.contenido="INSERT Usuario error: " + error.message;
                                    alertas.btnConfirma="No";
                                    alertas.funcionConfirma="";
                                    alertas.funcionCancela="";
                                    alerta(alertas);
                                    texto='<span class="imixio" style="color:#ff0000"> INSERT Usuario error: ' + error.message+'</span>';
                                  });
                        }else{
                                tx.executeSql("UPDATE perfiles SET nombre=?,apellido=?,clave=?,usuario=?,nacimiento=?,identificacion=?,email=?,telefono=?,fecha_modificacion=?,genero=?,nacionalidad=?,estado_civil=?,conyugue=?,cargo=?,estado_fisico=?,pais=?,estado=?,municipio=?,direccion=?,observaciones=?,dir_foto=?,transferido=? where identificacion=?",[nombre,apellido,clave,usuario,nacimiento,identificacion,email,telefono,hoy,genero,nacionalidad,estado_civil,conyugue,cargo,estado_fisico,pais,estado,municipio,direccion,observaciones,dir_foto,0,identificacion],
                                  function() {
                                    texto="Usuario actualizado, nombre: "+nombre+" apellido: "+apellido;
                                    alertas.contenido=texto;
                                    alertas.btnConfirma="No";
                                    alertas.funcionConfirma="";
                                    alertas.funcionCancela="";
                                    alerta(alertas);
                                  }, function(error) {
                                    alertas.contenido="UPDATE Usuario error: " + error.message;
                                    alertas.btnConfirma="No";
                                    alertas.funcionConfirma="";
                                    alertas.funcionCancela="";
                                    alerta(alertas);
                                    texto='<span class="imixio" style="color:#ff0000"> UPDATE Usuario error: ' + error.message+'</span>';
                                  });
                                texto='<span class="imixio" style="color:#387ef5"> Se han actualizado los valores del usuario: </span>' + nombre+" "+apellido;
                        }
                    }, function(error) {
                        alertas.contenido='Validando id en BD de usuario ERROR: ' + error.message;
                        alertas.btnConfirma="No";
                        alertas.funcionConfirma="";
                        alertas.funcionCancela="";
                        alerta(alertas);
                    });

                }, function(err) {
                    alertas.contenido='Insert database perfiles ERROR: ' + JSON.stringify(err);
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    texto='<span class="imixio" style="color:#ff0000"> Insert database perfiles ERROR: ' + JSON.stringify(err)+'</span>';
                });    
            }else{
                document.getElementById("msjUsuario").innerHTML = '<span class="imixio"  style="color:#387ef5"> Mens: Faltan datos requeridos</span>';
                texto='<span class="imixio" style="color:#ff0000"> Faltan datos requeridos para guardar usuario </span>';
            }
        }else{
            document.getElementById("msjUsuario").innerHTML = '<span class="imixio"  style="color:#387ef5"> Mens: La confirmacion de clave no coinside</span>';
            texto='<span class="imixio" style="color:#ff0000"> Error en confirmacion de clave </span>';
            alertas.contenido="La confirmación de clave no coinside";
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        }
        logs();
    });
    $(document).on("click","#solicit_clave",function(){  
            document.location.href = "#usuario";
        });
    $(document).on("click",".inicio",function(){ 
        document.location.href = "#inicio";
    });
    $(document).on("click",".acceso",function(){ 
        document.location.href = "#acceso";
    });
    $(document).on("click",".menu1",function(){ 
        document.location.href = "#menu";
    });
    $(document).on("click","#solicit_clave1",function(){ 
       $("#usuarios_registrados").modal("toggle");
    });
    $(document).on("pageshow","#inicio",function(){
      //alert("pageshow event fired - pagetwo is now shown");
    });
    $(document).on("click","#enviar",function(){
        //validarUsuario();
        cargarUsuario();
    });
    var page ="";
    var pageViene ="";
    $(document).on("pageshow", function (e, data) {
        page = $.mobile.activePage.attr('data-name');

        if(page.toUpperCase()!="CONYUGUE" && page.toUpperCase()!="ESTADO FISICO"){
            pageViene=page;
        }
        if(page.toUpperCase()=="CONYUGUE"){                
            cargarDatosConyugue();
        }else if(page.toUpperCase()=="ESTADO FISICO"){
            cargarDatosEstadoFisico();
        }else if(page.toUpperCase()=="USUARIO"){
            cargarUsuario2();
        }else if(page.toUpperCase()=="LISTANOTASCATEGORIAS"){
            //$(".tituloImix").text("Categoria"+" - "); 
        }
    });
   $(document).on("click","#borrar_logs",function(){
       db.transaction(function(tx) {
           tx.executeSql("update logs set borrado=1 where log_id <> ?",[1],null,null);
       }, function(err) {
            alert('UPDATE database logs ERROR: ' + JSON.stringify(err));
            texto='<span class="imixio" style="color:#ff0000"> UPDATE database logs ERROR: ' + JSON.stringify(err)+'</span>';
        });
       logs();
   });
    $(document).on("click","#eliminar_logs",function(){
       db.transaction(function(tx) {
            tx.executeSql("delete from logs where log_id <> ?",[1],null,null);
       }, function(err) {
            alert('Borrado database logs ERROR: ' + JSON.stringify(err));
            texto='<span class="imixio" style="color:#ff0000"> Borrado database logs ERROR: ' + JSON.stringify(err)+'</span>';
        });
        logs();
   });
    $(document).on("click","#enviar_logs",function(){
        var usuario   =   document.getElementById("nameUsuario").value;
        texto='<span class="imixio" style="color:#387ef5"> Transferencia de datos logs por: ' +usuario+'</span>';
        logs();
        if(conectado !== "No hay coneccion" && usuario!==""){
           db.transaction(function(tx) {
                tx.executeSql("select * from logs where log_id <> ? and descripcion<>''",[1],function(tx,data){
                    var datos={};
                    var total = data.rows.length;
                    if(data.rows.length>0){
                        for(var i = 0; i < data.rows.length; i++){
                            datos.log_id= data.rows.item(i).log_id;
                            datos.descripcion= data.rows.item(i).descripcion;
                            datos.hora= data.rows.item(i).hora;
                            datos.transferido= data.rows.item(i).transferido;
                            datos.borrado= data.rows.item(i).borrado;
                            datos.fecha= data.rows.item(i).fecha;
                            datos.total = total;
                            datos.usuario = data.rows.item(i).usuario;
                            datos.item=  parseInt(i)+1;
                            datos.socketid = datos_usuario.socketid;
                            socket.emit('logs',datos);
                        }
                    }
                });
           },function(err) {
                    alert('ERROR transferencia de datos logs: ' + JSON.stringify(err));
                    texto='<span class="imixio" style="color:#ff0000"> ERROR transferencia de datos logs: ' + JSON.stringify(err)+'</span>';
                });
             
        }else{
            texto='<span class="imixio" style="color:#ff0000">Enviando logs No hay coneccion con el servidor, por: '+usuario+'</span>';
        }
        logs();
    });
    
    /************ Inicia chat **************************/
    var GLOBALSTATE = {
        route: '.list-account'
    };
    var respuesta_servidor = "";
    var i=0;
    var entregado={};
    var respu="";
    var nueva_resp ="";
    // Set first Route
    setRoute(GLOBALSTATE.route);
    $('#hangout .nav > li[data-route="' + GLOBALSTATE.route + '"]').addClass('active');

    //dirtiest, ugliest, hackiest ripple effect solution ever... but they work xD
    $('.floater').on('click', function(event) {
        var $ripple = $('<div class="ripple tiny bright"></div>');
        var x = event.offsetX;
        var y = event.offsetY;
        var $me = $(this);

        $ripple.css({
            top: y,
            left: x
        });
        $(this).append($ripple);

        setTimeout(function() {
            $me.find('.ripple').remove();
        }, 530);
 
    });

    // Have to Delegate ripple due to dom manipulation (add)
    $('ul.mat-ripple').on('click', 'li', function(event) {
        var $ripple="";
        if ($(this).parent().hasClass('tiny')) {
            $ripple = $('<div class="ripple tiny"></div>');
        } else {
            $ripple = $('<div class="ripple"></div>');
        }
        var x = event.offsetX;
        var y = event.offsetY;

        var $me = $(this);

        $ripple.css({
            top: y,
            left: x
        });

        $(this).append($ripple);

        setTimeout(function() {
            $me.find('.ripple').remove();
        }, 530);
    });

    // Set Name
    setName2(localStorage.getItem('username'));

    // Dyncolor ftw
    if (localStorage.getItem('color') !== null) {
        var colorarray = JSON.parse(localStorage.getItem('color'));
        stylechange(colorarray);
    } else {
        var colorarray = [15, 157, 88]; // 15 157 88 = #0f9d58
        localStorage.setItem('color', JSON.stringify(colorarray));
        stylechange(colorarray);
    }

    // Helpers
    function setName2(name) {
        $.trim(name) === '' || $.trim(name) === null ? name = '' : name = name;
        $('#chat > h1').text(name);
        localStorage.setItem('username', name);
        $('#username').val(name).addClass('used');
        $('.card.menu > .header > h3').text(name);
    }

    // Stylechanger 
    function stylechange(arr) {
        var x = 'rgba(' + arr[0] + ',' + arr[1] + ',' + arr[2] + ',1)';
        $('#dynamic-styles').text('.dialog h3 {color: ' + x + '} .i-group input:focus ~ label,.i-group input.used ~ label {color: ' + x + ';} .bar:before,.bar:after {background:' + x + '} .i-group label {color: ' + x + ';} #hangout > ul.nav > li.active {color:' + x + '} .style-tx {color: ' + x + ';}.style-bg {background:' + x + ';color: white;}@keyframes navgrow {100% {width: 100%;background-color: ' + x + ';}} ul.list li.context {background-color: ' + x + '} .nan:after {background-color:' + x + '}');        
    }

    function closeModal() {
        $('#new-user').val('');
        $('.overlay').removeClass('add');
        $('.floater').removeClass('active');
        $('#contact-modal').fadeOut();
        $('#contact-modal').off('click', '.btn.save');
    }

    function setModal(mode, $ctx) {
        var $mod = $('#contact-modal');
        switch (mode) {
            case 'add':
                $mod.find('h3').text('Add Contact');
                break;

            case 'edit':
                $mod.find('h3').text('Edit Contact');
                $mod.find('#new-user').val($ctx.text()).addClass('used');
                break;
        }

        $mod.fadeIn();
        $('.overlay').addClass('add');
        $mod.find('#new-user').focus();
    }

    $('.mdi-arrow-left').on('click', function() {
        $('.shown').removeClass('shown');
        setRoute('.list-text');
    });
    function hoy(){
	    var fechaActual = new Date();
	    dia = fechaActual.getDate();
	    mes = fechaActual.getMonth() +1;
	    anno = fechaActual.getFullYear();
	  // alert(anno);
	    if (dia <10) dia = "0" + dia;
	    if (mes <10) mes = "0" + mes;
	    fechaHoy = dia + "/" + mes + "/" + anno;
	    return fechaHoy;
	}
    // Set Routes - set floater
    function setRoute(route) {
        console.log(route);
        GLOBALSTATE.route = route;
        $(route).addClass('shown');
        if (route !== '.list-account') {
        } else {
            nueva_resp="";
            socket.emit('cargarUsuarios',datos_usuario);
        }
        if (route !== '.list-text') {
            $('#chat-floater').addClass('hidden');
        } else {
            $('#chat-floater').removeClass('hidden');
        }
        if (route == '.list-chat') {
            $('.mdi-menu').hide();
            $('.mdi-arrow-left').show();
            $('#content').addClass('chat');   
            
            $('#content ul.nav').hide();
            $('.list-chat .meta-bar').css('bottom','0px');
        } else {
            $('#content').removeClass('chat');
            $('.mdi-menu').show();
            $('.mdi-arrow-left').hide();
            $('#content ul.nav').show();            
        }
        if (route !== '.list-phone') {
        } else {            
            respu="";
            socket.emit('cargarUsuarios',datos_usuario);
            datosUsuarios();
        }
    }
    // Colorpicker
    var cv = document.getElementById('colorpick');
    var ctx = cv.getContext('2d');
    var img = new Image();
    // Meh .. Thx 2 Browser Security i need BASE64
    img.src = 'data:image/gif;base64,R0lGODlh8gDYAPepAP///8yZ/zNm////Zsz/ZmbM//+ZZplm/zPMzMz/M//MZmb/mZkz/8wAzMz/mcwA/wD/mf//AMwz//8A//8AAP/MmTPM////mZn/mf8AZmb/zGb/ZgD/zAD//5mZ/wCZmf+ZzAD/AP+Z/wDMAJn/Zpn/zDPMM5nM//9mzP+Zmcxm/5nMAP8zmf9QUGaZ/2YA/wBmzGb//zMz/wBmmQAA/wAzzDMzzDOZ/wBm/2aZAACZAADMZgCZzP8zzJn/M8wzmWZm/wDM//8zAMwAAGb/M8wAmQCZM8zMAMxmmQCZ//9mAMxmAADMmf9mmcyZAP/MAMwAZv9mZv9m//+ZM/+ZAMz/zMz//8zM/zOZMwBmZpmZZmZmM5kAmZkAzGYAM2YAzJkAM5kA/2ZmmQBmADNmAJkzmTMzAGaZmTMzmZlmMzOZZpkzZpkAADNmzMwzAJkzADNmmZlmAIAAAAAzmQAAzAAAmf//zAAAZmYzAAAzZpkzMwAzAGYAZv/M///MzAo7CmwKbLFjYwo7bGw7CgoKbJ1sCmOKsQo7nZ0KCs47CoUKCgoKnQoKzmOK2J07CqmpxgpsbGwKzmNjsbFjsZ0K/4qKYzs7CjtsCrGKY7FjigpsCmOxY50KO2wKO2OxisbGqZ0KnanGxp0Kzv/Ozv//zs7O///O/87//87/zv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNUIxREUxODJBRTMxMUU1ODYyMkREQ0Q3NUZENjdFMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNUIxREUxOTJBRTMxMUU1ODYyMkREQ0Q3NUZENjdFMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE1QjFERTE2MkFFMzExRTU4NjIyRERDRDc1RkQ2N0UwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE1QjFERTE3MkFFMzExRTU4NjIyRERDRDc1RkQ2N0UwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEg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';

    img.onload = function() {
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };
     //todo optimize
    $('#clave_acceso').on('blur', function() {
    	datos_usuario.usuario=$("#username").val();
    	datos_usuario.clave=MD5($("#clave_acceso").val());
        socket.emit('validar_datos',datos_usuario);
        setName2(datos_usuario.usuario);

        $('.card.menu > .header > img').addClass('excite');
        setTimeout(function() {
            $('.card.menu > .header > img').removeClass('excite');
        }, 800);

    });
    // Dirty Colorpicker
    $('#colorpick').on('mousedown', function(eventDown) {
        var x = eventDown.offsetX;
        var y = eventDown.offsetY;

        if (eventDown.button === 0) {
            $('.card.menu > .header > img').addClass('excite');
            setTimeout(function() {
                $('.card.menu > .header > img').removeClass('excite');
            }, 800);

            var imgData = ctx.getImageData(x, y, 1, 1).data;
            localStorage.setItem('color', JSON.stringify(imgData));
            stylechange(imgData);
        }
    });
    function getHoras(){ 
        var f=new Date();
            cad=f.toLocaleTimeString();
            return cad;
    }  
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    function datosUsuarios(){
		function onSuccessConfig(data,status,nancho){
			var json = $.parseJSON(data);
	        if (json.success===true){ 
				 var filtros ="";
				 var i=0;
	             $.each( json.data, function( key, value ) {
	             	if(value.phone!==0 && value.phone!==null){
		             	i++;
                        respu += '<li class="userLink tel '+value.username.toProperCase()+'" data-link="'+value.username+'"><img src="./images/chat/imix-36.png">'+
                            '<div class="content-container">'+
                                '<span class="name"><a href="tel:'+value.phone+'">'+value.phone+'</a></span>'+
                                '<span class="phone">'+value.name+' '+value.lastname+'</span>'+
                                '<span class="meta">'+value.cargo+'</span>'+
                            '</div>'+
                            '<span class="time">'+
                                value.fecha_nac+
                            '</span>'+
                        '</li>';
	             	}
	             });
                $("#telefonos_usuarios").empty();        
                $("#telefonos_usuarios").append(respu);
	        }else{
                alertas.contenido="Los datos no son correctos";
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
	        }
	        return false;
		}
		function onErrorConfig(){
            alertas.contenido="Error catego";
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
		}
		var formData = "prefix=imix&pagina=movil&seccion=usuarios";
		$.ajax({
	        type: "POST",
	        dataType: "text",
	        url: "http://www.imixdigital.com/phpmovil/instancias/imixUsuarios.php",
	        cache: false,
	        data: formData,
	        success: onSuccessConfig,
	        error: onErrorConfig
	    });
    }
    $('.div-mdi-send').on('click', function() {
        var chatmessage = $('.chat-input').val();  
        if(chatmessage!=""){
            $("#contenido_chat").append(                           
                '<li class="right">'+
                    '<img src="http://s8.postimg.org/76bg2es2t/index.png">'+
                    '<div class="message">'+chatmessage+'</div>'+
                '</li>'
            );
            //$("#list-chat").height($("#content").height()-30);
            $(".list-chat").scrollTop($(".list-chat")[0].scrollHeight);
        }
        $('.chat-input').val('');
        var hora = getHoras();
        var enviarA=[],msgs={},i=0;
        var enviar_a = $("#you_name").text();
            msgs.text = chatmessage;
            msgs.enviado_por = $("#me_name").text();
            enviarA.push(enviar_a);
            socket.emit('message',msgs,hora,enviarA);
            
    });

    $('.chat-input').on('keyup', function(event) {
        event.preventDefault();
        if (event.which === 13) {
            $('.mdi-send').trigger('click');
        }
    });

    $(document).on("click","#lista_usuarios1 > li",function(){
        $("#contenido_chat").empty();
        $(".cantidad").text("");
        datos_usuario.room = $(this).find('.name').text();
        var x = document.getElementsByClassName("you_name");
            x[0].innerHTML = datos_usuario.room;        
        // timeout just for eyecandy...
        setTimeout(function() {
            $('.shown').removeClass('shown');
            $('.list-chat').addClass('shown');
            setRoute('.list-chat');
            $('.chat-input').focus();
            socket.emit("solicit_chat_usuario",datos_usuario);
        }, 300);
    });

    
    $(document).on("click","#lista_usuarios0 > li",function(){
        $("#contenido_chat").empty();
        $(".cantidad").text("");
        //console.log('Limpiando chat',i=i+1);
        datos_usuario.room = $(this).find('.name').text();
        var x = document.getElementsByClassName("you_name");
            x[0].innerHTML = datos_usuario.room;        
		
		//socket.emit('solicit_chat_usuario',datos_usuario);    

        setTimeout(function() {
            $('.shown').removeClass('shown');
            $('.list-chat').addClass('shown');
            setRoute('.list-chat');
            $('.mdi-arrow-left').css({display: 'yes'});
            $('.you').show();
            //$('.mdi-fullscreen').css({display: 'none'});
            $('.chat-input').focus();
            socket.emit("solicit_chat_usuario",datos_usuario);
        }, 300);
    });

    $('.list-account > .list').on('click', 'li', function() {
        $(this).parent().children().removeClass('active');
        $(this).parent().find('.context').remove();
        $(this).addClass('active');
        var $TARGET = $(this);
        if (!$(this).next().hasClass('context')) {
            var $ctx = $('<li class="context"><i class="mdi mdi-pencil"></i><i class="mdi mdi-delete"></i></li>');
            $ctx.on('click', '.mdi-pencil', function() {
                setModal('edit', $TARGET);
                $('#contact-modal').one('click', '.btn.save', function() {
                    $TARGET.find('.name').text($('#new-user').val());
                    closeModal();
                });
            });
            $ctx.on('click', '.mdi-delete', function() {
                $TARGET.remove();
            });
            $(this).after($ctx);
        }
    });

    $('#hangout .nav li').on('click', function() {
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
        $('.shown').removeClass('shown');
        var route = $(this).data('route');
        $(route).addClass('shown');
        setRoute(route);
    });

    $('#head').on('click', '.mdi-fullscreen', function() {
        $(this).removeClass('mdi-fullscreen').addClass('mdi-fullscreen-exit');
        $('.slidingDiv').css({
            height:'90%'
        });
    });

    $('#head').on('click', '.mdi-fullscreen-exit', function() {
        $(this).removeClass('mdi-fullscreen-exit').addClass('mdi-fullscreen');
        $('.slidingDiv').css({
            height:'50%'
        });
    });

    // menuclick
    $('#head .mdi-menu').on('click', function() {
        $('.menu').toggleClass('open');
        $('.overlay').toggleClass('add');
    });

    // viewtoggle > 1000
    $('#head .mdi-chevron-down').on('click', function() {
        if ($('#hangout').hasClass('collapsed')) {
            $(this).removeClass('mdi-chevron-up').addClass('mdi-chevron-down');
            $('#hangout').removeClass('collapsed');
        } else {
            $(this).removeClass('mdi-chevron-down').addClass('mdi-chevron-up');
            $('#hangout').addClass('collapsed');
        }
    });

    // Filter
    $('.search-filter').on('keyup', function() {
        var filter = $(this).val();
        $(GLOBALSTATE.route + ' .list > li').filter(function() {
            var regex = new RegExp(filter, 'ig');

            if (regex.test($(this).text())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('.search-filter').on('keyup', function() {
        var filter = $(this).val();
        $(GLOBALSTATE.route + ' .list > li').filter(function() {
            var regex = new RegExp(filter, 'ig');

            if (regex.test($(this).text())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // killit
    $('#contact-modal').on('click', '.btn.cancel', function() {
        closeModal();
    });

    $('#new-user').on('keydown', function(event) {
        switch (event.which) {
            case 13:
                event.preventDefault();
                $('.btn.save').trigger('click');
                break;

            case 27:
                event.preventDefault();
                $('.btn.cancel').trigger('click');
                break;
        }

    });

    $('#add-contact-floater').on('click', function() {
        if ($(this).hasClass('active')) {
            	closeModal();
            $(this).removeClass('active');

        } else {
            $(this).addClass('active');
            setModal('add');
            $('#contact-modal').one('click', '.btn.save', function() {
                $('.list-account > .list').prepend('<li><img src="http://lorempixel.com/100/100/people/1/"><span class="name">' + $('#new-user').val() + '</span><i class="mdi mdi-menu-down"></i></li>');
                closeModal();
            });
        }
    });
    /******************************chat*******************************/
    socket.on('recibir_chat',function(msg){  
          var cuando="";
          if(hoy() == msg.fecha_creacion){
            cuando ="Hoy";
          }else{
            cuando ="Anterior";
          }
          if(msg.usuario != datos_usuario.usuario){
            entregado.entrega = "SI";
            //console.log('entregado',entregado.entrega);
            entregado.msg_id = msg.msg_id;

            socket.emit('entregado',entregado);

            $("#contenido_chat").append(                           
                '<li class="left">'+
                    '<img src="http://lorempixel.com/100/100/people/1/">'+
                    '<div class="message">'+msg.mensaje+'</div>'+
                '</li>'
            );
          }else{	          	
            $("#contenido_chat").append(                           
                '<li class="right">'+
                    '<img src="http://s8.postimg.org/76bg2es2t/index.png">'+
                    '<div class="message">'+msg.mensaje+'</div>'+
                '</li>'
            );
          }
         $(".list-chat").scrollTop($(".list-chat")[0].scrollHeight);
         $("#contenido_chat").scrollTop($("#contenido_chat")[0].scrollHeight);
    });

    socket.on('roster', function (names) {
      $("#lista_usuarios1").empty();
      var num = names.length,i=0;

      for(i=0;i<num;i++){
        var nombres = names[i].name;
          if(nombres!=undefined && nombres!=$("#me_name").text()){ 
              //alert(nombres)
              $("#lista_usuarios1").append(
                '<li class="userLink chat '+nombres.toProperCase()+'" data-link="'+nombres+'">'+
                	'<img src="./images/chat/imix-36.png">'+
                    '<div class="content-container">'+
                        '<span class="name">'+nombres+'</span>'+
                        '<span class="meta">web de: '+names[i].country+'</span><br>'+
                        '<span class="meta">'+names[i].region+'</span>'+
                    '</div>'+
                    '<!--<span class="time">'+
                        '14:00'+
                    '</span>-->'+
                '</li>'
              );                      
          }else if(nombres==$("#me_name").text()){                    
          }
      }
      /********************* quien esta conectado ***********************/
        $(".userLink").css("color", "#f44336");
        //console.log(names.length);
        var num = names.length,i=0;
        var nueva_fecha = fecha_hoy_presentacion();
        for(i=0;i<num;i++){
            var nombres = names[i].name;
            var encontrado = 'no';
            if(nombres != undefined){	
                var clase = nombres.toProperCase();	
                var usuario = nombres;				
                $( ".userLink" ).each(function() {
                    var nombre = $( this ).attr ('data-link' );
                    if(usuario == nombre){							
                        $("."+clase).css("color", "#2b912d");
                        encontrado = 'si';
                    }				
                });	
                if(encontrado=='no'){               	
                	if($("#me_name").text()!= nombres){
						var newUser =  '<li class="userLink chat '+nombres.toProperCase()+'" data-link="'+nombres+'">'+
										'<img src="./images/chat/imix-36.png">'+
                                        '<div class="content-container">'+
                                            '<span class="name">'+nombres+'</span>'+
                                            '<span class="meta">web de: '+names[i].country+'</span><br>'+
                                            '<span class="meta">'+names[i].region+'</span>'+
                                        '</div>'+
                                        '<!--<span class="time">'+
					                        '14:00'+
					                    '</span>-->'+
                                    '</li>';
                    	$("#lista_usuarios0").append(newUser);
					}
                }
            }            
        } 
    });
    socket.on('warning', function (data) {
        if(data.acceso=="Acceso Permitido"){
            document.location.href = "#menu"; 
            $('#username').val("");
    		$('#clave_acceso').val("");
        }else{
    	    datos_usuario.socketId = data.socketId;
     		var code = ['a','b','c','d','e','f','g','h','i','j','k'];
  			var x = code[Math.floor((Math.random() * 10))]+Math.floor((Math.random() * 10000) + 1).toString()+code[Math.floor((Math.random() * 10))];
          			datos_usuario.usuario=data.name;
          			//*********************** CHAT IMIX MOVIL *********************//
	    			$("#me_name").text(data.name);
					$("#username").val(data.name);
					$('.card.menu > .header > h3').text(data.name);
					$('#username').val("");
    				$('#clave_acceso').val("");
       }
        if(data.transferido=="SI"){
            db.transaction(function(tx) {
                tx.executeSql("UPDATE perfiles SET transferido=? where identificacion=?",[1,data.identificacion],null,null);
                texto='<span class="imixio" style="color:#387ef5"> Se han actualizado los valores transferencia del usuario: </span>' + usuario;   
            }, function(err) {
                alertas.contenido='UPDATE database transfer perfil ERROR: ' + JSON.stringify(err);
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
                texto='<span class="imixio" style="color:#ff0000"> UPDATE database transferencia perfil ERROR: ' + JSON.stringify(err)+'</span>';
            });
        }
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM participantes WHERE transferido=0",[],function(tx, data) {
                if(data.rows.length!==0){
                    for(var i = 0; i < data.rows.length; i++){
                        var participante = {};
                        participante.idParticipante  =   data.rows.item(i).participante_k;
                        participante.nombre          =   data.rows.item(i).nombre;
                        participante.apellido        =   data.rows.item(i).apellido;
                        participante.genero          =   data.rows.item(i).genero;
                        participante.identificacion  =   data.rows.item(i).identificacion;
                        participante.nacimiento      =   data.rows.item(i).fecha_nacimiento;
                        participante.nacionalidad    =   data.rows.item(i).nacionalidad;
                        participante.telefono        =   data.rows.item(i).telefono;  
                        participante.email           =   data.rows.item(i).email;
                        participante.direccion       =   data.rows.item(i).direccion;
                        participante.estado_civil    =   data.rows.item(i).estado_civil;
                        participante.observaciones   =   data.rows.item(i).observaciones;
                        participante.fecha_nacimiento=   data.rows.item(i).fecha_nacimiento;
                        participante.estado_fisico   =   "";
                        participante.conyugue        =   "";
                        participante.desendientes    =   "";
                        participante.grupo           =   data.rows.item(i).id_grupo;
                        participante.dir_foto        =   "";
                        participante.comunidad       =   "";
                        participante.id_tecnico      =   datos_usuario.identificacion;
                        participante.movil_k         =   data.rows.item(i).movil_k;

                        datos_usuario.participante=participante;
                        socket.emit("participantes",datos_usuario);                        
                    }
                }
            }, function(err) {
                alertas.contenido='Database transfiriendo participantes ERROR: ' + JSON.stringify(err);
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
                texto='<span class="imixio" style="color:#ff0000"> UPDATE database transferencia perfil ERROR: ' + JSON.stringify(err)+'</span>';
            });
        });
        logs();                
    });
    socket.on('logsTransferidos', function (data) { 
        db.transaction(function(tx) {
           var hoy = fecha_hoyc;
           tx.executeSql('UPDATE logs SET transferido=? WHERE usuario=? and log_id=?', [1,data.usuario,datos.log_id],null,null); 
           actualizarLogs();                    
        });
    });
    socket.on('message', function (msg) {
        var chats="";
    	if($("#you_name").text() !== ""){
	      	chats = $("#you_name").text();
	      	//console.log("you_name: ",chats)
	      }else{
	      	chats = "No existe";
	      	//console.log("you_name: ",chats)
	      }
	      
	     var resp  = chats;

	     if(resp=="No existe"){ // && msg.name!=msg.enviado_a
	    	var cantidad = $("#"+msg.name).text();
             var mTotoal=0;
	    	if(cantidad===""){
	    		mTotoal=1;
	    	}else{
	    		mTotoal= parseInt(cantidad)+1;
	    	}
	    	$("#"+msg.name).text(mTotoal.toString());
	    	entregado.entrega="NO";
	    	entregado.msg_id = msg.msg_id;
	    	socket.emit('entregado',entregado);
	     }
      if(msg.name!=datos_usuario.usuario){
        $("#contenido_chat").append(                           
            '<li class="right">'+
                '<img src="http://lorempixel.com/100/100/people/1/">'+
                '<div class="message">'+msg.text+'</div>'+
            '</li>'
        );
      }else{
        $("#contenido_chat li:last-child").append(                           
            '<div class="confirmacion">&#10004;</div>'
        );
      }
      $(".list-chat").scrollTop($(".list-chat")[0].scrollHeight);
    });   
    socket.on('cargarUsuarios', function (data) {
        var pendientes=0;
        if(data.pendientes>0 && data.pendientes!='null'){
            pendientes=data.pendientes;
        }else{
            pendientes=0;
        }
        if(data.item!=data.total){
           nueva_resp += '<li class="userLink chat '+data.usuario.toProperCase()+'" data-link="'+data.usuario+'"><img src="./images/chat/imix-36.png">'+
                            '<div class="content-container">'+
                                '<span class="name">'+data.usuario+'</span>'+
                                '<span class="phone">'+data.nombre+' '+data.apellido+'</span>'+
                                '<span class="meta">'+data.cargo+'</span>'+
                            '</div>'+
                            '<span class="time">'+
                                data.fecha_creacion+
                            '</span>'+
                        '</li>';
        }else{
            nueva_resp += '<li class="userLink chat '+data.usuario.toProperCase()+'" data-link="'+data.usuario+'"><img src="./images/chat/imix-36.png">'+
                            '<div class="content-container">'+
                                '<span class="name">'+data.usuario+'</span>'+
                                '<span class="phone">'+data.nombre+' '+data.apellido+'</span>'+
                                '<span class="meta">'+data.cargo+'</span>'+
                            '</div>'+
                            '<span class="time">'+
                                data.fecha_creacion+
                            '</span>'+
                        '</li>';
            socket.emit("updateRoster");
        }
        $("#lista_usuarios0").empty();
        $("#lista_usuarios0").append(nueva_resp);
    }); 
    socket.on('datos_validados', function(datos){
        var x,i=0,largo=datos.length;
        if(datos.validado == "ok"){
            var seleccion_si_server = confirm("El usuario existe en servidor ¿desea importar los datos del servidor?");
            texto="<span class='imixio' style='color:#ff0000'>El usuario existe en servidor ¿desea traer los datos el servidor?, nombre: "+datos.usuario+"</span>";
            if (seleccion_si_server === true) {
                document.location.href = "#usuario";
                document.getElementById("id").value =datos.perfil_k;
                document.getElementById("nombreUsuario").value  =datos.nombre;
                datos_usuario.nombre =datos.nombre;
                document.getElementById("apellidoUsuario").value=datos.apellido;
                datos_usuario.apellido=datos.apellido;
                document.getElementById("fechanacimientoUsuario").value=datos.nacimiento;
                datos_usuario.nacimiento=datos.nacimiento;
                document.getElementById("identificacionUsuario").value=datos.identificacion;
                datos_usuario.identificacion=datos.identificacion;
                document.getElementById("emailUsuario").value=datos.email;
                datos_usuario.email=datos.email;
                document.getElementById("telefonoUsuario").value=datos.telefono;
                datos_usuario.telefono=datos.telefono;
                document.getElementById("usuarioNombre").value=datos.usuario;
                datos_usuario.usuario=datos.usuario;
                document.getElementById("usuarioClave").value="";
                datos_usuario.clave=datos.clave;
                document.getElementById("confirmarUsuarioClave").value="";
                document.getElementById("generoUsuario").value=datos.genero;
                datos_usuario.genero=datos.genero;
                document.getElementById("nacionalidadUsuario").value=datos.nacionalidad;
                datos_usuario.nacionalidad=datos.nacionalidad;
                document.getElementById("estadocivilUsuario").value=datos.estado_civil;
                datos_usuario.estado_civil=datos.estado_civil;
                //document.getElementById("conyugueUsuario").value=datos.conyugue;
                datos_usuario.conyugue=datos.conyugue;
                document.getElementById("cargoUsuario").value=datos.cargo;
                datos_usuario.cargo=datos.cargo;
                //document.getElementById("estadofisicoUsuario").value=datos.estado_fisico;
                datos_usuario.estado_fisico=datos.estado_fisico;
                document.getElementById("paisUsuario").value=datos.pais;
                datos_usuario.pais=datos.pais;
                document.getElementById("estadoUsuario").value=datos.estado;
                datos_usuario.estado=datos.estado;
                document.getElementById("municipioUsuario").value=datos.municipio;
                datos_usuario.municipio=datos.municipio;
                document.getElementById("direccionUsuario").value=datos.direccion;
                datos_usuario.direccion=datos.direccion;
                document.getElementById("observacionesUsuario").value=datos.observaciones;
                datos_usuario.observaciones=datos.observaciones;
                //document.getElementById("nombreimagenUsuario").value=datos.dir_foto;
                //datos_usuario.dir_foto=datos.dir_foto;
                datos_usuario.fecha_modificacion=datos.fecha_modificacion;
                datos_usuario.fecha_creacion=datos.fecha_creacion;
                datos_usuario.transferido=datos.transferido;
                datos_usuario.web="NO";   
                $('#generoUsuario').selectmenu('refresh', true);
                $('#estadocivilUsuario').selectmenu('refresh', true);
            }else{
                texto="<span class='imixio' style='color:#ff0000'>Usuario encontrado en el servidor se dicidio no importar los datos, nombre: "+datos.usuario+"</span>";
            } 
            
          /*********************** CHAT IMIX MOVIL *********************/
            //$('#usurio-chat').val(datos.usuario);
		    $("#me_name").text(datos.usuario);
			$("#username").val(datos.usuario);
			$('.card.menu > .header > h3').text(datos.usuario);
        } else {
            x = "Debes crear un usuario nuevo";
            texto="<span class='imixio' style='color:#ff0000'>Usuario no encontrado en el servidor, nombre: "+datos.usuario+"</span>";
            
            /*********************** CHAT IMIX MOVIL *********************/
            var code = ['a','b','c','d','e','f','g','h','i','j','k'];
      		var x = code[Math.floor((Math.random() * 10))]+Math.floor((Math.random() * 10000) + 1).toString()+code[Math.floor((Math.random() * 10))];
              datos_usuario.usuario=datos.usuario+"-"+x;
              //$('#usurio-chat').val(datos.usuario+"-"+x);
        }
        logs();
        document.getElementById("msjUsuarioAcceso").innerHTML = x;    
        
        $('#login-modal').modal('hide');
        //$('#username').val("");
        $('#clave_acceso').val("");
    });
    
    socket.on('recibe_user_data',function (datos){
        
    }); 
     socket.on('contactos_fromimixurl',function (datos){
        $("#contactosRegistrados").empty();
        $("#contactosRegistrados").append(datos);
    }); 
    socket.on('notaDia', function (notaDia) {
        /*var respu ="";*/
        $("#texto-titulo").empty();       

        $("#texto-titulo").append(notaDia);
        $(".foto_contenido").remove();
    });
    socket.on('getCatego',function(datos){
        var respu ="",
            i=0,
            categorias=datos.categorias;
        $("#accordion").empty();
        $.each( categorias, function( key, value ) {
            i=i+1;
            respu = '<div class="panel panel-default col-xs-12 col-md-12 col-lg-12">'+
                          '<div class="panel-heading" id="catego'+value.catego_k+'" style="background-color:'+value.catego_color+';">'+
                            '<h4 class="panel-title ">'+
                              '<a data-toggle="collapse"  style="color:'+value.catego_text_color+'; text-shadow:none;">'+value.nombre+'</a>'+ /*data-parent="#accordion" href="#collapse'+value.catego_k+'"*/
                            '</h4>'+
                          '</div>'+
                          '<div id="collapse'+value.catego_k+'" class="panel-collapse collapse in">'+
                              '<div class="note note-catego" id="nota'+value.catego_k+'">'+                                
                              '</div>'+                          
                          '</div>'+
                     '</div>';
            $("#accordion").append(respu);
            $("#catego"+value.catego_k).bind("click",function(){
                var configCatego={};
                    configCatego.nombre = value.nombre;
                    configCatego.catego_color = value.catego_color;
                    configCatego.catego_text_color = value.catego_text_color;
                cargarCatego(value.catego_k,configCatego);
            });
        }); 
        
        /**/
        //**//datos.categorias=categorias;//**//
        datos.url = "";
        datos.idDevice=idDevice;
        datos.prefix = datos_usuario.prefix;
        if(categorias.length == i){
            socket.emit("noticiaPortada",datos);
        }
    });
    socket.on('getNoticiaPortada',function(notas){
        $("#nota"+notas.catego_k).append( notas.nota );
        $(".foto_contenido").remove();
        $("#nota_"+notas.nota_k).bind("click",function(){
                cargarNota(notas.nota_k);
            });
    });
    socket.on('getNoticiaCategoria',function(notas){
        $("#notaCategoria").append( notas.nota );
        $(".foto_contenido").remove();
        $("#nota_cat_"+notas.nota_k).bind("click",function(){
                cargarNota(notas.nota_k);
            });
        
    });
    socket.on("notaConsultada",function(datos){
        $("#notaConsulta").append(datos.nota);
        socket.emit(sendComentarios,datos_usuario);
    });
    socket.on('setParticipantes',function(datos){
        db.transaction(function(tx) {
            tx.executeSql("UPDATE participantes SET transferido=?,movil_k=? where participante_k=? ",[1,datos.movil_k,datos.participante_k],
              function() {
                texto="Registro de participante actualizado, nombre: "+nombre+" apellido: "+apellido;
                alertas.contenido=texto;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
              },function(error) {
                alertas.contenido="UPDATE Participante error: " + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
                texto='<span class="imixio" style="color:#ff0000"> UPDATE Participante error: ' + error.message+'</span>';
              });
            logs();  
        });
    });
    socket.on('cargarParticipantes',function(data){      
        db.transaction(function(tx) {  
                tx.executeSql("INSERT INTO participantes(nombre,apellido,genero,identificacion,fecha_nacimiento,nacionalidad,telefono,email,direccion,estado_civil,observaciones,estado_fisiologico,conyugue,desendientes,id_grupo,dir_foto,fecha_creacion,fecha_modificacion,id_tecnico,comunidad,transferido,movil_k) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                                            [data.nombre,     data.apellido,     data.genero,   data.identificacion, data.fecha_nacimiento,   data.nacionalidad,
                                                            data.telefono,    data.email,        data.direccion,data.estado_civil,   data.observaciones,      data.estado_fisiologico,
                                                            data.conyugue,    data.desendientes, data.id_grupo, data.dir_foto,       data.fecha_creacion,     data.fecha_modificacion,
                                                            data.id_tecnico,  data.comunidad,    1,             data.participante_k],
                  function(tx, resultSet) {
                    texto="Nuevo participante registrado, nombre: "+data.nombre+" apellido: "+data.apellido+",inserId: " + resultSet.insertId;
                    logs();
                  }, function(tx, error) {
                    texto='<span class="imixio" style="color:#ff0000"> INSERT participante error: ' + error.message+'</span>';
                    logs();
                  });
        }, function(err) {
            alertas.contenido='Insert database participantes ERROR: ' + JSON.stringify(err.message);
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
            texto='<span class="imixio" style="color:#ff0000"> Insert database participantes ERROR: ' + JSON.stringify(err.message)+'</span>';
            logs();
        });
        
    });
    socket.on('cargarGrupos',function(data){      
        db.transaction(function(tx) {  
                tx.executeSql("INSERT INTO grupos(nombre,grupo_server_k,id_tecnico) values(?,?,?)",[data.nombre,data.grupo_server_k,data.id_tecnico],
                  function(tx, resultSet) {
                    texto="Nuevo grupo registrado, nombre: "+data.nombre+",inserId: " + resultSet.insertId;
                    logs();
                  }, function(tx, error) {
                    texto='<span class="imixio" style="color:#ff0000"> INSERT grupo error: ' + error.message+'</span>';
                    logs();
                  });
        }, function(err) {
            alertas.contenido='Insert database grupos ERROR: ' + JSON.stringify(err.message);
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
            texto='<span class="imixio" style="color:#ff0000"> Insert database grupos ERROR: ' + JSON.stringify(err.message)+'</span>';
            logs();
        });
        actualizarGrupos();
    });
    socket.on('reciveMessage',function(value){      
       $("#coment-todos-ul_"+value.id_nota).append(value.comentario);
    });
    /*************  chat   **************************/
    $('.pushInfo').on('click', function() {        
        var scrollPos =  $("#nota3").offset().top;
        $('html,body' ).animate({
            scrollTop: scrollPos
          }, 1000, function() {
            //class="resaltarTexto"
            $("#accordion .resaltarTexto").removeClass("resaltarTexto");
            $("#nota3").addClass("resaltarTexto");
          });
    });
    $('.regresar').on('click', function() {        
        var scrollPos =  $("#info").offset().top;
        $('html,body' ).animate({
            scrollTop: scrollPos
          }, 1000, function() {
            //class="resaltarTexto"
            $("#accordion .resaltarTexto").removeClass("resaltarTexto");
            //$("#nota0").addClass("resaltarTexto");
          });
    });
    $("#desplegar").on('click',function(){
        $('#accordion .panel-collapse').collapse("toggle");
        var datos = {};
        datos.socketId=datos_usuario.socketId;
        datos.uuid=idDevice;
        datos.url     = "";
        datos.usuario = datos_usuario.usuario;
        datos.seccion = "Nota del Día";
        datos.prefix = datos_usuario.prefix;
        socket.emit('notaDia',datos);
        datos.urlCatego     = "";
        socket.emit('getCatego',datos);
        actualizarNotificaciones();
    });
    $("#guardarParticipante").on('click',function(){
        var idParticipante  =   document.getElementById("idParticipante").value;
        var nombre          =   document.getElementById("nombreParticipante").value;
        var apellido        =   document.getElementById("apellidoParticipante").value;
        var genero          =   document.getElementById("generoParticipante").value;
        var identificacion  =   document.getElementById("identidadParticipante").value;
        var nacimiento      =   document.getElementById("fechanacimientoParticipante").value;
        var nacionalidad    =   document.getElementById("nacionalidadParticipante").value;
        var telefono        =   document.getElementById("telefonoParticipante").value;  
        var email           =   document.getElementById("emailParticipante").value;
        var direccion       =   document.getElementById("direccionParticipante").value;
        var estado_civil    =   document.getElementById("estadocivilParticipante").value;
        var observaciones   =   document.getElementById("observacionesParticipante").value;
        var estado_fisico   =   "";//document.getElementById("estadofisicoParticipante").value;
        var conyugue        =   "";//document.getElementById("conyugueParticipante").value;
        var desendientes    =   "";//document.getElementById("desendientesParticipante").value;
        var grupo           =   document.getElementById("grupoParticipante").value;
        var dir_foto        =   "";//document.getElementById("nombreimagenParticipante").value;
        var comunidad       =   "";//document.getElementById("cargoUsuario").value;
        var id_tecnico  =   datos_usuario.identificacion;
        var hoy = fecha_hoyc;
     
        if(nombre!=="" && apellido!=="" && identificacion!==""){
            db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM participantes WHERE identificacion=? and borrado=0",[identificacion],function(tx, data) {
                    total_usuarios = data.rows.length;
                    if(total_usuarios == 0 && parseInt(idParticipante) == 0){
                        tx.executeSql("INSERT INTO participantes(nombre,apellido,genero,identificacion,fecha_nacimiento,nacionalidad,telefono,email,"+
                             "direccion,estado_civil,observaciones,estado_fisiologico,conyugue,desendientes,id_grupo,dir_foto,fecha_creacion,fecha_modificacion,id_tecnico,comunidad,transferido)"+
                             " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[nombre,apellido,genero,identificacion,nacimiento,nacionalidad,telefono,email,
                                                                           direccion,estado_civil,observaciones,estado_fisico,conyugue,desendientes,grupo,dir_foto,hoy,hoy,id_tecnico,comunidad,0],
                              function(tx, resultSet) {
                                document.getElementById("idParticipante").value=resultSet.insertId;
                                texto="Nuevo participante registrado, nombre: "+nombre+
                                        " apellido: "+apellido+
                                        ", inserId: " + resultSet.insertId+
                                        ", Lineas afectadas: " + resultSet.rowsAffected;
                                alertas.contenido="Se ha creado un nuevo registro ";
                                alertas.btnConfirma="No";
                                alertas.funcionConfirma="";
                                alertas.funcionCancela="";
                                alerta(alertas);
                              }, function(tx, error) {
                                alertas.contenido="INSERT Participante error: " + error.message;
                                alertas.btnConfirma="No";
                                alertas.funcionConfirma="";
                                alertas.funcionCancela="";
                                alerta(alertas);
                                texto='<span class="imixio" style="color:#ff0000"> INSERT participante error: ' + error.message+'</span>';
                              });
                    }else if(idParticipante != 0){
                            tx.executeSql("UPDATE participantes SET nombre=?,apellido=?,genero=?,identificacion=?,fecha_nacimiento=?,nacionalidad=?,telefono=?,email=?,direccion=?,estado_civil=?,observaciones=?,estado_fisiologico=?,conyugue=?, desendientes=?,id_grupo=?,dir_foto=?,fecha_modificacion=?,comunidad=?,transferido=? WHERE participante_k=?",[nombre,apellido,genero,identificacion,nacimiento,nacionalidad,telefono,email,direccion,estado_civil,observaciones,estado_fisico,conyugue,desendientes,grupo,dir_foto,hoy,comunidad,0,idParticipante],
                              function() {
                                texto="Participante actualizado, nombre: "+nombre+" apellido: "+apellido;
                                alertas.contenido=texto;
                                alertas.btnConfirma="No";
                                alertas.funcionConfirma="";
                                alertas.funcionCancela="";
                                alerta(alertas);
                              },function(error) {
                                alertas.contenido="UPDATE Participante error: " + error.message;
                                alertas.btnConfirma="No";
                                alertas.funcionConfirma="";
                                alertas.funcionCancela="";
                                alerta(alertas);
                                texto='<span class="imixio" style="color:#ff0000"> UPDATE Participante error: ' + error.message+'</span>';
                              });
                    }
                }, function(error) {
                    alertas.contenido='Validando id en BD de participantes ERROR: ' + error.message;
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                });

            }, function(err) {
                alertas.contenido='Insert database participantes ERROR: ' + JSON.stringify(err);
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
                texto='<span class="imixio" style="color:#ff0000"> Insert database participantes ERROR: ' + JSON.stringify(err)+'</span>';
            });    
        }else{
            document.getElementById("msjUsuario").innerHTML = '<span class="imixio"  style="color:#387ef5"> Mens: Faltan datos requeridos</span>';
            texto='<span class="imixio" style="color:#ff0000"> Faltan datos requeridos para guardar participante </span>';
            alertas.contenido="Faltan datos requeridos para guardar participante";
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        }
        logs();  
    });
    $("#nuevoParticipante").on('click',function(){
        document.getElementById("idParticipante").value=0;
        document.getElementById("nombreParticipante").value="";
        document.getElementById("apellidoParticipante").value="";
        document.getElementById("identidadParticipante").value="";
        document.getElementById("nacionalidadParticipante").value="";
        document.getElementById("telefonoParticipante").value="";  
        document.getElementById("emailParticipante").value="";
        document.getElementById("direccionParticipante").value="";
        document.getElementById("observacionesParticipante").value="";
    });
    function cargarParticipantes(value){
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM participantes WHERE participante_k=?",[value],function(tx, data) {
                total_usuarios = data.rows.length;
                for(var i = 0; i < data.rows.length; i++){
                    document.getElementById("idParticipante").value=data.rows.item(i).participante_k;
                    document.getElementById("nombreParticipante").value=data.rows.item(i).nombre;
                    document.getElementById("apellidoParticipante").value=data.rows.item(i).apellido;
                    document.getElementById("generoParticipante").value=data.rows.item(i).genero;
                    document.getElementById("identidadParticipante").value=data.rows.item(i).identificacion;
                    document.getElementById("fechanacimientoParticipante").value=data.rows.item(i).nacimiento;
                    document.getElementById("nacionalidadParticipante").value=data.rows.item(i).nacionalidad;
                    document.getElementById("telefonoParticipante").value=data.rows.item(i).telefono;  
                    document.getElementById("emailParticipante").value=data.rows.item(i).email;
                    document.getElementById("direccionParticipante").value=data.rows.item(i).direccion;
                    document.getElementById("estadocivilParticipante").value=data.rows.item(i).estado_civil;
                    document.getElementById("observacionesParticipante").value=data.rows.item(i).observaciones;
                    document.getElementById("grupoParticipante").value=data.rows.item(i).id_grupo;
                    $('#grupoParticipante').selectmenu('refresh', true);
                    $('#generoParticipante').selectmenu('refresh', true);
                    $('#estadocivilParticipante').selectmenu('refresh', true);
                }
            },function(tx,error){
                alertas.contenido='Cargando datos Participantes ERROR: ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
            });
        });
    }
    function cargarGrupos(value){
        var id = value.substring(2);
        //$("#grupoParticipante").empty();
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM grupos WHERE grupo_k=?",[id],function(tx, data) {
                total_usuarios = data.rows.length;
                for(var i = 0; i < data.rows.length; i++){
                    document.getElementById("idGrupo").value=data.rows.item(i).grupo_k;
                    document.getElementById("nombreGrupo").value=data.rows.item(i).nombre;
                    grupo_select = "<option value='"+resultSet.rows.item(i).nombre+"'>" + resultSet.rows.item(i).nombre +"</option>";
                    /*$("#grupoParticipante").append(grupo_select);
                    $('#grupoParticipante').selectmenu('refresh', true);*/
                }
            },function(tx,error){
                alertas.contenido='Cargando datos Grupos ERROR: ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
            });
        });
    }
    function listaDeParticipantes(){
        $("#participantesRegistrados").empty();
        var participantes=""
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM participantes order by nombre asc",[],function(tx, data) {
                total_participantes = data.rows.length;
                var participantes = "";
                if(total_participantes !== 0 ){
                    for(var i = 0; i < data.rows.length; i++){
                        participantes = '<li id="'+data.rows.item(i).participante_k+'" class="userLink tel '+data.rows.item(i).nombre.toProperCase()+'" data-link="'+data.rows.item(i).nombre+'"><img src="./images/chat/imix-36.png">'+
                            '<div class="content-container">'+
                                '<span class="name"><a href="tel:'+data.rows.item(i).telefono+'">'+data.rows.item(i).telefono+'</a></span>'+
                                '<span class="phone">'+data.rows.item(i).nombre+' '+data.rows.item(i).apellido+'</span>'+
                                '<span class="meta">'+data.rows.item(i).email+'</span>'+
                            '</div>'+
                            '<span class="time">'+
                                data.rows.item(i).fecha_nacimiento+
                            '</span>'+
                        '</li>';
                        //document.getElementById("participantesRegistrados").innerHTML=participantes;
                        $("#participantesRegistrados").append(participantes);
                        $("#"+data.rows.item(i).participante_k).bind("click",function(){
                            cargarParticipantes($(this).attr("id"));
                        });
                    }                
                }else{
                    participantes = "<li class='lista_li'><a>No hay registro de participantes</a></li>"
                    document.getElementById("participantesRegistrados").innerHTML=participantes;
                    $(".lista_li").css({
                         "float": "left",
                         "width": "100%",
                         "border-bottom": "1px solid white"
                     });
                    $(".lista_li_text").css({
                        "display": "block",
                        "color": "white",
                        "text-align": "left",
                        "padding": "16px",
                        "text-decoration": "none",
                        "text-shadow": "none",
                         "width": "100%"
                    });       
                    var seleccion_si_server = confirm("¿Desea buscar registros en el servidor?");
                    if(seleccion_si_server===true){
                        socket.emit("buscarParticipantes",datos_usuario);
                    }
                }
                actualizarGrupos();
            }, function(error) {
                alertas.contenido='Transaction inicio Participantes ERROR: ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
            });
        });
    }
    $(document).on("pageshow","#listaParticipantes",function(){
        listaDeParticipantes();
    });
    $(document).on("pageshow","#listaGrupos",function(){
        actualizarGrupos();
    });
    $("#editarParticiante").on('click',function(){
        document.location.href = "#participante";
    });
    $('.search-filter-participantes').on('keyup', function() {
        var filter = $(this).val();
        $('.lista_Participantes .list > li').filter(function() {
            var regex = new RegExp(filter, 'ig');

            if (regex.test($(this).text())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $( "#popupPanel" ).on({
        popupbeforeposition: function() {
            var h = $( window ).height();
            $( "#popupPanel" ).css( "height", h );
        }
    });
    function actualizarGrupos(){
       db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM grupos where borrado=0 order by nombre asc",[],function(tx, data) {
                var total_grupos = data.rows.length;
                var grupos = "";
                var grupo_select = "";
                if(total_grupos !== 0 ){  
                    $("#listaGrupo").empty();
                    $("#grupoParticipante").empty();
                    for(var i = 0; i < data.rows.length; i++){
                        grupos = '<li id="g-'+data.rows.item(i).grupo_k+'" class="userLink tel" data-link="">'+
                            '<div class="content-container">'+
                                '<span class="name"><a href="">'+data.rows.item(i).nombre+'</a></span>'+
                                '<span class="phone"></span>'+
                                '<span class="meta"></span>'+
                            '</div>'+
                            '<span class="time">'+
                            '</span>'+
                        '</li>';
                        
                        grupo_select = "<option value='"+data.rows.item(i).grupo_k+"'>" + data.rows.item(i).nombre +"</option>";
                        
                        $("#listaGrupo").append(grupos);
                        $("#grupoParticipante").append(grupo_select);
                        $("#g-"+data.rows.item(i).grupo_k).bind("click",function(){
                            cargarGrupos($(this).attr("id"));
                        });
                    }                
                }else{
                    grupos = "<li class='lista_li'><a>No hay registro de grupos</a></li>"
                    document.getElementById("listaGrupo").innerHTML=grupos;
                    $(".lista_li").css({
                         "float": "left",
                         "width": "100%",
                         "border-bottom": "1px solid white"
                     });
                    $(".lista_li_text").css({
                        "display": "block",
                        "color": "white",
                        "text-align": "left",
                        "padding": "16px",
                        "text-decoration": "none",
                        "text-shadow": "none",
                         "width": "100%"
                    });       
                    var seleccion_si_server = confirm("¿Desea buscar registros en el servidor?");
                    if(seleccion_si_server===true){
                        socket.emit("buscarGrupos",datos_usuario);
                    }
                }
                
            }, function(error) {
                alertas.contenido='Transaction grupos ERROR: ' + error.message;
                alertas.btnConfirma="No";
                alertas.funcionConfirma="";
                alertas.funcionCancela="";
                alerta(alertas);
            });
        }); 
    }
    $("#btnGuardarGrupo").on('click',function(){
        var idGrupo = document.getElementById("idGrupo").value;
        var nombreGrupo = document.getElementById("nombreGrupo").value;
        
        db.transaction(function(tx) {
            if(parseInt(idGrupo)===0){
                tx.executeSql("INSERT INTO grupos(nombre,id_tecnico) VALUES(?,?)",[nombreGrupo,datos_usuario.identificacion],
                function(tx, resultSet) {
                    document.getElementById("idGrupo").value=resultSet.insertId;
                    texto="Nuevo grupo registrado, nombre: "+nombreGrupo+
                            ", inserId: " + resultSet.insertId+
                            ", Lineas afectadas: " + resultSet.rowsAffected;
                    alertas.contenido="Se ha creado un nuevo registro: "+nombreGrupo;
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    logs();
                    
                }, function(tx, error) {
                    texto = '<span class="imixio" style="color:#ff0000">Transaction insertar grupo ERROR: ' + error.message+' </span>';
                    alertas.contenido='Transaction insertar grupo ERROR: ' + error.message;
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    logs();
                });
            }else{
                tx.executeSql("UPDATE grupos set nombre=?,transferido=?",[nombreGrupo,0],
                    function(){
                        texto='<span class="imixio" style="color:#387ef5"> Se han actualizado los valores del grupo: </span>' + nombreGrupo;  
                        actualizarGrupos();
                    }, function(err) {
                    alertas.contenido='Actualizar grupo ERROR: ' + JSON.stringify(err.message);
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    texto='<span class="imixio" style="color:#ff0000"> Actualizar grupo ERROR: ' + JSON.stringify(err.message)+' </span>';
                    logs();
                });
            }
            actualizarGrupos();
        }, function(error) {
            texto = 'Transaction insertar grupo ERROR: ' + error.message;
            alertas.contenido='Transaction insertar grupo ERROR: ' + error.message;
            alertas.btnConfirma="No";
            alertas.funcionConfirma="";
            alertas.funcionCancela="";
            alerta(alertas);
        });
        
    });
    $("#btnBorrarGrupo").on('click',function(){
        var idGrupo = $("#idGrupo").val();
        var nombreGrupo = $("#nombreGrupo").val();        
        db.transaction(function(tx) {
            if(idGrupo===0){
                 db.transaction(function(tx) {
                    tx.executeSql("UPDATE grupos SET nombre=?,borrado=?",[nombreGrupo,1],
                    function(){
                        texto='<span class="imixio" style="color:#387ef5"> Se han borrado los valores del grupo: </span>' + nombre;  
                        actualizarGrupos();
                    },null);
                }, function(err) {
                    alertas.contenido='Borrar grupo ERROR: ' + JSON.stringify(err.message);
                    alertas.btnConfirma="No";
                    alertas.funcionConfirma="";
                    alertas.funcionCancela="";
                    alerta(alertas);
                    texto='<span class="imixio" style="color:#ff0000"> Borrar grupo ERROR: ' + JSON.stringify(err.message)+' </span>';
                });
            }
            logs();
        });
    });                       
}
document.addEventListener("app.Ready", onAppReady, false);