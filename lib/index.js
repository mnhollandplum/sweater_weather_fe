var searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function() {
  var location = document.getElementById("location").value;
  var forecastRequest = new XMLHttpRequest();
  forecastRequest.open('GET', 'http://sweater-weather-be.herokuapp.com/api/v1/forecast?location=' + location)
  forecastRequest.onload = function() {
  var forecastData = JSON.parse(forecastRequest.responseText);

  // displayWeather(forecastData);
  displayCurrentWeather(forecastData);
  displayCurrentDetails(forecastData);
  displayHourlyForecast(forecastData);
  displayDailyForecast(forecastData);
  };

  forecastRequest.send()
});

var addFavoriteBtn = document.getElementById("addFavBtn");
addFavoriteBtn.addEventListener("click", function() {
  var location = document.getElementById("location").value;
  var addFavorite = new XMLHttpRequest();
  addFavorite.open('POST', 'http://localhost:3000/api/v1/favorites?location=denver,co&api_key=12992528-bc65-4b79-9bdf-ba314c6c7dea')
  addFavorite.onload = function() {
  };
  addFavorite.send()
});

var seeFavBtn = document.getElementById("seeFav");
var favoriteLocation = document.getElementById("chosen-location").value;
seeFavBtn.addEventListener("click", function() {
var favoritesRequest = new XMLHttpRequest();
favoritesRequest.open('GET', 'http://localhost:3000/api/v1/favorites?location=' + favoriteLocation + "&api_key=12992528-bc65-4b79-9bdf-ba314c6c7dea")
favoritesRequest.onload = function() {
var favoritesData = JSON.parse(favoritesRequest.responseText);

  displayFavorites(favoritesData);
};

  favoritesRequest.send()
});

function displayFavorites(data) {
  console.log(data)
}

function displayCurrentWeather(data) {
  var currentTitle = "Current Weather"
  document.getElementById("current-title").innerHTML = currentTitle

  var location = data['timezone']
  document.getElementById("chosen-location").innerHTML = location

  var todaysDate = new Date(data['daily']['data'][0]['time'])
  document.getElementById("todays-date").innerHTML = todaysDate

  var currentSummary = data['currently']['summary']
  document.getElementById("current-summary").innerHTML = currentSummary
  document.getElementById("short-summary").innerHTML = currentSummary

  var currentTemp = data['currently']['temperature'] + '&deg';
  document.getElementById("current-temp").innerHTML = currentTemp

  var todaysHigh = data['daily']['data'][0]['temperatureMax'] + '&deg';
  document.getElementById("todays-high").innerHTML = "High: " + todaysHigh

  var todaysLow = data['daily']['data'][0]['temperatureMin'] + '&deg';
  document.getElementById("todays-low").innerHTML = "Low: " + todaysLow
};

function displayCurrentDetails(data) {
  var detailTitle = "Details: "
  document.getElementById("detail-title").innerHTML = detailTitle

  var todaySummary =
  data['daily']['data'][0]["summary"];
  document.getElementById("today-summary").innerHTML = "Today: " + todaySummary
//revisit tonight data
  var tonightSummary =
  data['daily']['data'][0]["icon"];
  document.getElementById("tonight-summary").innerHTML = "Tonight: " + tonightSummary

  var feelsLike = data["currently"]["apparentTemperature"];
  document.getElementById("feels-like").innerHTML = "Feels Like: " + feelsLike + '&deg'

  var currentHumidity = data["currently"]["humidity"];
  document.getElementById("current-humidity").innerHTML = "Humidity: " + currentHumidity + "%"

  var currentVisibility =
  data["currently"]["visibility"];
  document.getElementById("current-visibility").innerHTML = "Visibility: " + currentVisibility + " miles"
}
// formatDateAndTime(dateTime) {
//      let [day, month, dayNum, year, time] = dateTime.split(" ")
//      let [hours, minutes] = time.split(":")
//      let standardTime =  hours > 12 ? `${hours - 12}:${minutes}pm` : `${hours}:${minutes}am`
//      return `${standardTime}, ${month} ${dayNum}`
//    }


