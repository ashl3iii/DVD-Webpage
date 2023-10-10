// Class: DAAA/FT/1B/04
// Admission Number: P2237871
// Name: Ashley Bai


// start up set up
1. install all the necessary things like 
- npm install express
- npm install mysql2
- npm install json

2. open mysql server 
- run all the tables in bed_dvd_db and set it as default schema

3. open postman 
- test if code works

4. open terminal
- run node.js 
- node server.js

5. open browser
- key in 'http://localhost:3000/login.html" as a starting page 


// login page for admins (login.html)
- created login endpoint in userDB and app.js with the help of the verifyToken function to authorize user info (pw and username).
- if password and username is not matched and found in mysql database, user will not be allowed to login and an error message will be returned,
refreshing the page.
- if password and username matches and found in mysql database, user will be brought to profile.html page (home page)

// home page (profile.html)
- at the home page, profile details of the user login will be shown.
- users who are admins can choose to add new actor, new customer while users who are not admins will be not allowed to do so.
- all users can logout (returned to login.html page), search for film dvds by entering a substring of the film title, or by categories.
- users can also filter the maximum rental price, showing them which film dvds match their requirements.

// search results page (searchResults.html)
- if customers click the search bar on top of the home page, they will be brought to this page.
- this page shows the film title, release year and rating of the film dvds searched in the search bar.
- from this page, users can click the link in each of the film dvds and they will be brought to a page displaying the full dvd details based on the title of the film they have selected.

// SP DVD Details page (dvd.html)
- this page displays the title, category, release year, description, rating, and actors of the film dvd the user has selected in the search results page.

// add actor (addActor.html)
- when users click on the 'add new actor' button in the home page, they will be brought to this page, allowing them to fill up the first name 
and last name of the new actor.
- with the help of verifyToken, only users who are admins can successfully add an actor in the database, if not an error message will be sent
telling user they have insufficient priviledges.
- they can also logout.

// add customer (addCust.html)
- when users click on the 'add new customer' button in the home page, they will be brought to this page, allowing them to fill up the details of 
new customer.
- similarly, only users who are admins can successfully add an actor in the database, if not an error message will be shown,
telling user they have insufficient priviledges.