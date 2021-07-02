var bearer = '';
var token = '';

$(document).ready(function(){

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
        alert('Debe correr Strapi primero. No olvide cambiar su ip en "script.js".')
    }
    });

});


//CLIMA

function clima(clima){
    
    var html = ' <label for=""><h1>Clima en su ubicación: </h1></label> <br> <fieldset id="buscador"><select name="zona" id="zonaElegida"><option value="">Seleccione una zona...</option><option value="468739" selected>Buenos Aires, Argentina</option><option value="455825">Rio de Janeiro, Brasil</option>  <option value="349859">Santiago, Chile</option>  <option value="368148">Bogotá, Colombia</option> <option value="116545">Ciudad de México, México</option> <option value="418440">Lima, Perú</option><option value="395269">Caracas, Venezuela</option></select><button id="btnBuscar" onclick="listarClima()" ><i class="fas fa-search"></i></button></fieldset>';

    $("#clima").html(html);
    listarClima();
}


function listarClima(){
    var idZona = $("#zonaElegida").val();

    $.ajax({
        url: "https://fierce-lake-96143.herokuapp.com/https://www.metaweather.com/api/location/" + idZona,
        method: "GET",
        dataType: "json",
        success: function(response){
            var clima = '';
            var dia = response.time.split("T");
            var hora = dia[1].split(".");
            var img = '';
            var tipo = response.consolidated_weather[0].weather_state_abbr;

            if (tipo == 'lc'){
            img = 'https://www.metaweather.com/static/img/weather/lc.svg';
            clima = 'Poco Nublado';
            }

            else if (tipo == 'c') {
            img = 'https://www.metaweather.com/static/img/weather/c.svg';
            clima = 'Despejado';
            }

            else if (tipo == 'sn') {
            img = 'https://www.metaweather.com/static/img/weather/sn.svg';
            clima = 'Nieve';
            }

            else if (tipo == 'sl') {
            img = 'https://www.metaweather.com/static/img/weather/sl.svg';
            clima = 'Agua Nieve';
            }

            else if (tipo == 'h') {
            img = 'https://www.metaweather.com/static/img/weather/h.svg';
            clima = 'Granizo';
            }

            else if (tipo == 't') {
            img = 'https://www.metaweather.com/static/img/weather/t.svg';
            clima = 'Tormenta';
            }

            else if (tipo == 'hr') {
            img = 'https://www.metaweather.com/static/img/weather/hr.svg';
            clima = 'Fuerte Lluvia';
                    }

            else if (tipo == 'lr') {
            img = 'https://www.metaweather.com/static/img/weather/lr.svg';
            clima = 'Leve Lluvia';
            }

            else if (tipo == 's') {
            img = 'https://www.metaweather.com/static/img/weather/s.svg';
            clima = 'Llovizna';
            }

            else if (tipo == 'sn') {
            img = 'https://www.metaweather.com/static/img/weather/sn.svg';
            clima = 'Nieve';
            }

            else if (tipo == 'hc') {
            img = 'https://www.metaweather.com/static/img/weather/hc.svg';
            clima = 'Muy Nublado';
            }

            else {
                img = ' ';
                clima = 'Desconocido';

            };

                var html = '<label for=""><h1>Clima en su ubicación: </h1></label> <br> <fieldset id="buscador"><select name="zona" id="zonaElegida"><option value="">Seleccione una zona...</option><option value="468739">Buenos Aires, Argentina</option><option value="455825">Rio de Janeiro, Brasil</option>  <option value="349859">Santiago, Chile</option>  <option value="368148">Bogotá, Colombia</option> <option value="116545">Ciudad de México, México</option> <option value="418440">Lima, Perú</option><option value="395269">Caracas, Venezuela</option></select><button id="btnBuscar" onclick="listarClima()" ><i class="fas fa-search"></i></button></fieldset> <br><br><div class="card"> <div class="relleno"> Tiempo en ' + response.title +', '+ response.parent.title + '<br><h4 class="hora"> A las ' + hora[0] + '</h4><div class="medio"> <h2 class="tMax">'+ Math.round(response.consolidated_weather[0].max_temp) +'°</h2> <img class="foto" src="'+img+'"> </div> <h2 class="cli">'+clima+'</h2> <br> <h4 class="hum">'+ response.consolidated_weather[0].humidity+'% de humedad</h4> </div> </div>';

                $("#clima").html(html);
        },
        error: function(req, status, err){
            console.log(req, status, err);
        }
 });
}


