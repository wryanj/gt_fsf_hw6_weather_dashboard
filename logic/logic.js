// Wrap in Document.ready
$(document).ready(function(){
console.log("Document is Ready");

    // Define 5 Day Dates (Today + 4 Days) Using Day.JS API
    var currentDate = dayjs().format("MM/DD/YYYY"); // Retrieved via Day.Js API
        console.log("Current Date logged as = " + currentDate);
    var day2 = dayjs().add(1, "day").format("MM/DD/YYYY");
        console.log("Day two logged as = " + day2);
    var day3 = dayjs().add(2, "day").format("MM/DD/YYYY");
        console.log("Day two logged as = " + day3);
    var day4 = dayjs().add(3, "day").format("MM/DD/YYYY");
        console.log("Day two logged as = " + day4);
    var day5 = dayjs().add(4, "day").format("MM/DD/YYYY");
        console.log("Day two logged as = " + day5);

    // Define Global Variables
    var ajaxCallSuccess = true;
    var searchedCity;
    var getLatLonQueryURL;
    var searchedCityLAT;
    var searchedCityLON;
    var getCityWeatherQueryURL;
    

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

        // If I type a city into the search bar and hit search (the click handler that calls this function is defined in the script above)...
        function getCityLatLon(){
        console.log("getCityLatLon invoked");

            // Get the LAT and LON coordinats for the searched city so I can use those for a one-call API for current and forecasted weather...

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

        // After the search button is clicked, and the function is run that gets LAT / LON Coordinates for my city....
        function getCityWeather() {
        console.log("getCityWeather function invoked");

            // Check that searchedCity value and coordinates defined are  still the same...
            console.log ("Searched City Value upon invokation of getCityWeather function is = " + searchedCity);
            console.log ("City Lat Lon Translation Upon Invokation of Secont API Call = " + searchedCityLAT + "," + searchedCityLON);
            
            // Define the getCityWeatherURL based on the searched city and its related lat lon coordinates...
            getCityWeatherQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+searchedCityLAT+"&lon="+searchedCityLON+"&exclude=minutely,hourly,alerts&units=imperial&appid=17d8416444d9b5ae76557381b0e8b7b3";
                console.log("getCityWeather query URL variable set = " + getCityWeatherQueryURL);

            // Make the One-Call API Call to Open weather to get current and forecasted weather information for that City...
            $.ajax({
                url:getCityWeatherQueryURL,
                method: "GET"
            })

            // Then get the needed information and update the appropriate on-screen elements
            .then(function(resCurrent){

                // CURRENT WEATHER RETRIEVAL AND HANDLING (MAKE OWN FUNCTION?)

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
                        currentUVI = resCurrent.current.uvi;

                        // Set the UV index pill the right color based on the value of being Low,Moderate,High,VeryHigh...

                            // Set to Low (Green)
                            if (currentUVI<3) {
                                $("#uviPill").removeClass("badge-primary badge-warning badge-danger");
                                $("#uviPill").addClass("badge-success");
                            }

                            // Set to Moderate (Blue)
                            if (currentUVI>3 && currentUVI<6) {
                                $("#uviPill").removeClass("badge-success badge-warning badge-danger");
                                $("#uviPill").addClass("badge-primary");
                            }

                            // Set to High (Yellow)
                            if (currentUVI>6 && currentUVI<8) {
                                $("#uviPill").removeClass("badge-success badge-primary badge-danger");
                                $("#uviPill").addClass("badge-warning");
                            }

                            // Set to Very High (Red)
                            if (currentUVI>8) {
                                $("#uviPill").removeClass("badge-success badge-warning badge-primary");
                                $("#uviPill").addClass("badge-danger");
                            }
                        
                    // Call the function below to store city locally and add it to recently searched bar
                    storeAndPrependNewSearchItem();
                
                // 5 DAY FORECAST (MAKE OWN FUNCTION?)

                    // Get the forecast for the current date, then loop through the activity for each day in the five day forecast...
                    for (i = 0; i<resCurrent.daily.length; i++) {

                        // Get the date "i" starting with the current date, the assign it to the right HTML element based on data-dayIndex attribute

                        // Get the weather forecast icon for the date i, and assign it to the proper html elemenet

                        // Get the temp forecast for the date i, and assign it to the proper html element

                        // Get the humidity for the date i, and assign it to the proper html elemene

                    }     

            }) 
                    
                    
        }
           
        // Function called to store locally and prepend a searched city to the search history bar
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