# Online Quiz Application

## About this application
This is an online quiz application for my tutoring part time. I found marking the practice tests time consuming, so I intented to create an application for me to upload questions and my students can practise as much as they want. 

This is a RESTful Api that is connected to a mysql database (details in database-setup repository). The application includes making post requests to save the users / students' answers, their name, and score. The application also uses get requests to fetch questions and user id from the database. Apart from making http requests between client and server, I also make use of local storage of the Window Storage Api to store the user id and his / her score temporarily. 

The id of the current user and his / her score should be a transparent data to the client, so it would more efficient if I just store and retrieve them from local storage compared to fetching the id and score from the database at the result page. 

## Hosted Website on GitHub
https://taylortl.github.io/online-quiz/ \
<img width="500" alt="image" src="https://user-images.githubusercontent.com/91409130/168538504-1d7dce58-ccca-4021-9bd1-22d5d1c04ee1.png">

## Implemented Using:
- HTML
- JavaScript
- CSS 

## Reference
Loading animation: https://www.freecodecamp.org/news/how-to-create-a-css-only-loader/ \
Quiz Questions: https://opentdb.com/api_config.php


