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
    });

})

showCurrentWeather();

function showCurrentWeather() {
    var rightUpElement = $(".current_day");
    var newH1 = $("<h1>");
    newH1.text(dataOnDay["name"] + "  " + moment().format("MM DD YYYY") + "  " + dataOnDay["icon"]);
    rightUpElement.append(newH1);
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