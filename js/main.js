function convertUnixTimestamp(unix_timestamp) {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	var date = new Date(unix_timestamp*1000);
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	// // Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedTime;
}

function dataLoaded(data)
{
	console.log(data);

	var units = $("input[name='units']:checked").val();
	if(units === "imperial")
	{
		console.log("Temp: " + data.main.temp + "&deg;F");
		$("#temp").html(data.main.temp + "&deg;F");
	}
	else
	{
		console.log("Temp: " + data.main.temp + "&deg;C");
		$("#temp").html(data.main.temp + "&deg;C");
	}

	// Weather description
	console.log("Description: " + data.weather[0].description);
	$("#description").html(data.weather[0].description);

	// Humidity
	console.log("Humidity: " + data.main.humidity);
	$("#humidity").html(data.main.humidity);

	// Coordinates
	console.log("Coordinates: " + data.coord.lat + ", " + data.coord.lon);
	$("#coordinates").html(data.coord.lat + ", " + data.coord.lon);

	// Bonus - print sunrise & sunset times in a readable format
	console.log("Sunset: " + convertUnixTimestamp(data.sys.sunset));
	$("#sunset").html(convertUnixTimestamp(data.sys.sunset));

	console.log("Sunrise: " + convertUnixTimestamp(data.sys.sunrise));
	$("#sunrise").html(convertUnixTimestamp(data.sys.sunrise));
}

function getWeather(event) {
	// Prevent default form behavior
	event.preventDefault();

	// Make the AJAX call
	$.getJSON("http://api.openweathermap.org/data/2.5/weather", 
		{
			appid: "84bee75ccc48d73cd18de3a8c2d85c8e",
			q: $("#city").val(),
			units: $("input[name='units']:checked").val()
		}, dataLoaded);
}

$("#weather-widget").submit(getWeather);