// Loads the weather of "Manchester" by default
window.onload = function () {
  requestWeather("Manchester");
};

// When the user presses enter in the searchbar
function enterPressed(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    document.getElementById("searchForCity").click();
  }
}

// Getting the user inputted city name
function searchCity() {
  let city = document.getElementById("searchCity").value;
  requestWeather(city);
  clearInput();
}

// To clear the search field everytime a search is performed
function clearInput() {
  document.getElementById("searchCity").value = "";
}

//To display suitable icon, background, and favicon based on the weather condition
function imagesAndIcons(weatherIcon) {
  if (weatherIcon >= 200 && weatherIcon < 233) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/thunderstorm.png";
    document.querySelector("link[rel='icon']").href =
      "images/weather/thunderstorm.png";
    document.documentElement.style.background =
      "url('images/backgrounds/thunder.jpg') no-repeat center/cover";
  } else if (weatherIcon >= 300 && weatherIcon < 322) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/drizzle.png";
    document.querySelector("link[rel='icon']").href =
      "images/weather/drizzle.png";
    document.documentElement.style.background =
      "url('images/backgrounds/drizzle.jpg') no-repeat center/cover";
    document.documentElement.style.backgroundSize = "1920px 1080px";
  } else if (weatherIcon >= 500 && weatherIcon < 532 && weatherIcon != 511) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/rain.png";
    document.querySelector("link[rel='icon']").href = "images/weather/rain.png";
    document.documentElement.style.background =
      "url('images/backgrounds/rain.jpg') no-repeat center/cover";
    document.documentElement.style.backgroundSize = "1920px 1080px";
  } else if ((weatherIcon >= 600 && weatherIcon < 623) || weatherIcon == 511) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/snow.png";
    document.querySelector("link[rel='icon']").href = "images/weather/snow.png";
    document.documentElement.style.background =
      "url('images/backgrounds/snow.jpg') no-repeat center/cover";
  } else if (weatherIcon >= 701 && weatherIcon < 782) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/mist.png";
    document.querySelector("link[rel='icon']").href = "images/weather/mist.png";
    document.documentElement.style.background =
      "url('images/backgrounds/mist.jpg') no-repeat center/cover";
  } else if (weatherIcon == 800) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/clear_sky.png";
    document.querySelector("link[rel='icon']").href =
      "images/weather/clear_sky.png";
    document.documentElement.style.background =
      "url('images/backgrounds/clear_sky.jpg') no-repeat center/cover";
  } else if (weatherIcon == 801) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/few_clouds.png";
    document.querySelector("link[rel='icon']").href =
      "images/weather/few_clouds.png";
    document.documentElement.style.background =
      "url('images/backgrounds/few_clouds.jpg') no-repeat center/cover";
  } else if (weatherIcon == 802) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/scattered_clouds.png";
    document.querySelector("link[rel='icon']").href =
      "images/weather/scattered_clouds.png";
    document.documentElement.style.background =
      "url('images/backgrounds/scattered_clouds.jpg') no-repeat center/cover";
  } else if (weatherIcon >= 803 && weatherIcon <= 804) {
    document.getElementById("weatherConditionImage").src =
      "images/weather/broken_clouds.png";
    document.querySelector("link[rel='icon']").href =
      "images/weather/broken_clouds.png";
    document.documentElement.style.background =
      "url('images/backgrounds/broken_clouds.jpg') no-repeat center/cover";
  }
}

//Weather details fetching
function requestWeather(city) {
  if (localStorage.getItem("City") != null) {
    document.getElementById("weatherCondition").innerHTML =
      localStorage.WeatherDescription;
    document.getElementById("currentTemp").innerHTML =
      localStorage.TemperatureInCelsius;
    document.getElementById("currentTempF").innerHTML =
      localStorage.TemperatureInFarenheit;
    document.getElementById("currentTempK").innerHTML =
      localStorage.TemperatureInKelvin;
    document.getElementById("cityName").innerHTML = localStorage.CityName;
    document.getElementById("dateAndTime").innerHTML = localStorage.DateAndTime;
    document.getElementById("pressure").innerHTML = localStorage.Pressure;
    document.getElementById("windSpeed").innerHTML = localStorage.WindSpeed;
    document.getElementById("windDirection").innerHTML =
      localStorage.WindDirection;
    document.getElementById("humidity").innerHTML = localStorage.Humidity;
  } else {
    // let apiKey = "16b50b45bab9f9b7112f6c91796c91b1";
    // let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(`http://localhost/WeatherApp3/my-api.php?city=${city}`)
      // Converting response string to json object
      .then((response) => response.json())
      .then((response) => {
        // Displaying whole API response in browser console
        console.log(response);

        //Storing WeatherIcon in localStorage
        localStorage.WeatherIcon = response.weather_icon;
        imagesAndIcons(localStorage.WeatherIcon);

        //Storing Weather Description in localStorage
        localStorage.WeatherDescription = response.weather_description;

        //Storing the current Temperature (in Celsius, Fahrenheit and Kelvin) in localStorage
        localStorage.WeatherTemperatureCelsius = response.weather_temperature_C;
        localStorage.WeatherTemperatureFarenheit =
          response.weather_temperature_F;
        localStorage.WeatherTemperatureKelvin = response.weather_temperature_K;

        //Storing the name of the searched place in localStorage
        localStorage.City = response.city;

        //Storing the date and time of the searched place in localStorage
        localStorage.DateAndTime = response.weather_when;

        //Storing the pressure value in localStorage
        localStorage.Pressure = response.pressure;

        //Storing the wind statistics in localStorage
        localStorage.WindSpeed = response.wind_speed;
        localStorage.WindDirection = response.wind_direction;

        //Storing the humidity in localStorage
        localStorage.Humidity = response.humidity;

        //Setting the data from localStorage to the HTML page
        document.getElementById("weatherCondition").innerHTML =
          localStorage.WeatherDescription;
        document.getElementById("currentTemp").innerHTML =
          localStorage.WeatherTemperatureCelsius + "°C";
        document.getElementById("currentTempF").innerHTML =
          localStorage.WeatherTemperatureFarenheit + "°F";
        document.getElementById("currentTempK").innerHTML =
          localStorage.WeatherTemperatureKelvin + " K";
        document.getElementById("cityName").innerHTML = localStorage.City;
        document.getElementById("dateAndTime").innerHTML =
          localStorage.DateAndTime;
        document.getElementById("pressure").innerHTML =
          "<span>Pressure</span><br>" +
          `<div class="atmosphere">Atmospheric</div> <br><div class="pressureDet">Pressure: ${localStorage.Pressure} hPa</div>`;
        document.getElementById("windSpeed").innerHTML =
          "<span>Wind Details</span> <br> Wind Speed: " +
          localStorage.WindSpeed +
          " m/s";
        document.getElementById("windDirection").innerHTML =
          "Wind Direction: " + localStorage.WindDirection + "°";
        document.getElementById("humidity").innerHTML =
          "<span>Humidity</span><br>" +
          "Humidity Percent: " +
          localStorage.Humidity +
          " %";
      });
  }
}