function displayHourlyForecast(data) {
  var hourlyTitle = "Hourly Forecast: ";
  document.getElementById("hourly-title").innerHTML = hourlyTitle

  var thisHour = data["hourly"]["data"][0];
    document.getElementById("this-hour").innerHTML = thisHour["time"] + ": " + thisHour["temperature"] + '&deg';

  var nextHour = data["hourly"]["data"][1];
    document.getElementById("next-hour").innerHTML = nextHour["time"]+ ": " + nextHour["temperature"]

  var thirdHour = data["hourly"]["data"][2];
    document.getElementById("third-hour").innerHTML = thirdHour["time"]+": "+ thirdHour["temperature"]

  var fourthHour = data["hourly"]["data"][3];
    document.getElementById("fourth-hour").innerHTML = fourthHour["time"]+ ": " + fourthHour["temperature"]

  var fifthHour = data["hourly"]["data"][4];
    document.getElementById("fifth-hour").innerHTML = fifthHour["time"]+ ": " + fifthHour["temperature"]

  var sixthHour = data["hourly"]["data"][5];
    document.getElementById("sixth-hour").innerHTML = sixthHour["time"]+": "+ sixthHour["temperature"]

  var seventhHour = data["hourly"]["data"][6];
    document.getElementById("seventh-hour").innerHTML = seventhHour["time"] + ": " + seventhHour["temperature"]

  var eighthHour = data["hourly"]["data"][6];
    document.getElementById("eighth-hour").innerHTML = eighthHour["time"] + ": " + eighthHour["temperature"]
}

function displayDailyForecast(data) {
  var dailyTitle = "Daily Forecast: ";
    document.getElementById("daily-title").innerHTML = dailyTitle

  var nextDay = data["daily"]["data"][1];
    document.getElementById("next-day").innerHTML = new Date (nextDay["time"]*1000).getDate() + "th: " + nextDay["summary"] + nextDay["precipProbability"]+ "%" + nextDay["temperatureMax"] + '&deg' + nextDay["temperatureMin"] + '&deg'

  var thirdDay = data["daily"]["data"][2];
    document.getElementById("third-day").innerHTML = new Date (thirdDay["time"]*1000).getDate() + "th: " + thirdDay["summary"] + thirdDay["precipProbability"]+ "%"+ thirdDay ["temperatureMax"] + '&deg' + thirdDay["temperatureMin"] + '&deg'

  var fourthDay = data["daily"]["data"][3];
    document.getElementById("fourth-day").innerHTML = new Date (fourthDay["time"]*1000).getDate() + "th: " + fourthDay["summary"] + fourthDay["precipProbability"]+ "%" + fourthDay["temperatureMax"] + '&deg' + fourthDay["temperatureMin"] + '&deg'

  var fifthDay = data["daily"]["data"][4];
    document.getElementById("fifth-day").innerHTML = new Date (fifthDay["time"]*1000).getDate() + "th: " + fifthDay["summary"] + fifthDay["precipProbability"]+ "%" + fifthDay["temperatureMax"] + '&deg' + fifthDay["temperatureMin"] + '&deg'

  var sixthDay = data["daily"]["data"][5];
    document.getElementById("sixth-day").innerHTML = new Date (sixthDay["time"] *1000).getDate() + "th: " + sixthDay["summary"] + sixthDay ["precipProbability"] + "%" + sixthDay["temperatureMax"] + '&deg' + sixthDay["temperatureMin"] + '&deg'
}



// function displayHourlyForecast(data){
//   const hourly = data['hourly']['data']
//   hourly.forEach(hour => {
//     var time = hour['time'];
//     var temp = hour['temperature'];
//     temp = Math.round(temp);
//
//     var hour_data = `<h3>${time}</h3>
//                 <br><h3><span> ${temp}&#8457 <span></h3>`;
//     let newDiv = document.createElement('div');
//   newDiv.className = ('hourly');
//   newDiv.innerHTML = hour_data;
//   hourly_forecast.appendChild(newDiv);
//   })
// }

// console.log(forecastData['timezone']);
// console.log(forecastData['currently']);
// console.log(forecastData['hourly'])
// console.log(forecastData['daily'])
