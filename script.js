console.log(window);

var city = "";
var dataOnDay;
var array_history = [];

display_last_searched();


$(".btn-primary").on("click", function () {
    city = $(".form-control").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=2a27317982a2267a6e8a9336aba2ecfd";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        dataOnDay = response;
        saveData(response["name"]);
        display_current_Weather();
        display_forecast_5day();
    });

})


$(".btn-secondary").on("click", function () {
    city = $(this).text();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=2a27317982a2267a6e8a9336aba2ecfd";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        dataOnDay = response;
        saveData(response["name"]);
        display_current_Weather();
        display_forecast_5day();
    });

})

function display_current_Weather() {
    var rightUpElement = $("#current");
    var newH3 = $("#title");
    console.log(dataOnDay);
    newH3.text(dataOnDay["name"] + "  " + moment().format("MM/DD/YYYY"));
    var img = $("<img>");
    img.attr("src", "http://openweathermap.org/img/wn/" + dataOnDay.weather[0].icon + "@2x.png");
    newH3.append(img);

    var temp = $("#temp");
    temp.attr("class", "current-temp");
    var temp_fahrenheit = (((dataOnDay.main["temp"]) * 9 / 5) - 459.67).toFixed(1);
    temp.text("Temperature: " + temp_fahrenheit + " F");

    var humidity = $("#humid");
    humidity.text("Humidity: " + dataOnDay.main["humidity"] + "%");

    var wind = $("#wind");
    wind.text("Wind speed: " + dataOnDay.wind["speed"] + "MPH");

    var uv = $("#index");
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=2a27317982a2267a6e8a9336aba2ecfd&lat=" + dataOnDay.coord["lat"] + "&lon=" + dataOnDay.coord["lon"];
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        uv.text("UV Index: " + response.value);
    });
    rightUpElement.append(newH3, temp, humidity, wind, uv);
}


function display_forecast_5day() {
    $("#forecast_5").empty();
    var url = "https://api.openweathermap.org/data/2.5/forecast";
    $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        data: {
            q: city,
            appid: '2a27317982a2267a6e8a9336aba2ecfd',
            units: "metric",
        },
        success: function (response2) {
            for (var i = 0; i < 5; i++) {
                var element1 = $("<div>");
                element1.attr("class", "forecast");

                var element2 = $("<div>");
                var date_val = moment(response2.list[8 * i].dt_txt)
                //element2.text(response2.list[8 * i].dt_txt);
                element2.text(date_val.format("MM/DD/YYYY"));
                var img = $("<img>");
                img.attr("src", "http://openweathermap.org/img/wn/" + response2.list[8 * i].weather[0].icon + "@2x.png");

                var element3 = $("<div>");
                element3.text("Temp: " + ((response2.list[8 * i].main["temp"] * 1.8) + 32).toFixed(1) + " F");

                var element4 = $("<div>");
                element4.text("Humidity: " + response2.list[8 * i].main["humidity"]);
                element1.append(element2, img, element3, element4);

                $("#forecast_5").append(element1);

            }
        }
    });
}


function display_last_searched() {
    array_history = JSON.parse(window.localStorage.getItem("weather_history"));
    if (array_history === null) {
        return;
    }
    console.log(array_history.length);
    for (var i = 0; i < array_history.length; i++) {
        var element = $("#search");
        var newElement = $("<button>").attr("class", "btn-secondary col-xs-12 col-sm-12 col-md-12 col-lg-12");
        newElement.text(array_history[i]);
        element.after(newElement);
    }
    city = array_history[array_history.length - 1];
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=2a27317982a2267a6e8a9336aba2ecfd";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        dataOnDay = response;
        display_current_Weather();
        display_forecast_5day();
    });

}


function saveData(item) {
    var array1 = window.localStorage.getItem("weather_history");

    if (array1 == null) {
        array1 = [item];
    } else {
        array1 = JSON.parse(array1);
        if (array1.indexOf(item) === -1) {
            array1.push(item);
        }
    }
    window.localStorage.setItem("weather_history", JSON.stringify(array1));
}

