'use strict';
require('dotenv').config();

const express = require('express');                 
const expressSession = require('express-session');  
const passport = require('passport');              
const LocalStrategy = require('passport-local').Strategy; 
const app = express();
const port = process.env.PORT || 8080;
const minicrypt = require('../server/miniCrypt');

const mc = new minicrypt();

// Session configuration

const session = {
    secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};

// Passport configuration

const strategy = new LocalStrategy(
    async (username, password, done) => {
	if (!findUser(username)) {
	return done(null, false, { 'message' : 'Wrong username' });
	}
	if (!validatePassword(username, password)) {
	await new Promise((r) => setTimeout(r, 2000)); // two second delay
	return done(null, false, { 'message' : 'Wrong password' });
	}
	// success!
	return done(null, username);
    });


// App configuration

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

app.use(express.json()); // allow JSON inputs
app.use(express.urlencoded({'extended' : true})); // allow URLencoded data

/////

// we use an in-memory "database"; this isn't persistent but is easy

console.log(mc.hash('compsci326'));

// let users = { 'emery' : 'compsci326' } // default user
const users = { 'emery' : [
  '2401f90940e037305f71ffa15275fb0d',
  '61236629f33285cbc73dc563cfc49e96a00396dc9e3a220d7cd5aad0fa2f3827d03d41d55cb2834042119e5f495fc3dc8ba3073429dd5a5a1430888e0d115250'
] };

//const userMap = {};

// Returns true iff the user exists.
function findUser(username) {
    if (!users[username]) {
    return false;
    
    
    } else {
	return true;
    }
}

function validatePassword(name, pwd) {
    if (!findUser(name)) {
	return false;
    }
    if (!mc.check(pwd, users[name][0], users[name][1])) {
	return false;
    }
    return true;
}



// Routes
function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
	// If we are authenticated, run the next route.
	next();
    } else {
	// Otherwise, redirect to the login page.
	res.redirect('/login');
    }
}

app.get('/',
	checkLoggedIn,
	(req, res) => {
	res.send("hello world");
	});

// Handle post data from the login.html form.
app.post('/login',
	passport.authenticate('local' , {     // use username/password authentication
	'successRedirect' : '/private',   // when we login, go to /private 
	'failureRedirect' : '/login'      // otherwise, back to login
	}));

// Handle the URL /login (just output the login.html file).
app.get('/login',
	(req, res) => res.sendFile('/login.html',{ 'root' : __dirname }));

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});


/* 
app.post('/register',
	 (req, res) => {
	     const username = req.body['username'];
	     const password = req.body['password'];
	     if (addUser(username, password)) {
		 res.redirect('/login');
	     } else {
		 res.redirect('/register');
	     }
	 });

// Register URL
app.get('/register',
	(req, res) => res.sendFile('html/register.html',
				   { 'root' : __dirname })); */

// Private data
app.get('/private',
	checkLoggedIn, // If we are logged in (notice the comma!)...
	(req, res) => {             // Go to the user's page.
	res.redirect('/private/' + req.user);
	});

// A dummy page for the user.
app.get('/private/:userID/',
	checkLoggedIn, // We also protect this route: authenticated...
	(req, res) => {
	// Verify this is the right user.
	if (req.params.userID === req.user) {
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.write('<H1>HELLO ' + req.params.userID + "</H1>");
		res.write('<br/><a href="/logout">click here to logout</a>');
		res.end();
	} else {
		res.redirect('/private/');
	}
	});

app.use(express.static('html'));

app.get('*', (req, res) => {
  res.send('Error');
});

app.listen(port, () => {
    console.log(`App now listening at http://localhost:${port}`);
});
