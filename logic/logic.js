// Wrap in Document.ready
$(document).ready(function(){
    console.log("Document is Ready");

    // Define Dates For 5 Day Forecast and Group In an Array
    var day0 = dayjs().format("MM/DD/YYYY"); // Day 0 is current day
    var day1 = dayjs().add(1, "day").format("MM/DD/YYYY");
    var day2 = dayjs().add(2, "day").format("MM/DD/YYYY");
    var day3= dayjs().add(3, "day").format("MM/DD/YYYY");
    var day4 = dayjs().add(4, "day").format("MM/DD/YYYY");
    var fiveDayArray = [day0, day1, day2, day3,day4];

    // Define Global Variables
    var ajaxCallSuccess = true;
    var retrievedSearchHistoryArray = [];
    var searchedCity;
    var getLatLonQueryURL;
    var searchedCityLAT;
    var searchedCityLON;
    var getCityWeatherQueryURL;
    
    // Define Event Handlers

        // On Click of the Search button...
        $("#searchButton").on("click", function(e){
            // Prevent reload of page
            e.preventDefault();
            // Re-set the ajax success boolean to true to support error handling
            ajaxCallSuccess = true; 
            // Set the searched city variable to the value submitted in search
            searchedCity = $("#searchedCityInput").val();
            // Invoke the get City Lat Lon Functoin (which runs into the get city weather functoin)
            getCityLatLon();
        });

        // If there is an error of any kind with the AJAX call...
        $(document).ajaxError(function() {
            // Alert the user there was an error...
            alert("This request has failed. Weather information was not found from the source. Please Try Again")
            // Set the ajax call success vairable to false to stop the rest of the process and ensure nothing is saved to search history...
            ajaxCallSuccess = false;
        })

        // On Click of the Clear Search history buton....
        $("#clearSearchHistory").on("click", function() {
            // Empty out local storage...
            localStorage.clear();
            // Clear out all the search history divs appended to the search history ba...
            $("#searchHistoryList").empty();
            // Hide the Clear Search History Button...
            $("#clearSearchHistory").addClass("d-none");
            // Set the searched history array back to nothing...
            retrievedSearchHistoryArray = [""];
                console.log("retrieved search history array after clear = " +retrievedSearchHistoryArray);
        })
        
    // Define Script Logic

        // When page loads OR refreshes...

            // Check if any local storage exists for page...

                // Get values from local storage and assign them to a variable...
                var retrievedSearchHistory = localStorage.getItem("searchedCityHistory");

                // If a there was locally stored items in the search history...
                if (retrievedSearchHistory !== null) {

                    // Parse the retrieved string into individual array items and set it equal to a new variable...
                    retrievedSearchHistoryArray = JSON.parse(retrievedSearchHistory);
                        console.log("Detected numbers of searched cities in history = " + retrievedSearchHistoryArray.length);
                        console.log("retrievedSearchHistoryArray is set to = " + retrievedSearchHistoryArray);

                    // Loop through the arry and place them on the page...
                    for (i=0; i<retrievedSearchHistoryArray.length; i++) {

                        // create a new div with the search city value
                        var newSearchDiv = $("<div>");

                        // Give the new div a class name for bootsrap use list-group-item
                        newSearchDiv.addClass("list-group-item");

                        // Make the text of that item equal to whatever the searched city variable is
                        newSearchDiv.text(retrievedSearchHistoryArray[i]);

                        // APPEND that new div inside the div plceholder in html for searchHistoryList
                        $("#searchHistoryList").append(newSearchDiv);
                    }

                    // Show the clear storage button...
                    $("#clearSearchHistory").removeClass("d-none");

                    // Populate weather information (current and 5 day) for last city searched...

                        // Set searched city variable to the last searched city from the array (which is index 0 since I use array UNSHIFT)...
                        searchedCity = retrievedSearchHistoryArray[0];
                            console.log("Last searched city detected after refresh, prior to getting weather is " + retrievedSearchHistoryArray[0]);
                        
                        // Call the get CityLatLon function which leads into the get weather function...
                        getCityLatLon();
                    
                    // Remove the d-none class for the main containers for current and 5 day forecast...

                } 
                //If no search history is found...
                //else {

                    // Display the welcome DIV that prompts the user to search a city to get started...

                //}
              

        // If I click on a city that is showing in the search history bar...

            // Assign the value text as the value of searched city variable...

            // Run the getCityWeather Function...


        // If I type a city into the search bar and hit search (the click handler that calls this function is defined in the script above)...
        function getCityLatLon(){
            console.log("getCityLatLon invoked");
             $("#searchedCityInput").val(""); // This clears the search bar input...

            // Get the LAT and LON coordinats for the searched city so I can use those for a one-call API for current and forecasted weather...

                // Define the getLatLon query url...
                getLatLonQueryURL= "http://api.openweathermap.org/data/2.5/weather?q="+searchedCity+"&units=imperial&APPID=17d8416444d9b5ae76557381b0e8b7b3";
                    console.log("getLatLonQueryURL set to = " + getLatLonQueryURL);

                // Call the current weather API by city name...
                $.ajax({
                    url:getLatLonQueryURL,
                    method: "GET"
                })

                // Get the city LAT / LON values and assign the global variables the value
                .then(function(resCoordinates){
                    console.log(resCoordinates);
                    searchedCityLAT = resCoordinates.coord.lat;
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
            .then(function(response){

                // CURRENT WEATHER RETRIEVAL AND HANDLING (MAKE OWN FUNCTION?)

                    // Console log the response so I can see how to index
                    console.log(response);
                        
                    // Get the current city name and define it as a variable, then assign it to the right html element...
                    $("#citySearched").text("").text(searchedCity);

                    // Get the current date, then assign it to the right html element...
                    $("#currentDate").text(fiveDayArray[0]);

                    // Get the weather icon for current weather, then assign it to the right html element

                        // Define the src URL for the icon based on the code...
                        var iconCode = response.current.weather[0].icon;
                            console.log("ICON CODE = " + iconCode)
                        var iconURL = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
                            console.log("ICONURL = " + iconURL);

                        // Update the icon img source (src) attribute to this so that it shows an image...
                         $("#currentWeatherIcon").attr("src", iconURL);
                       
                    // Get the current temprature, then assign it to the right html element..
                    $("#currentTemp").text(response.current.temp);

                    // Get the current humidity, then assign it to the right html element...
                    $("#currentHumidity").text(response.current.humidity);
                        
                    // Get the current windspeed and define it as a variable, then assign it to the right html element...
                    $("#currentWindSpeed").text(response.current.wind_speed);
                      
                    // Get the current UV Index and define it as a variable, then assign it to the right html element...
                    $("#currentUVIndex").text(response.current.uvi);
                        currentUVI = response.current.uvi;

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
                        
                    // Call the function below to store city locally and add it to recently searched bar (only if its a new search item, not a historical auto-load)
                    storeAndPrependNewSearchItem();
                    
                // 5 DAY FORECAST (MAKE OWN FUNCTION?)

                    // Get the forecast for the current date, then loop through the activity for each day in the five day forecast...
                    for (i = 0; i<5; i++) {

                        // Get the date "i" starting with the current date, the assign it to the right HTML element based on data-dayIndex attribute
                        $("#day"+i+"date").text(fiveDayArray[i]);

                        // Get the weather forecast icon for the date i, and assign it to the proper html elemenet
                        $("#day"+i+"icon").html(response.daily[i].weather[0].icon);

                        // Get the temp forecast for the date i, and assign it to the proper html element
                        $("#day"+i+"temp").text("Temp: " + response.daily[i].temp.day);

                        // Get the humidity for the date i, and assign it to the proper html element
                        $("#day"+i+"humidity").text("Humidity: " + response.daily[i].temp.day);

                    }     
            }) 
                             
        }
           
        // Function called to store locally and prepend a searched city to the search history bar
        function storeAndPrependNewSearchItem() {
            console.log("storeandprepend function called")

            // Only IF searched city does NOT already exist in the retrievedSearchHistoryArray (which it will if a user just refreshes the screen...)
            var duplicateArrayValueBoolean = retrievedSearchHistoryArray.includes(searchedCity);
                console.log("Does the array already include the searched value? " + duplicateArrayValueBoolean);
            
            if (duplicateArrayValueBoolean === false) {
                //Push searched city into search city array as new index 0 value...
                retrievedSearchHistoryArray.unshift(searchedCity);
                
                // Store the array locally...
                localStorage.setItem("searchedCityHistory", JSON.stringify(retrievedSearchHistoryArray)); 
         
                // create a new div with the search city value
                var newSearchDiv = $("<div>");
         
                // Give the new div a class name for bootsrap use list-group-item
                newSearchDiv.addClass("list-group-item");
         
                // Make the text of that item equal to whatever the searched city variable is
                newSearchDiv.text(searchedCity);
         
                // Prepend that new div inside the div plceholder in html for searchHistoryList
                $("#searchHistoryList").prepend(newSearchDiv);
         
                // Show the clear storage button...
                $("#clearSearchHistory").removeClass("d-none");
                     
            }
       
        }
             

}) // End of Document.Ready Wrap