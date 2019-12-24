

var city = "chicago";

console.log("Querying for City:" + city);

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=2a27317982a2267a6e8a9336aba2ecfd";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log("Got reponse:" + response);
    // console.log(JSON.stringify(response));
    console.log(response["name"]);
    console.log(response.main["temp"]);
});



var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=2a27317982a2267a6e8a9336aba2ecfd";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log("Got reponse:" + response);
    console.log(JSON.stringify(response));
    // console.log(response["name"]);
    // console.log(response.main["temp"]);
});