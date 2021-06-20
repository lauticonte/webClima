var bearer = '';
var token = '';


//VER LA OPCION SELECCIONADA
$(document).ready(() =>{
    $('#api1').show(); //muestro mediante id
    $('#graf').hide();
    $('#api2').hide();

    $('#mostrarHome').click(function(){
        $('#graf').show(500); //muestro mediante id
        $('#api').hide();
        $('#api2').hide();
    });
    $('#mostrarApi').click(function(){
        $('#api').show(500); //muestro mediante id
        $('#graf').hide();
        $('#api2').hide();
    });
    $('#mostrarApi2').click(function(){
        $('#api2').show(500); //muestro mediante id
        $('#graf').hide();
        $('#api').hide();
    });
});


//API CLIMA

$(document).ready(function(){

    $.ajax({
    url: "http://192.168.1.96:1337/auth/local",
    method: "POST",
    data: {
        identifier: 'api-user@example.com',
        password: '123456'
    },
    success: function(response) {
        console.log(response);
        token = response.jwt;
        clima(response);
        strapi(response);
        graficos(response);

        
    },
    error: function(req, status, err) {
        
    }
    });

});


//CLIMA

function clima(clima){
    
    var html = ' <label for=""><h1>Clima en su ubicación: </h1></label> <br> <fieldset id="buscador"><select name="zona" id="zona"> <option value="">Selecciona una zona...</option><option value="468739" selected>Buenos Aires, Argentina</option> <option value="455819">Brasilia, Brasil</option> <option value="349859">Santiago, Chile</option> <option value="2459115">Nueva York, EEUU</option> <option value="2450022">Miami, EEUU</option> <option value="2514815">Washington DC, EEUU</option><option value="2442047">Los Angeles, EEUU</option><option value="2436704">Las Vegas, EEUU</option><option value="2367105">Boston, EEUU</option><option value="116545">Mexico city, Mexico</option><option value="44418">Londres, Inglaterra</option><option value="766273">Madrid, Espana</option><option value="721943">Roma, Italia</option><option value="615702">Paris, Francia</option><option value="638242">Berlin, Alemania</option></select><button id="btnBuscar" onclick="listarClima()" ><i class="fas fa-search"></i></button></fieldset>';

    $("#clima").html(html);
    listarClima();
}


