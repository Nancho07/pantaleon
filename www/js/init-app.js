window.app = window.app || {} ;    
var coneccion=0;
var conectado = "No hay coneccion";
var name = '',
    text = '',
    mensajes = '',
    roster = [],
    foto='',
    datos_tecnicos = [],
    datos_usuario = {},
    datos_conyugue={},
    socket,
    total_usuarios=0,
    db = null,
    texto="",
    cad="",
    fecha_hoyc="",
    fecha_de_hoy="",
    tokenID = "",
    idDevice="",
    recargar,
    networkState;
    datos_usuario.prefix="rse",
    alertas={};
    $.getJSON("http://freegeoip.net/json/", function (data) {
		 datos_usuario.country = data.country_name;
		 datos_usuario.ip = data.ip;
		 datos_usuario.region = data.region_name;
		 datos_usuario.city = data.city;
		 datos_usuario.latitud = data.latitud;
		 datos_usuario.longitud = data.longitud;
		});
var salon = {};

app.LOG = app.LOG || false ;
app.consoleLog = function() {
    if( app.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
} ;

app.initEvents = function() {
    cordova.plugins.backgroundMode.setDefaults({ text:'Doing heavy tasks.'});
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.onactivate = function () {
        setTimeout(function () {
            cordova.plugins.backgroundMode.configure({
                text:'La aplicación Pantaleón se ejecuta en modo reposo.',
                silent: false
            });
        }, 5000);
    };
    //"use strict" ;
    var fName = "app.initEvents():" ;
    app.consoleLog(fName, "entry") ;
    
    app.initDebug() ;
    app.hideSplashScreen() ; 
    //app.validarConeccion();
    app.consoleLog(fName, "exit") ;
};
document.addEventListener("app.Ready", app.initEvents, false) ;
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

function alerta(alertas){
    if(alertas.btnConfirma=="Si"){
        $.confirm({
            title: 'Mensaje:',
            content: alertas.contenido,
            icon: 'fa fa-question-circle',
            animation: 'scale',
            closeAnimation: 'scale',
            opacity: 0.5,
            buttons:{
                confirm:{
                    text: "Aceptar",
                    btnClass: 'btn-warning',
                    action: function(){
                        alertas.funcionConfirma;
                    }
                },
                cancel: function(){
                    alertas.funcionCancela;
                }
            }
        });
    }else if(alertas.btnConfirma=="No"){
        $.confirm({
            title: 'Mensaje:',
            content: alertas.contenido,
            icon: 'fa fa-question-circle',
            animation: 'scale',
            closeAnimation: 'scale',
            opacity: 0.5,
            buttons:{
                cancel: function(){
                    alertas.funcionCancela;
                }
            }
        });
    }
}

function onConfirmOff(buttonIndex) {
    conectado = "No hay coneccion";    
    $(".btnSenal0").attr("src","images/senal0.png");
    $(".btnSenal1").attr("src","images/senal0.png");
} 
function onOffline() {
    coneccion=0;
   /* navigator.notification.confirm(
        'lost connection!', // message
         onConfirmOff,            // callback to invoke with index of button pressed
        'Pantaleon',           // title
        ['Local','Salir']     // buttonLabels
    );*/
    alertas.contenido="No hay conección";
    alertas.btnConfirma="No";
    alertas.funcionConfirma=onConfirmOff();
    alertas.funcionCancela="";
    alerta(alertas);
}

function automatizar(){
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
}
/***************** No es imperativo esta en prueba ****************
function require(script) {
    $.ajax({
        url: script,
        dataType: "script",
        async: false,           // <-- This is the key
        success: function () {
            socket = io.connect("https://imix-io-imixhn.c9users.io");    
            socket.on('connect', function (id) { 
                if(id !== undefined){                
                    datos_usuario.socketId=id;
                    if(coneccion===0){
                        coneccion=1;
                        automatizar();
                    }
                }
            }); 
        },
        error: function () {
            throw new Error("No se ha cargado el script " + script);
        }
    });
}
function includeJs(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
}
*******************************************************************/
function onOnline() {
    networkState = navigator.connection.type;
    conectado = navigator.connection.type;
    app.validarConeccion();    
    socket = io.connect("https://imix-io-imixhn.c9users.io");    
    socket.on('connect', function (id) { 
        if(id !== undefined){                
            datos_usuario.socketId=id;
            if(coneccion===0){
                coneccion=1;
                automatizar();
            }
        }
    });   
}

app.initDebug = function() {
    "use strict" ;
    var fName = "app.initDebug():" ;
    app.consoleLog(fName, "entry") ;
    if( window.device && device.cordova ) {                     
        app.consoleLog("device.version: " + device.cordova) ;   
        app.consoleLog("device.model: " + device.model) ;
        app.consoleLog("device.platform: " + device.platform) ;
        app.consoleLog("device.version: " + device.version) ;
    }
    
    if( window.cordova && cordova.version ) {                   
        app.consoleLog("cordova.version: " + cordova.version) ; 
        if( cordova.require ) {                                 
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1)) ;
        }
    }
    app.consoleLog(fName, "exit") ;
};

app.hideSplashScreen = function() {
    "use strict" ;
    var fName = "app.hideSplashScreen():" ;
    app.consoleLog(fName, "entry") ;
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   
        navigator.splashscreen.hide() ;
    }
    if( window.intel && intel.xdk && intel.xdk.device ) {          
        if( intel.xdk.device.hideSplashScreen ) {                   
            intel.xdk.device.hideSplashScreen() ;
        }
    }
    app.consoleLog(fName, "exit") ;
} ;

app.validarConeccion = function(){
    if(conectado !== "No hay coneccion" && conectado!==undefined){
        var downloadSize = 244736;
        var imageAddr = "http://farm6.static.flickr.com/5035/5802797131_a729dac808_b.jpg" + "?n=" + Math.random();
        var startTime, endTime = 0;
        var download = new Image();        
        startTime = new Date().getTime();
        download.src = imageAddr;        
        download.onload = function () {
            endTime = new Date().getTime();
            showResults(startTime, endTime, imageAddr, downloadSize);
        };
        function showResults(startTime, endTime, imageAddr, downloadSize) {            
            var duration = (endTime - startTime) / 1000; //Math.round(), 
            var bitsLoaded = downloadSize * 8;
            var speedBps = (bitsLoaded / duration).toFixed(2);
            var speedKbps = (speedBps / 1024).toFixed(2);
            var finalSpeed = (speedKbps/10);
            if(finalSpeed > 1 && finalSpeed < 20){
                $(".btnSenal0").attr("src","images/senal1.png");
                $(".btnSenal1").attr("src","images/senal1.png");
            } else if(finalSpeed >= 20  && finalSpeed < 40){
                $(".btnSenal0").attr("src","images/senal2.png");
                $(".btnSenal1").attr("src","images/senal2.png");
            } else if(finalSpeed >= 40  && finalSpeed < 60){
                $(".btnSenal0").attr("src","images/senal3.png");
                $(".btnSenal1").attr("src","images/senal3.png");
            } else if(finalSpeed >= 60  && finalSpeed < 80){
                $(".btnSenal0").attr("src","images/senal4.png");
                $(".btnSenal1").attr("src","images/senal4.png");
            } else if(finalSpeed >= 80){
                $(".btnSenal0").attr("src","images/senal5.png");
                $(".btnSenal1").attr("src","images/senal5.png");
            }
        }
        showResults();
    }
};

app.cargarDatos = function() {
    "use strict" ;
    var fName = "app.cargarDatos():";
    app.consoleLog(fName, "exit") ;
};