// Wrap in Document.ready
$(document).ready(function(){
console.log("Document is Ready");

    // Define Global Variables
    var ajaxCallSuccess = true;
    var searchedCity;
    var currentQueryURL;
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
            getCityWeather();
        });

        //AJAX error event if ajax call fails for any reason
        $(document).ajaxError(function() {
            alert("This request has failed. Weather information was not found from the source. Please Try Again")
            ajaxCallSuccess = false;
            console.log("ajax call success variable set to = " + ajaxCallSuccess);
        })

    // Define Script Logic

        // When page loads...

            // Retrive prior city search history (from local storage) and display under search bar...

            // Populate weather information (current and 5 day) for last city searched...

        // If I click on a city that is showing in the search history bar...

            // Assign the value text as the value of searched city variable...

            // Run the getCityWeather Function...

        // When I type a city into the search bar and hit search (the click handler that calls this function is defined in the script above)...
        function getCityWeather() {

            // Capture the value of the entry and assign it as the value to my searchedCity variable
            searchedCity = $("#searchedCityInput").val();
                console.log ("Searched City Value = " + searchedCity);
 
            // Define the currentQueryURL based on the searched city...
            currentQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=17d8416444d9b5ae76557381b0e8b7b3"; //UPDATE WITH CONCAT
                console.log("currentQueryURL variable set = " + currentQueryURL);

            // Make an API calls to get the latest weather information from OpenWeather API...

                // (AJAX1) Get the informatoin for the CURRENT weather and add it to the screen...

                    // Request the current information from the API...
                    $.ajax({
                        url:currentQueryURL,
                        method: "Get"
                    })
                    // Then (assuming the ajax call gave a valid response) add the needed information to the proper screen elements for current weather...
                    .then(function(resCurrent){

                        // Console log the response so I can see how to index
                        console.log(resCurrent);

                        // Validate it returned a response that is usable... (Look at if I need more here beside the alert if ajax fails)

                            // If response is not valid update ajax call success value to false and break the loop

                            // If response is valid, continue...
                        
                        // Get the current city name and define it as a variable, then assign it to the right html element...
                        $("#citySearched").text("").text(searchedCity);

                        // Get the current date, then assign it to the right html element...
                        $("#currentDate").text(currentDate);

                        // Get the weather icon for current weather, then assign it to the right html element
                        $("#currentWeatherIcon").html(resCurrent.weather[0].icon);
                            console.log("Icon API result = " + resCurrent.weather[0].icon);

                        // Get the current temprature, then assign it to the right html element..
                        $("#currentTemp").text(resCurrent.main.temp);
                            console.log("Temp API result = " + resCurrent.main.temp);

                        // Get the current humidity, then assign it to the right html element...
                        $("#currentHumidity").text(resCurrent.main.humidity);
                            console.log("Humidity API result = " + resCurrent.main.humidity);

                        // Get the current windspeed and define it as a variable, then assign it to the right html element...
                        $("#currentWindSpeed").text(resCurrent.wind.speed);
                            console.log("Current Wind Speed API Result = " + resCurrent.wind.speed);

                        // Get the current UV Index and define it as a variable, then assign it to the right html element...
                        $("#currentUVIndex").text("Cant Find in API...follow up");

                            // Set the UV index pill the right color based on the value of being good, medium, bad...
                        
                        // Call the function below to store city locally and add it to recently searched bar
                        storeAndPrependNewSearchItem();

                    })     
                    
                // (AJAX2) Get the informatoin for the FIVE DAY FORECAST weather and add it to the screen...

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