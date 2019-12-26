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
        var newElement = $("<div>").attr("class", "search_history");
        newElement.text(array_history[i]);
        console.log(array_history[i]);
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
        saveData(city);
        showCurrentWeather();
    });
})

function showCurrentWeather() {
    var rightUpElement = $("#current");
    var newH3 = $("<h3>");
    console.log(dataOnDay["name"]);
    newH3.text(dataOnDay["name"] + "  " + moment().format("MM DD YYYY"));
    var img = $("<img>");
    img.attr("src", "http://openweathermap.org/img/wn/" + dataOnDay.weather[0].icon + "@2x.png");
    newH3.append(img);
    // rightUpElement.append(newH3);


    var temp = $("<div>");
    temp.attr("class", "current-temp");
    temp.text("Temperature: " + dataOnDay.main["temp"] + "F");
    // rightUpElement.append(temp);

    var humidity = $("<div>");
    // humidity.attr("class", "current-temp");
    humidity.text("Humidity: " + dataOnDay.main["humidity"] + "%");
    // rightUpElement.append(humidity);

    var wind = $("<div>");
    wind.attr("class", "current-temp");
    wind.text("Wind speed: " + dataOnDay.wind["speed"] + "MPH");
    rightUpElement.append(newH3, temp, humidity, wind);
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


// var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=2a27317982a2267a6e8a9336aba2ecfd";
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log("Got reponse:" + response);
//     console.log(JSON.stringify(response));
//     // console.log(response["name"]);
//     // console.log(response.main["temp"]);
// });