function listarClima(){
    var idZona = document.getElementById("zona").value;
    console.log(idZona);

    $.ajax({
        url: "https://fierce-lake-96143.herokuapp.com/https://www.metaweather.com/api/location/"+idZona,
        method: "GET",
        dataType: "json",
        success: function(response){
            console.log(response);
            var clima = '';
            var dia = response.time.split("T");
            var hora = dia[1].split(".");
            var img = '';
            switch(response.consolidated_weather[0].weather_state_abbr){
                case 'hc':
                    img = 'https://www.metaweather.com/static/img/weather/hc.svg';
                    clima = 'Muy Nublado';
                    break;
                case 'sn':
                    img = 'https://www.metaweather.com/static/img/weather/sn.svg';
                    clima = 'Nieve';
                    break;
                case 'sl':
                    img = 'https://www.metaweather.com/static/img/weather/sl.svg';
                    clima = 'AguaNieve';
                    break;
                case 'h':
                    img = 'https://www.metaweather.com/static/img/weather/h.svg';
                    clima = 'Granizo';
                    break;
                case 't':
                    img = 'https://www.metaweather.com/static/img/weather/t.svg';
                    clima = 'Tormenta';
                    break;
                case 'hr':
                    img = 'https://www.metaweather.com/static/img/weather/hr.svg';
                    clima = 'Fuerte Lluvia';
                    break;
                case 's':
                    img = 'https://www.metaweather.com/static/img/weather/s.svg';
                    clima = 'Llovizna';
                    break;
                case 'lr':
                    img = 'https://www.metaweather.com/static/img/weather/lr.svg';
                    clima = 'Debil Lluvia';
                    break;
                case 'lc':
                    img = 'https://www.metaweather.com/static/img/weather/lc.svg';
                    clima = 'Poco Nublado';
                    break;
                case 'c':
                    img = 'https://www.metaweather.com/static/img/weather/c.svg';
                    clima = 'Despejado';
                    break;
                default:
                    clima = 'Incognita';
                    break;
            }

                var html = '<label for=""><h1>Clima en su ubicación: </h1></label> <br> <fieldset id="buscador"><select name="zona" id="zona"> <option value="">Selecciona una zona...</option><option value="468739">Buenos Aires, Argentina</option> <option value="455819">Brasilia, Brasil</option> <option value="349859">Santiago, Chile</option> <option value="2459115">Nueva York, EEUU</option> <option value="2450022">Miami, EEUU</option> <option value="2514815">Washington DC, EEUU</option><option value="2442047">Los Angeles, EEUU</option><option value="2436704">Las Vegas, EEUU</option><option value="2367105">Boston, EEUU</option><option value="116545">Mexico city, Mexico</option><option value="44418">Londres, Inglaterra</option><option value="766273">Madrid, Espana</option><option value="721943">Roma, Italia</option><option value="615702">Paris, Francia</option><option value="638242">Berlin, Alemania</option></select><button id="btnBuscar" onclick="listarClima()" ><i class="fas fa-search"></i></button></fieldset> <br><br><div class="card"> <div class="relleno"> Tiempo en ' + response.parent.title +', '+ response.title + '<br><h4 class="hora"> A las ' + hora[0] + '</h4><div class="medio"> <h2 class="tMax">'+ Math.round(response.consolidated_weather[0].max_temp) +'°</h2> <img class="foto" src="'+img+'"> </div> <h2 class="cli">'+clima+'</h2> <br> <h4 class="hum">'+ response.consolidated_weather[0].humidity+'% de humedad</h4> </div> </div>';

                $("#clima").html(html);
        },
        error: function(req, status, err){
            console.log(req, status, err);
        }
 });
}


//STRAPI

function strapi(strapi){
        var html = '<label for=""><h1>Agrega un lugar a Strapi:</h1><br></label><br><label class="labelFecha">Fecha: </label><select id="fechaSelect" class="btnFecha"></select><br> <fieldset id="buscador"><select name="zona" id="choiceStrapi"> <option value="">Selecciona una zona...</option><option value="468739">Buenos Aires, Argentina</option> <option value="455819">Brasilia, Brasil</option> <option value="349859">Santiago, Chile</option> <option value="2459115">Nueva York, EEUU</option> <option value="2450022">Miami, EEUU</option> <option value="2514815">Washington DC, EEUU</option><option value="2442047">Los Angeles, EEUU</option><option value="2436704">Las Vegas, EEUU</option><option value="2367105">Boston, EEUU</option><option value="116545">Mexico city, Mexico</option><option value="44418">Londres, Inglaterra</option><option value="766273">Madrid, Espana</option><option value="721943">Roma, Italia</option><option value="615702">Paris, Francia</option><option value="638242">Berlin, Alemania</option></select><button id="btnBuscar" class="tipoBlanca" onclick="obtenerLugar()" >Cargar</button></fieldset><br><br><br><button class="btnAzul" onclick="verCargados()">Ver lugares cargados</button>';
        llenarSelectFecha();
        $("#strapi").html(html);
}


function llenarSelectFecha(){
    $.ajax({
        //468739 es Argentina
        url: "https://fierce-lake-96143.herokuapp.com/https://www.metaweather.com/api/location/468739",
        method: "GET",
        dataType: "json",
        success: function(response){
            //console.log(response);
            var dia = [];
            for (var i = 0; i < 6; i++) {
                dia.push(response.consolidated_weather[i].applicable_date);
            }
            //console.log(dia);
            var selector = document.getElementById("fechaSelect");
            for (i in dia) {
                selector.options[i] = new Option(dia[i],dia[i]);
                //console.log(selector.options[i].value);
            };
        },
        error: function(req, status, err){
            console.log(req, status, err);
        }
});
}


