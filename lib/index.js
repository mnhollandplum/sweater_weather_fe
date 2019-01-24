var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  var location = document.getElementById("location").value;
  var forecastRequest = new XMLHttpRequest();
  forecastRequest.open('GET', 'http://sweater-weather-be.herokuapp.com/api/v1/forecast?location=' + location)
  forecastRequest.onload = function() {
    var forecastData = JSON.parse(forecastRequest.responseText);
    displayWeather(forecastData)
    console.log(forecastData);

  };

  forecastRequest.send()
});

function displayWeather(data) {
  var location = data['timezone']
  document.getElementById("chosen-location").innerHTML = location

  var todaysDate = new Date(data['daily']['data'][0]['time'])
  document.getElementById("todays-date").innerHTML = todaysDate

  var todaysSummary = data['daily']['data'][0]['summary']
  document.getElementById("todays-summary").innerHTML = todaysSummary

  var currentTemp = data['currently']['apparentTemperature'] + '&deg';
  document.getElementById("current-temp").innerHTML = currentTemp

  var todaysHigh = data['daily']['data'][0]['temperatureMax'] + '&deg';
  document.getElementById("todays-high").innerHTML = "High: " + todaysHigh

  var todaysLow = data['daily']['data'][0]['temperatureMin'] + '&deg';
  document.getElementById("todays-low").innerHTML = "Low: " + todaysLow
}




// console.log(forecastData['timezone']);
// console.log(forecastData['currently']);
// console.log(forecastData['hourly'])
// console.log(forecastData['daily'])
