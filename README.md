# workouttracker

Description
-----------
A basic web app running on node & utilizing MongoDB w/ Mongoose that allows the user to create and track daily workouts.

Installation
------------
You must first run npm i to install the apps dependencies, then start up the application by running node server.js. The app runs at http://localhost:8000; If you would like to seed the database with some basic workouts, run npm run seed in the terminal - this inserts the values defined in 'seeders/seed.js'.

Usage
-----
Once the app is running, it will display your most recent workout on the home page (if applicable). From here you can create a new workout, or continue your current workout. In both cases, you will be prompted to enter in new exercise information - once entered, you can click "Complete" to return to the home page, or "Add Exercise" to submit the entry and add another.

To view your last weeks worth of exercises, click "Dashboard".
