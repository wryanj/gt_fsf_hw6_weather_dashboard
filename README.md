# gt_fsf_hw6_weather_dashboard
This assignment asked us to create a weather dashboard that could retrieve and display weather information by city name upon a user search. We were given no starter code from this so the html, css, and javascript was all coded from scratch. As with all assignments in the flex course, I completed the assignment requirements and added a few extras. However, had I had more time (or had this been a real world application) there would be additional validation and responsive work I would have completed.

## Table of Contents

1.  [Deployed Application](#Deployed-Applicatoin)
2.  [Motivation](#Motivation)
3.  [Description](#Description)
4.  [Credits](#Credits)

## Deployed Application
[https://wryanj.github.io/gt_fsf_hw6_weather_dashboard/]

## Motivation
I did this to progress my knowledge on working with third party apis and JSON. I also further improved my comfort working with Jquery for dynamically creating and manipulating html elements and related attributes. 

## Description
For this assignment, I took the example image as a guideline for my U.I but made some of my own customizations and additions. I used bootstrap 4.5 to complete almost all of my styling needs. In addition to the assignment requirements, I added some extras like a clear search button and recently searched header that display or vanish based on weather there is a search history to display. In addition I created taller five day forecast cards, and added some shadow to the main containers for current and future weather:

![image](https://user-images.githubusercontent.com/72420733/106056080-43a5f580-60bc-11eb-883a-0ff617e9ecd7.png)

UV index was color coded based on its value from low to high with 4 total tier options:

![image](https://user-images.githubusercontent.com/72420733/106056330-8a93eb00-60bc-11eb-9db4-ee545976439c.png)

![image](https://user-images.githubusercontent.com/72420733/106056382-9aabca80-60bc-11eb-8448-2373ccbf3471.png)

Lastly, I made it such that if the user has never been to the site (or has no search history), they are given a welcome screen instructing them to make a first search. This displays based on whether local storage exists for the user:

![image](https://user-images.githubusercontent.com/72420733/106056465-b3b47b80-60bc-11eb-994e-097a459d5656.png)

In terms of API's, I used the open weather API reccomended for the assignment in addition the day JS api for providing dates for the dynamic five day forecast. 

For the open weather API, I make two calls per city search. The first calls one of their current API which lets me easily convert my city into LAT / LON values recognized by their system. Then I use lat long to create another query that returns there one call API including all the information I need for both the current and five day weather data (doing this call seemed to only accept a search by LAT / LON coordinates). To the user, this is all happening in one motion. The get city lat / lon function runs into the get city weather function:

![image](https://user-images.githubusercontent.com/72420733/106054950-b3b37c00-60ba-11eb-80de-72e2d68a8c88.png)

For error handling, I validate that the response from the API was received but that's it. Had this been a real application I would make sure to specify in more detail the cause of the error, but for now I just notify the user the search was not successful:

![hw6 img4](https://user-images.githubusercontent.com/72420733/106055073-e493b100-60ba-11eb-8561-01904c01457e.PNG)

When making the API calls, I console logged the query URL I generated rather than the object response itself. This is just because I could click that link to have a cleaner, bigger view of the returned JSON object so I can figure out how to access the information I need:

![hw6 img3](https://user-images.githubusercontent.com/72420733/106055374-46ecb180-60bb-11eb-8096-3b6832e21906.PNG)


**Note** The application is responsive, but it does not look good at certain viewports below 1200px. Again, had this been a assignment requirement or real life I would have made adjustments or additional media queries to ensure it looked good on all viewports and mobile devices. The focus for this assignment was more heavily on usage of API and our js scripts.

## Credits
I utilized some stack, w3 schools, mozilla, jQuery documentation and class notes to completed this work. The approach I took was all my own logic. I also utilized the open weather api docs and some more day js docs.
