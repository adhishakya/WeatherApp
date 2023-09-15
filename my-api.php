<?php
// Connect to database
$localhost = "localhost";
$user = "demo";
$password = "demo";
$database = "weather_2226429";
//Connecting to the database
$connection = mysqli_connect($localhost, $user, $password, $database);
//API 
$api = "";
$date_api = "";
$url = "https://api.openweathermap.org/data/2.5/weather?q=" . $_GET['city'] . "&appid=" . $api . "&units=metric";
//Fetching the data from the weather api
$fetched = file_get_contents($url);
//Converting the fetched data to json format
$response = json_decode($fetched);
//Latitude and Longitude
$longitude = $response->coord->lon;
$latitude = $response->coord->lat;
// echo $latitude;
$time_url = "http://api.timezonedb.com/v2.1/get-time-zone?key=" . $date_api . "&format=json&by=position&lat=" . $latitude . "&lng=" . $longitude;
$fetched_time = file_get_contents($time_url);
$response_time = json_decode($fetched_time);
//Weather icon
$weather_icon = $response->weather[0]->id;
//City name
$city = $response->name;
//Weather Description
$condition = $response->weather[0]->description;
//Weather temperature
$temperature = $response->main->temp;
//Weather temperature in Farenheit
$farenheit = $temperature * 1.8 + 32;
//Weather temperature in Kelvin
$kelvin = $temperature + 273.15;
//Date and Time
$date_and_time = $response_time->formatted;
//Pressure
$pressure = $response->main->pressure;
//Wind Speed
$wind_speed = $response->wind->speed;
//Wind direction
$wind_deg = $response->wind->deg;
//Humidity
$humidity = $response->main->humidity;
// Establishing connection 
//If database cannot be connected 
if (!$connection) {
    die("<b>Connection to database failed</b><br>" . mysqli_connect_error());
}
$insert_sql = mysqli_query($connection, "INSERT INTO weather (city,weather_description,weather_temperature_C,weather_temperature_F,weather_temperature_K,pressure,wind_speed,wind_direction,humidity,weather_when,weather_icon) VALUES('$city','$condition',$temperature,$farenheit,$kelvin,$pressure,$wind_speed,$wind_deg,$humidity,'$date_and_time','$weather_icon')") or die(mysqli_error($connection));
$data_fetch = mysqli_query($connection, "SELECT * FROM weather ORDER BY sn DESC limit 1");
$db_data = $data_fetch->fetch_assoc();
print json_encode($db_data);
$connection->close();
