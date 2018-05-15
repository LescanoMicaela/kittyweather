var weather;
var tempsMax = [];
var tempsMin = [];
var averTempMax;
var averTempMin;
var dt;
var tempRightNow;
var cityinput;
var searchBar;
var description;
var icon;
var humidity;
var input;
var notFound;
var dt2;
var date;
var hour;
var icon2;

var button = $("#go");
$("#error").hide();
$("#success").hide();
$("#infoWeather").hide();
var now = new Date(Date.now());
var formatted = now.getHours() + ":" + "00";

$(document).ready(function () {
    var searchBar = $("#mySearch");
    $("#today").hide();
    searchBar.focus();
    initialize();

    //    $("#mySeach").geocomplete();
    //
    //// Trigger geocoding request.
    //$("button.find").click(function(){
    //  $("input").trigger("geocode");
    //});


    Date.prototype.yyyymmdd = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
    };

    var date = new Date();
    console.log(date.yyyymmdd());

    changeBackground();

    button.click(function (e) {
        e.preventDefault();
        callCity(searchBar.val());


    });




    function callCity(cityinput) {
        //    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + cityinput + "&APPID=ae8f488ff6e6f5c775053b377bc54191", function (data) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityinput + "&APPID=ae8f488ff6e6f5c775053b377bc54191",
            dataType: 'json',

            success: function (data) {
                $("#infoWeather").show();
                $(".bottom").hide();
                $("#today").show();
                weather = data;
                changeBottom();

                $(".bottom2").show();
                $(".bottom2").hide(200).slideToggle(3000);
                $(".bottom2").show(200).slideToggle(3000);



                $("#top").css("margin", "0");
                $("#cityName").html(weather.city.name);
                changeBottom();
                fillDivs(0, 0);
                fillDivs(1, 8);
                fillDivs(2, 16);
                fillDivs(3, 24);
                $("#date1").html("Tomorrow");
                $("#date2").html(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday",][((new Date()).getDay()) + 2]);
                $("#date3").html(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday"][((new Date()).getDay()) + 3]);
                ///// agregar un if para numero mas grande a 7 /////
                console.log(weather.list[0].weather[0].description);
                separateDateHour();
                console.log(weather.list[0].weather[0].icon);
                console.log(weather.list[0].main); //today
                console.log(weather.list[0].main["temp_max"]); //today
                console.log(weather.list[0].main["temp_max"]); //today
                console.log(weather.list[0].main["temp"]); //today

                //        getTemps("temp_max", tempsMax);
                //        getTemps("temp_min", tempsMin);

                //        averTempMax = averageTemp(tempsMax);
                //        averTempMin = averageTemp(tempsMin);


                //                var icon = weather.list[0].weather[0].icon;
                //        lightbox(icon);

                //                changeBottom(icon); pensar solucion

                console.log(icon);

                searchBar.val("");
                $("#cityName").show();
                $("#success").show();
                //                $(".bottom").show();
                $("#error").hide();
            },
            error: function errorHandler() {
                $("#today").hide();
                changeBackground();
               $("#infoWeather").hide();
                searchBar.val("");
                $("#top").css("margin", "0");
                $("#cityName").hide();
                $("#success").hide();
                $(".bottom").hide();
                $("#error").show();

            }
        });
    };



    function separateDateHour() {

        for (var i = 0; i < weather.list.length; i++) {
            dt = weather.list[i].dt_txt;
            dt2 = dt.split(" ");
        }
        date = dt2[0];
        time = dt2[1];

    };

    function frame() {
        $(".iframe").colorbox({
            iframe: true,
            innerWidth: "70%",
            innerHeight: "70%",
            opacity: 0.8
        });
    };

    function insertImage(par) {

        var img = document.createElement("img");
        img.src = "icon/" + par + ".png";
        $('iframe').html(img);



    }

    function lightbox(par) {
        $.colorbox({
            width: "500",
            height: "400",
            iframe: true,
            opacity: 0.8,
            scalePhotos: true,
            scrolling: false,
            href: "images/" + par + ".jpg"
        });
    }

    function changeBottom() {
        var icon2 = weather.list[0].weather[0].icon;
        var img = document.createElement("img");
        img.src = "images/" + icon2 + ".png";

        $(".bottom2").html(img)


    }

    function initialize() {

        var options = {
            types: ['(cities)']
            
        };

        var input = document.getElementById('mySearch');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
    }

 


    /// function temp del dia, cada dia tiene 5 entradas.
    function getTemps(temp, temparry) {
        for (var i = 0; i < 5; i++) {
            temparry.push(weather.list[i].main[temp]);
        }

    }
    //// CALCULO LA TEMP MEDIA DEL DIA
    function averageTemp(arry) {
        var sum = arry.reduce(function (v, x) {
            return v + x
        }, 0);
        return sum / arry.length;
    }

    //crear background
    function changeBackground() {

        if (new Date().getHours() > 16) {
            $("body").css("background-image", "url('images/nights.jpg')");

        } else {
            $("body").css("background-image", "url('images/sky2.jpg')");
        }
    };

    function changeBackgroundCont() {

        if (new Date().getHours() > 16) {
            $(".container").css("background-color", "black");
        } else {
            $(".container").css("background-color", "#d215634f");
        }

    }

    function fillDivs(num, num2) {

        var icon = weather.list[num2].weather[0].icon;

        //        dt = weather.list[num2].dt_txt;
        //            dt2 = dt.split(" ");
        //        
        //        date = dt2[0];
        //        time = dt2[1];

        $("#temp" + num).html((Math.round((weather.list[num2].main["temp"]) - 273.15)) + "&#x2103");
        $("#tempMax" + num).html((Math.round((weather.list[num2].main["temp_max"]) - 273.15)) + "&#x2103" + " " + "|");
        $("#tempMin" + num).html((Math.round((weather.list[num2].main["temp_min"]) - 273.15)) + "&#x2103");
        humidity = weather.list[num2].main["humidity"];
        $("#humidity" + num).html("Humidity :" + " " + humidity + "%");

        //        $("#date" +num).html(dt2[0]);

        var img = document.createElement("img");

        img.src = "icon/" + icon + "2.png";
        $('#icon' + num).html(img);
        $('#description' + num).html(weather.list[num2].weather[0].description);



    };
//    function getWeekdays() {
//        if ( ((new Date()).getDay()) < 6)
//        $("#date2").html(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][((new Date()).getDay()) + 2]);
//        $("#date3").html(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][((new Date()).getDay()) + 3]);
//    }


});
