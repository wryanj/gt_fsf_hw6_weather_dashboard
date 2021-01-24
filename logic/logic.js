// Wrap in Document.ready
$(document).ready(function(){
console.log("Document is Ready");

    // Define Global Variables
    var searchedCity;
    var currentQueryURL;
    var fiveDayQueryURL;

    // Define Click Handlers
    $("#searchButton").on("click", function(e){
        e.preventDefault();
        console.log("Search Click Detected");
        getCurrentCityWeather();
    });

    // Define Script Logic

        // When page loads...

            // Retrive prior city search history (from local storage) and display under search bar...

            // Populate weather information (current and 5 day) for last city searched...

        // When I type a city into the search bar and hit search...
        function getCurrentCityWeather() {
             // Capture the value of the entry and assign it as the value to my searchedCity variable
             searchedCity = $("#searchedCityInput").val();
             console.log("searchedCity variable set = " + searchedCity);
 
            // Define the currentQueryURL based on the searched city...

            // Make an API calls to get the latest weather information from OpenWeather API...

                // (AJAX1) Get the informatoin for the CURRENT weather and add it to the screen...

                /* // Request the current information from the API...
                    $.ajax({
                        url:currentQueryURL,
                        method: "Get"
                    })
                    // Then add the needed information to the proper screen elements for current weather...
                    .then(function(resCurrent){

                        // Console log the response object so I can see how to index into it

                        // Validate it returned a response that is usable...

                            // If yes, continue

                            // If no, alert error message and re-promt to search again

                        // Get the current city name and define it as a variable, then assign it to the right html element...

                        // Get the curren date and define it as a variable, then assign it to the right html element...

                        // Get the weather icon for current weather and define as a variable, then assign it to the right html element

                        // Get the current temprature and define it as a variable, then assign it to the right html element..

                        // Get the current humidity and define it as a variable, then assign it to the right html element...

                        // Get the current windspeed and define it as a variable, then assign it to the right html element...

                        // Get teh current UV Index and define it as a variable, then assign it to the right html element...

                            // Set the UV index pill the right color based on the value of being good, medium, bad...

                    }) 
                    */
        }
           

                        
                    

                // (AJAX2) Get the informatoin for the FIVE DAY FORECAST weather and add it to the screen...

                    // Request the forecast information from the API

                    // Get the forecast for the current date, then loop through the activity for each day in the five day forecast...

                        // Console log the response object so I can see how to index into it

                        // Get the date "i" starting with the current date, the assign it to the right HTML element

                        // Get the weather forecast icon for the date i, and assign it to the proper html elemenet

                        // Get the temp forecast for the date i, and assign it to the proper html element

                        // Get the humidity for the date i, and assign it to the proper html elemenet
                
            // Store the searched city to local storage and display it's name in the search history bar...
                
                // Log the searched city to the local storage (if it gave a valid response, e.x no typos or not an error)- use name as key

                // Create a new element in the search bar history column and Prepend it to the list...



})