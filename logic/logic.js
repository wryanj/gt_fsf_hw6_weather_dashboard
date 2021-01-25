// Wrap in Document.ready
$(document).ready(function(){
console.log("Document is Ready");

    // Define Global Variables
    var ajaxCallSuccess = true;
    var searchedCity;
    var getLatLonQueryURL;
    var searchedCityLAT;
    var searchedCityLON;
    var getCityWeatherQueryURL;
    var fiveDayQueryURL;
    var currentDate = dayjs().format("dddd, MMMM D");

    // Define Event Handlers
        //Click Event For Search Button
        $("#searchButton").on("click", function(e){
            e.preventDefault();
            console.log("NEW Search Click Detected");
            ajaxCallSuccess = true; // This resets the status check I will use before saving something locally. Its set to false if the ajax call fails.
                console.log("ajax call success variable after initial search button press = " + ajaxCallSuccess);
            searchedCity = $("#searchedCityInput").val();
            getCityLatLon();
        });

        //AJAX error event if ajax call fails for any reason
        $(document).ajaxError(function() {
            alert("This request has failed. Weather information was not found from the source. Please Try Again")
            ajaxCallSuccess = false;
            console.log("ajax call success variable set to = " + ajaxCallSuccess);
        })

        // Click Event For Clear Search History Button
        $("#clearSearchHistory").on("click", function() {
            localStorage.clear();
            $("#searchHistoryList").empty();
        })
        
    // Define Script Logic

        // When page loads...

            // Retrive prior city search history (from local storage) and display under search bar...

            // Populate weather information (current and 5 day) for last city searched...

        // If I click on a city that is showing in the search history bar...

            // Assign the value text as the value of searched city variable...

            // Run the getCityWeather Function...

        // When I type a city into the search bar and hit search (the click handler that calls this function is defined in the script above)...
        function getCityLatLon(){
        console.log("getCityLatLon invoked");

            // Get the lat / lon of the entered city so I can do a one pull API with open weather

                // Define the getLatLon query url...
                getLatLonQueryURL= "http://api.openweathermap.org/data/2.5/weather?q="+searchedCity+"&units=imperial&APPID=17d8416444d9b5ae76557381b0e8b7b3";
                    console.log("getLatLonQueryURL set to = " + getLatLonQueryURL);

                // Call the current weather API by city name...
                $.ajax({
                    url:getLatLonQueryURL,
                    method: "GET"
                })
                .then(function(resCoordinates){
                    console.log(resCoordinates);

                    // Get the city LAT / LON values and assign the global variables the value
                    searchedCityLAT = JSON.stringify(resCoordinates.coord.lat);
                    searchedCityLON = resCoordinates.coord.lon;
                    console.log ("Initial City Lat-Lon Translation after First API Call = " + searchedCityLAT + "," + searchedCityLON);

                    // When I complete the call above and define lat lon, Call the functoin to run the one-Call API from open weather (which requires search by city Lat / Lon)...
                    getCityWeather();
                })  
        }

        function getCityWeather() {
        console.log("getCityWeather function invoked");
            console.log ("City Lat Lon Translation Upon Invokation of Secont API Call = " + searchedCityLAT + "," + searchedCityLON);

            // Check that searchedCity value is still the same...
            console.log ("Searched City Value upon invokation of getCityWeather function is = " + searchedCity);
            
            // Define the currentQueryURL based on the searched city...
            getCityWeatherQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+searchedCityLAT+"&lon="+searchedCityLON+"&exclude=minutely,hourly,alerts&units=imperial&appid=17d8416444d9b5ae76557381b0e8b7b3";
                console.log("getCityWeather query URL variable set = " + getCityWeatherQueryURL);

            // Make the One-Call API Call to Open weather to get current and forecasted weather information...

                    // Request the current information from the API...
                    $.ajax({
                        url:getCityWeatherQueryURL,
                        method: "GET"
                    })
                    // Then (assuming the ajax call gave a valid response) add the needed information to the proper screen elements for current weather...
                    .then(function(resCurrent){

                        // CURRENT WEATHER RETRIEVAL AND HANDLING

                        // Console log the response so I can see how to index
                        console.log(resCurrent);
                        
                        // Get the current city name and define it as a variable, then assign it to the right html element...
                        $("#citySearched").text("").text(searchedCity);

                        // Get the current date, then assign it to the right html element...
                        $("#currentDate").text(currentDate);

                        // Get the weather icon for current weather, then assign it to the right html element
                        $("#currentWeatherIcon").html(resCurrent.current.weather[0].icon);
                            console.log("Icon API result = " + resCurrent.current.weather[0].icon);

                        // Get the current temprature, then assign it to the right html element..
                        $("#currentTemp").text(resCurrent.current.temp);
                            console.log("Temp API result = " + resCurrent.current.temp);

                        // Get the current humidity, then assign it to the right html element...
                        $("#currentHumidity").text(resCurrent.current.humidity);
                            console.log("Humidity API result = " + resCurrent.current.humidity);

                        // Get the current windspeed and define it as a variable, then assign it to the right html element...
                        $("#currentWindSpeed").text(resCurrent.current.wind_speed);
                            console.log("Current Wind Speed API Result = " + resCurrent.current.wind_speed);

                        // Get the current UV Index and define it as a variable, then assign it to the right html element...
                        $("#currentUVIndex").text(resCurrent.current.uvi);
                            console.log("Current UVI Result = " + resCurrent.current.uvi)

                            // Set the UV index pill the right color based on the value of being good, medium, bad...
                        
                        // Call the function below to store city locally and add it to recently searched bar
                        storeAndPrependNewSearchItem();

                    })     
                    
                // 5 DAY FORECAST

                    // Request the forecast information from the API

                    // Get the forecast for the current date, then loop through the activity for each day in the five day forecast...

                        // Console log the response object so I can see how to index into it

                        // Get the date "i" starting with the current date, the assign it to the right HTML element

                        // Get the weather forecast icon for the date i, and assign it to the proper html elemenet

                        // Get the temp forecast for the date i, and assign it to the proper html element

                        // Get the humidity for the date i, and assign it to the proper html elemene

        }
           
        // Doing this in a global function to work on code block before moving into a function to be come depdent on the function status
        // Create an array to loop through instead of doing it one by one?? So I can run this loop when page loads?
        function storeAndPrependNewSearchItem() {
            console.log("storeandprepend function called")

            // store value locally
            localStorage.setItem("City_"+ searchedCity, searchedCity); 

            // create a new div with the search city value
            var newSearchDiv = $("<div>");

            // Give the new div a class name for bootsrap use list-group-item
            newSearchDiv.addClass("list-group-item");

            // Make the text of that item equal to whatever the searched city variable is
            newSearchDiv.text(searchedCity);

            // Prepend that new div inside the div plceholder in html for searchHistoryList
            $("#searchHistoryList").prepend(newSearchDiv);
            
        }

      
            
                       

}) // End of Document.Ready Wrap