//STRAPI

function strapi(strapi){
        var html = '<label for=""><h1>Agregue un lugar a Strapi:</h1><br></label><br><label class="labelFecha">Fecha: </label><select id="selectFecha" class="btnFecha"></select><br> <fieldset id="buscador"><select name="zona" id="zonaStrapi"><option value="">Seleccione una zona...</option><option value="468739">Buenos Aires, Argentina</option><option value="455825">Rio de Janeiro, Brasil</option>  <option value="349859">Santiago, Chile</option>  <option value="368148">Bogotá, Colombia</option> <option value="116545">Ciudad de México, México</option> <option value="418440">Lima, Perú</option><option value="395269">Caracas, Venezuela</option></select><button id="btnBuscar" class="tipoBlanca" onclick="guardarLugar()" >Cargar</button></fieldset><br><br><br><button class="btnAzul" onclick="verCargados()">Ver cargados en Strapi</button>';
        llenarFecha();
        $("#strapi").html(html);
}

function llenarFecha(){
    $.ajax({
        //468739 es Argentina
        url: "https://fierce-lake-96143.herokuapp.com/https://www.metaweather.com/api/location/468739",
        method: "GET",
        dataType: "json",
        success: function(response){
            var dia = [];
            for (var i = 0; i < 6; i++) {
                dia.push(response.consolidated_weather[i].applicable_date);
            }
            var selector = $("#selectFecha")[0];
            for (i in dia) {
                selector.options[i] = new Option(dia[i],dia[i]);
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
            fecha: dia,
            clima: clima,
            foto: img,
            tempMax: Math.round(tempMax),
            tempMin: Math.round(tempMin)
        },
        dataType: "json",
        success: function(response) {
        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}


function guardarLugar(){
    var idZona = $("#zonaStrapi").val();
    var dia = $("#selectFecha").val();

    $.ajax({
        url: "https://fierce-lake-96143.herokuapp.com/https://www.metaweather.com/api/location/" + idZona,
        method: "GET",
        dataType: "json",
        success: function(response){
            var clima = '';
            var img = '';
            var tempMax = 0;
            var tempMin = 0;
            for (i in response.consolidated_weather){
                if (response.consolidated_weather[i].applicable_date == dia){
                    var tipo = response.consolidated_weather[i].weather_state_abbr;

                    if (tipo == 'lc'){
                    img = 'https://www.metaweather.com/static/img/weather/lc.svg';
                    clima = 'Poco Nublado';
                    }

                    else if (tipo == 'c') {
                    img = 'https://www.metaweather.com/static/img/weather/c.svg';
                    clima = 'Despejado';
                    }

                    else if (tipo == 'sn') {
                    img = 'https://www.metaweather.com/static/img/weather/sn.svg';
                    clima = 'Nieve';
                    }

                    else if (tipo == 'sl') {
                    img = 'https://www.metaweather.com/static/img/weather/sl.svg';
                    clima = 'Agua Nieve';
                    }

                    else if (tipo == 'h') {
                    img = 'https://www.metaweather.com/static/img/weather/h.svg';
                    clima = 'Granizo';
                    }

                    else if (tipo == 't') {
                    img = 'https://www.metaweather.com/static/img/weather/t.svg';
                    clima = 'Tormenta';
                    }

                    else if (tipo == 'hr') {
                    img = 'https://www.metaweather.com/static/img/weather/hr.svg';
                    clima = 'Fuerte Lluvia';
                    }

                    else if (tipo == 'lr') {
                    img = 'https://www.metaweather.com/static/img/weather/lr.svg';
                    clima = 'Leve Lluvia';
                    }

                    else if (tipo == 's') {
                    img = 'https://www.metaweather.com/static/img/weather/s.svg';
                    clima = 'Llovizna';
                    }

                    else if (tipo == 'sn') {
                    img = 'https://www.metaweather.com/static/img/weather/sn.svg';
                    clima = 'Nieve';
                    }

                    else if (tipo == 'hc') {
                    img = 'https://www.metaweather.com/static/img/weather/hc.svg';
                    clima = 'Muy Nublado';
                    }

                    else {
                        clima = 'Desconocido';

                    };

                    tempMax = response.consolidated_weather[i].max_temp;
                    tempMin = response.consolidated_weather[i].min_temp;
                }
            }

                cargarClima(response, dia, clima, img, tempMax, tempMin);
                var html = 'Lugar cargado &#9989 <br><br> <button class="btnFecha" onclick="verCargados()">Ver cargados en Strapi</button> <br><br> <label for="">Agregue otro: <br></label><br><label class="labelFecha">Fecha: </label><select id="selectFecha" class="btnFecha"></select><br> <fieldset id="buscador"><select name="zona" id="zonaStrapi"><option value="">Seleccione una zona...</option><option value="468739">Buenos Aires, Argentina</option><option value="455825">Rio de Janeiro, Brasil</option>  <option value="349859">Santiago, Chile</option>  <option value="368148">Bogotá, Colombia</option> <option value="116545">Ciudad de México, México</option> <option value="418440">Lima, Perú</option><option value="395269">Caracas, Venezuela</option></select><button id="btnBuscar" class="tipoBlanca" onclick="guardarLugar()" >Cargar</button></fieldset>';
                llenarFecha();
                $("#strapi").html(html);

        },
        error: function(req, status, err){
            console.log(req, status, err);
            var html = 'No se ha podido cargar el lugar seleccionado <br><br><br><button class="btnAzul" onclick="verCargados()">Ver cargados en Strapi</button> <br><br> <label for="">Agregue otro!</label> <br><label>Fecha: </label><select id="selectFecha" class="btnFecha"></select><br> <fieldset id="buscador"><select name="zona" id="zonaStrapi"><option value="">Seleccione una zona...</option><option value="468739">Buenos Aires, Argentina</option><option value="455825">Rio de Janeiro, Brasil</option>  <option value="349859">Santiago, Chile</option>  <option value="368148">Bogotá, Colombia</option> <option value="116545">Ciudad de México, México</option> <option value="418440">Lima, Perú</option><option value="395269">Caracas, Venezuela</option></select><button id="btnBuscar" class="tipoBlanca" onclick="guardarLugar()" >Cargar</button></fieldset>';
            llenarFecha();
            $("#strapi").html(html);
        }
    });
}


function verCargados(){
    var html = '<label for="">Lugares cargados en Strapi:</label> <br> <fieldset id="buscador"><select name="zona" id="datosStrapi"> </select><button class="tipoBlanca" id="btnBuscar" onclick="deleteStrapi()" >Borrar</button></fieldset> <br><br> <button class="btnAzul" onclick="strapi()">Volver</button>';
    getStrapi();
    $("#strapi").html(html);
}

function getStrapi(){
    $.ajax({
        url: "http://192.168.1.96:1337/lugars",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {
            
            response.sort(function (a,b){
                if (b.nombre > a.nombre) {
                    return -1;
                }
                if (a.nombre > b.nombre) {
                    return 1;
                }
                return 0;
            });

            var selector = ($("#datosStrapi")[0]);

            for (i in response) {
                selector.options[i] = new Option(response[i].nombre,response[i].nombre);
            };

            
        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}


function deleteStrapi(){
    $.ajax({
        url: "http://192.168.1.96:1337/lugars",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {

            var nom = $("#datosStrapi").val();

            for (i in response){
                if (response[i].nombre == nom){
                    var id = response[i].id;
                }
            }

            deleteLugar(id);

        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}

function deleteLugar(id){
    $.ajax({
        url: "http://192.168.1.96:1337/lugars/"+id,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {
            alert("Lugar borrado: "+id);
            verCargados();
        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}



//GRAFICOS
function graficos(){
    google.charts.load('current', {'packages':['bar', 'corechart']});
    var html =  '<div class="divBotonesGrafico"><div class="botonStrapitodos"><button id="compTempTodas" class="btnAzul" onclick="graficoTodos()">Comparar temperaturas: Latinoamerica</button></div><br> <div class="divBotonesGrafico"><button id="compTempT" class="btnAzul" onclick="graficoBs()">Comparar temperaturas: Buenos Aires</button><br> <div id="dibujarGraficos"><br><br><button id="dibujarGrafico" class="btnAzul" onclick="dibujar(data, options)">Dibujar</button></div>';
    $("#graficos").html(html);

}

var data = [];
var options = '';

function graficoTodos(){
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
                    title: 'Comparacion de Temperaturas de Latinoamerica',
                    subtitle: 'Maxima y Minima de cada lugar cargado',
                },
                bars: 'horizontal'
            };

            

            var html = '<div class="divBotonesGrafico"><div class="botonStrapitodos"><button id="compTempTodas" class="btnAzul" onclick="graficoTodos()">Comparar temperaturas: Latinoamerica</button></div><br> <div class="divBotonesGrafico"><button id="compTempT" class="btnAzul" onclick="graficoBs()">Comparar temperaturas: Buenos Aires</button><br> <div id="dibujarGraficos"><br><br><button id="dibujarGrafico" class="btnAccept" onclick="dibujar(data, options)">Dibujar</button></div>';
            $("#graficos").html(html);



        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}


function graficoBs(){
    google.charts.setOnLoadCallback(dibujarArea);
    $.ajax({
        url: "http://192.168.1.96:1337/lugars",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
        dataType: "json",
        success: function(response) {
            //Ordeno por fecha.
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
                    arrayData.push([response[i].nombre, response[i].tempMax, response[i].tempMin]);
                }
            }
            
            data = google.visualization.arrayToDataTable(arrayData);
        
            options = {
              title: 'Comparacion de Temperaturas de Buenos Aires',
              hAxis: {title: 'Lugar (AAAA-MM-DD)',  titleTextStyle: {color: '#333'}},
              vAxis: {title: 'Temperatura'}
            };

            var html = '<div class="divBotonesGrafico"><div class="botonStrapitodos"><button id="compTempTodas" class="btnAzul" onclick="graficoTodos()">Comparar temperaturas: Latinoamerica</button></div><br> <div class="divBotonesGrafico"><button id="compTempT" class="btnAzul" onclick="graficoBs()">Comparar temperaturas: Buenos Aires</button><br> <div id="dibujarGraficos"><br><br><button id="dibujarGrafico" class="btnAccept" onclick="dibujarArea(data, options)">Dibujar</button></div>';
            $("#graficos").html(html);

        },
        error: function(req, status, err) {
            console.log(req, status, err);
        }
    });
}


function error(){
    alert("No ha seleccionado ningun grafico");
}




function dibujar(data, options){
    google.charts.load('current', {'packages':['bar']});

    var html = '<div id="graficosChart"> <br><br> </div><button class="btnAzul" onclick="graficos()">Volver</button> '
    $("#graficos").html(html);
    
    var chart = new google.charts.Bar($("#graficosChart")[0]);

    chart.draw(data, google.charts.Bar.convertOptions(options));

}


function dibujarArea(data, options){
    google.charts.load('current', {'packages':['corechart']});

    var html = '<div id="graficosChart"></div> <br><br>  <button class="btnAzul" onclick="graficos()">Volver</button>'
    $("#graficos").html(html)

    var chart = new google.visualization.AreaChart($("#graficosChart")[0]);

    chart.draw(data, options);


}