function cargarClima(res, dia, clima, img, tempMax, tempMin){
    $.ajax({
        url: "http://192.168.1.96:1337/lugars",
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            nombre: res.title+'  ('+dia+')',
            tempMax: Math.round(tempMax),
            tempMin: Math.round(tempMin),
            fecha: dia,
            clima: clima,
            foto: img
        },
        dataType: "json",
        success: function(response) {
            //console.log(response);
        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}


function obtenerLugar(){
    var idZona = document.getElementById("choiceStrapi").value;
    var dia = document.getElementById("fechaSelect").value;

    $.ajax({
        url: "https://fierce-lake-96143.herokuapp.com/https://www.metaweather.com/api/location/"+idZona,
        method: "GET",
        dataType: "json",
        success: function(response){
            //console.log(response);
            var clima = '';
            var img = '';
            var tempMax = 0;
            var tempMax = 0;
            for (i in response.consolidated_weather){
                if (response.consolidated_weather[i].applicable_date == dia){
                    switch(response.consolidated_weather[i].weather_state_abbr){
                    case 'hc':
                        img = 'https://www.metaweather.com/static/img/weather/hc.svg';
                        clima = 'Muy Nublado';
                        break;
                    case 'sn':
                        img = 'https://www.metaweather.com/static/img/weather/sn.svg';
                        clima = 'Nieve';
                        break;
                    case 'sl':
                        img = 'https://www.metaweather.com/static/img/weather/sl.svg';
                        clima = 'AguaNieve';
                        break;
                    case 'h':
                        img = 'https://www.metaweather.com/static/img/weather/h.svg';
                        clima = 'Granizo';
                        break;
                    case 't':
                        img = 'https://www.metaweather.com/static/img/weather/t.svg';
                        clima = 'Tormenta';
                        break;
                    case 'hr':
                        img = 'https://www.metaweather.com/static/img/weather/hr.svg';
                        clima = 'Fuerte Lluvia';
                        break;
                    case 's':
                        img = 'https://www.metaweather.com/static/img/weather/s.svg';
                        clima = 'Llovizna';
                        break;
                    case 'lr':
                        img = 'https://www.metaweather.com/static/img/weather/lr.svg';
                        clima = 'Debil Lluvia';
                        break;
                    case 'lc':
                        img = 'https://www.metaweather.com/static/img/weather/lc.svg';
                        clima = 'Poco Nublado';
                        break;
                    case 'c':
                        img = 'https://www.metaweather.com/static/img/weather/c.svg';
                        clima = 'Despejado';
                        break;
                    default:
                        clima = 'Incognita';
                        break;
                    }
                    tempMax = response.consolidated_weather[i].max_temp;
                    tempMin = response.consolidated_weather[i].min_temp;
                }
            }
                //console.log('Datos del lugar a cargar: '+tempMin+', '+tempMax+', '+dia+', '+img+', '+clima+', '+response.title);
                cargarClima(response, dia, clima, img, tempMax, tempMin);
                var html = 'Lugar cargado &#9989 <br><br> <button class="btnAzul" onclick="verCargados()">Ver lugares cargados</button> <br><br> <label for="">Agrega otro: <br></label><br><label>Fecha: </label><select id="fechaSelect" class="btnFecha"></select><br> <fieldset id="buscador"><select name="zona" id="choiceStrapi"> <option value="">Selecciona una zona...</option><option value="468739">Buenos Aires, Argentina</option> <option value="455819">Brasilia, Brasil</option> <option value="349859">Santiago, Chile</option> <option value="2459115">Nueva York, EEUU</option> <option value="2450022">Miami, EEUU</option> <option value="2514815">Washington DC, EEUU</option><option value="2442047">Los Angeles, EEUU</option><option value="2436704">Las Vegas, EEUU</option><option value="2367105">Boston, EEUU</option><option value="116545">Mexico city, Mexico</option><option value="44418">Londres, Inglaterra</option><option value="766273">Madrid, Espana</option><option value="721943">Roma, Italia</option><option value="615702">Paris, Francia</option><option value="638242">Berlin, Alemania</option></select><button id="btnBuscar" class="tipoBlanca" onclick="obtenerLugar()" >Cargar</button></fieldset>';
                llenarSelectFecha();
                $("#strapi").html(html);

        },
        error: function(req, status, err){
            console.log(req, status, err);
            var html = 'No se ha podido cargar el lugar seleccionado <br><br><br><button class="btnAzul" onclick="verCargados()">Ver lugares cargados</button> <br><br> <label for="">Agrega otro!</label> <br><label>Fecha: </label><select id="fechaSelect" class="btnFecha"></select><br> <fieldset id="buscador"><select name="zona" id="choiceStrapi"> <option value="">Selecciona una zona...</option><option value="468739">Buenos Aires, Argentina</option> <option value="455819">Brasilia, Brasil</option> <option value="349859">Santiago, Chile</option> <option value="2459115">Nueva York, EEUU</option> <option value="2450022">Miami, EEUU</option> <option value="2514815">Washington DC, EEUU</option><option value="2442047">Los Angeles, EEUU</option><option value="2436704">Las Vegas, EEUU</option><option value="2367105">Boston, EEUU</option><option value="116545">Mexico city, Mexico</option><option value="44418">Londres, Inglaterra</option><option value="766273">Madrid, Espana</option><option value="721943">Roma, Italia</option><option value="615702">Paris, Francia</option><option value="638242">Berlin, Alemania</option></select><button id="btnBuscar" class="tipoBlanca" onclick="obtenerLugar()" >Cargar</button></fieldset>';
            llenarSelectFecha();
            $("#strapi").html(html);
        }
    });
}


function getLugares(){
    $.ajax({
        url: "http://192.168.1.96:1337/lugars",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {
            //console.log(response);
            
            response.sort(function (a,b){
                if (b.nombre > a.nombre) {
                    return -1;
                }
                if (a.nombre > b.nombre) {
                    return 1;
                }
                return 0;
            });

            var selector = document.getElementById("datosStrapi");

            for (i in response) {
                selector.options[i] = new Option(response[i].nombre,response[i].nombre);
            };

            
        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}


function verCargados(){
    var html = '<label for="">Lugares cargados en Strapi:</label> <br> <fieldset id="buscador"><select name="zona" id="datosStrapi"> </select><button class="tipoBlanca" id="btnBuscar" onclick="eliminarStrapi()" >Borrar</button></fieldset> <br><br> <button class="btnAzul" onclick="strapi()">Agregar otro</button>';
    getLugares();
    $("#strapi").html(html);
}

function eliminarStrapi(){
    $.ajax({
        url: "http://192.168.1.96:1337/lugars",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {
            //console.log(response);

            var nom = document.getElementById("datosStrapi").value;

            for (i in response){
                if (response[i].nombre == nom){
                    var id = response[i].id;
                }
            }

            eliminarLugares(id);

        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}

function eliminarLugares(id){
    $.ajax({
        url: "http://192.168.1.96:1337/lugars/"+id,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {
            console.log("Borrado id: "+id);
            verCargados();
        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}

//GRAFICOS
function graficos(){
    google.charts.load('current', {'packages':['bar']});
    var html =  '<div class="divBotonesGrafico"><div class="botonStrapitodos"><button id="compTempTodas" class="btnAzul" onclick="graficoTodos()">Comparar todas las Temperaturas</button></div><br> <div class="divBotonesGrafico"><button id="compTempT" class="btnAzul" onclick="graficoBs()">Comparar temperaturas Buenos Aires</button><br> <div id="dibujarGraficos"><br><br><button id="dibujarGrafico" class="btnAzul" onclick="dibujar(data, options)">Dibujar</button></div>';
    $("#frases").html(html);

}

var data = [];
var options = '';


function graficoTodos(){
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(dibujar);
    $.ajax({
        url: "http://192.168.1.96:1337/lugars",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {

            var arrayData = [['Lugar', 'Maxima', 'Minima']];

            for (i in response){
                arrayData.push([response[i].nombre, response[i].tempMax, response[i].tempMin]);
            }
            
            data = google.visualization.arrayToDataTable(arrayData);

            options = {
                chart: {
                    title: 'Comparacion de Temperaturas (TODAS)',
                    subtitle: 'Maxima y Minima de cada lugar cargado',
                },
                bars: 'horizontal'
            };

            var html = '<div class="divBotonesGrafico"><div class="botonStrapitodos"><button id="compTempTodas" class="btnAzul" onclick="graficoTodos()">Comparar todas las Temperaturas</button></div><br> <div class="divBotonesGrafico"><button id="compTempT" class="btnAzul" onclick="graficoBs()">Comparar temperaturas Buenos Aires</button><br> <div id="dibujarGraficos"><br><br><button id="dibujarGrafico" class="btnAccept" onclick="dibujar(data, options)">Dibujar</button></div>';
            $("#frases").html(html);

        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}


function graficoBs(){
    google.charts.load('current', {'packages':['bar']});
    google.charts.setOnLoadCallback(dibujarArea);
    $.ajax({
        url: "http://192.168.1.96:1337/lugars",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {
            //Ordeno por nombre (por ende por fecha)
            response.sort(function (a,b){
                if (b.nombre > a.nombre) {
                    return -1;
                }
                if (a.nombre > b.nombre) {
                    return 1;
                }
                return 0;
            });

            //Cargo los datos en un arreglo
            var arrayData = [['Lugar', 'Maxima', 'Minima']];

            for (i in response){
                if (response[i].nombre.includes('Buenos Aires')){
                    console.log(response[i].nombre.includes('Buenos Aires'));
                    arrayData.push([response[i].nombre, response[i].tempMax, response[i].tempMin]);
                }
            }
            
            data = google.visualization.arrayToDataTable(arrayData);
        
            options = {
                chart: {
                    title: 'Comparacion de Temperaturas historicas (Buenos Aires)',
                    subtitle: 'Maxima y Minima de cada dia cargado',
                }
            };

            var html = '<div class="divBotonesGrafico"><div class="botonStrapitodos"><button id="compTempTodas" class="btnAzul" onclick="graficoTodos()">Comparar todas las Temperaturas</button></div><br> <div class="divBotonesGrafico"><button id="compTempT" class="btnAzul" onclick="graficoBs()">Comparar temperaturas Buenos Aires</button><br> <div id="dibujarGraficos"><br><br><button id="dibujarGrafico" class="btnAccept" onclick="dibujarArea(data, options)">Dibujar</button></div>';
            getLugares();
            $("#frases").html(html);

        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}



function error(){
    alert("No ha seleccionado ningun grafico.");
}




function dibujar(data, options){
    google.charts.load('current', {'packages':['bar']});
    console.log(data);
    var html = '<button class="btnAzul" onclick="graficos()">Volver</button> <br> <div id="graficosChart"></div>'
    $("#frases").html(html);

    
    var chart = new google.charts.Bar(document.getElementById('graficosChart'));

    chart.draw(data, google.charts.Bar.convertOptions(options));

}


function dibujarArea(data, options){
    google.charts.load('current', {'packages':['corechart']});
    console.log(data);
    var html = '<button class="btnAzul" onclick="graficos()">Volver</button> <br> <div id="graficosChart"></div>'
    $("#frases").html(html);

    
    var chart = new google.visualization.AreaChart(document.getElementById('graficosChart'));

    chart.draw(data, options);

}










