// Wrap in Document.ready
$(document).ready(function(){
console.log("Document is Ready");

    // Define Global Variables
    var ajaxCallSuccess = true;
    var searchedCity;
    var currentQueryURL;
    var fiveDayQueryURL;

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
                console.log("searchedCity variable set = " + searchedCity);
 
            // Define the currentQueryURL based on the searched city...
            currentQueryURL = "api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=17d8416444d9b5ae76557381b0e8b7b3";
                console.log("currentQueryURL variable set = " + currentQueryURL);

            // Make an API calls to get the latest weather information from OpenWeather API...

                // (AJAX1) Get the informatoin for the CURRENT weather and add it to the screen...

                    // Request the current information from the API...
                    $.ajax({
                        url:currentQueryURL,
                        method: "Get"
                    })
                    // Then add the needed information to the proper screen elements for current weather...
                    .then(function(resCurrent){

                        // Console log the response object so I can see how to index into it
                        console.log("API Call Object Returned = " + resCurrent);

                        // Validate it returned a response that is usable... (Look at if I need more here beside the alert if ajax fails)

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
                    
                // (AJAX2) Get the informatoin for the FIVE DAY FORECAST weather and add it to the screen...

                    // Request the forecast information from the API

                    // Get the forecast for the current date, then loop through the activity for each day in the five day forecast...

                        // Console log the response object so I can see how to index into it

                        // Get the date "i" starting with the current date, the assign it to the right HTML element

                        // Get the weather forecast icon for the date i, and assign it to the proper html elemenet

                        // Get the temp forecast for the date i, and assign it to the proper html element

                        // Get the humidity for the date i, and assign it to the proper html elemene

        }
           

            // If the ajax call yielded some results...Store the searched city to local storage and display it's name in the search history bar (else do nothing)
            function saveSearchedCityLocally() {
                if (ajaxCallSuccess === true) {

                    // Log the searched city to the local storage (if it gave a valid response, e.x no typos or not an error)- use name as key
                    localStorage.setItem(searchedCity, searchedCity);
    
                    // Create a new element in the search bar history column and Prepend it to the list...
                }
            }
         
            
                       

}) // End of Document.Ready Wrap