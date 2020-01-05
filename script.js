console.log(window);

// var city = "chicago";
// console.log("Querying for City:" + city);
var city = "";
var dataOnDay;

showHistory();



function showHistory() {
    var array_history = [];
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
}

$(".btn-primary").on("click", function () {
    var city = $(".form-control").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=2a27317982a2267a6e8a9336aba2ecfd";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        dataOnDay = response;
        console.log("Data on day is " + dataOnDay);
        console.log("Got reponse:" + response);
        console.log("ilk response " + response["name"]);
        console.log(response.main["temp"]);
        console.log(JSON.stringify(response));
        saveData(response["name"]);
        showCurrentWeather();
    });

    var url = "https://api.openweathermap.org/data/2.5/forecast";
    $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        data: {
            q: city,
            appid: '2a27317982a2267a6e8a9336aba2ecfd',
            units: "metric",
            // cnt: "48"
        },
        success: function (response2) {
            console.log('Five day data:', response2);
            console.log(response2.list[0].main["temp"]);
            console.log(response2.list[0].main["humidity"]);
            console.log(response2.list[0].dt_txt);
            for (var i = 0; i < 5; i++) {
                var element1 = $("<div>");
                element1.attr("class", "forecast");
                element1.text("working" + i);
                console.log("working" + i);
                // var content = $("<div>");
                // console.log(content.text(response2.list[7 * i].dt_txt));
                // console.log(response2.list[0].dt_txt);
                // element.text(response2.list[0].dt_txt, response2.list[i].main["temp"], response2.list[i].main["humidity"]);

                $("#forecast_5").append(element1);

            }
        }
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
        console.log("Data on day is " + dataOnDay);
        console.log("Got reponse:" + response);
        console.log("ilk response " + response["name"]);
        console.log(response.main["temp"]);
        console.log(JSON.stringify(response));
        saveData(response["name"]);
        showCurrentWeather();
    });

    // display5day_forecast();

})



function showCurrentWeather() {
    var rightUpElement = $("#current");
    var newH3 = $("#title");
    console.log(dataOnDay);
    newH3.text(dataOnDay["name"] + "  " + moment().format("MM DD YYYY"));
    var img = $("<img>");
    img.attr("src", "http://openweathermap.org/img/wn/" + dataOnDay.weather[0].icon + "@2x.png");
    newH3.append(img);
    // rightUpElement.append(newH3);

    var temp = $("#temp");
    temp.attr("class", "current-temp");
    temp.text("Temperature: " + dataOnDay.main["temp"] + "F");
    // rightUpElement.append(temp);

    var humidity = $("#humid");
    // humidity.attr("class", "current-temp");
    humidity.text("Humidity: " + dataOnDay.main["humidity"] + "%");
    // rightUpElement.append(humidity);

    var wind = $("#wind");
    wind.text("Wind speed: " + dataOnDay.wind["speed"] + "MPH");


    var uv = $("#index");
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=2a27317982a2267a6e8a9336aba2ecfd&lat=" + dataOnDay.coord["lat"] + "&lon=" + dataOnDay.coord["lon"];
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response.value);
        uv.text("UV Index: " + response.value);
    });

    rightUpElement.append(newH3, temp, humidity, wind, uv);
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
