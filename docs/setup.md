# To run the server locally:

Pull the project from the master branch.

Create a local database using the commands listed in the databases section of the final.md doc

Change the relevant credentials in dbManagement.js so it finds your local server.

Import the data file data.sql into the database

Run npm i to install all dependencies in vscode

Run server.js with node and go to localhost:8080/


To run through heroku:

Make a heroku app following the steps we did in class. And most importantly, SET THE CONFIG FOR process.env.SECRET in the heroku config. This ensures the database uses a hidden variable to save passwords. Local runs of the database use a dummy password and so the heroku config must be set. 
