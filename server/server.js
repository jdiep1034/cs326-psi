// import { createServer } from 'http';
// import { parse } from 'url';
// import { join } from 'path';
// import { readFileSync, existsSync /*, fs at */ } from 'fs';
const fs = require('fs');
const readFileSync = fs.readFileSync;
const existsSync = fs.existsSync;
const express = require('express');
const faker = require('faker');
const expressSession = require('express-session');  
const passport = require('passport');              
const LocalStrategy = require('passport-local').Strategy; 
const minicrypt = require('../server/miniCrypt');
const mc = new minicrypt();
const session = {
    secret : process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave : false,
    saveUninitialized: false
};
// import express from 'express';
// import path from 'path';
// import faker from 'faker';

const app = express();
const port = process.env.PORT || 8080;
const db = require('../client/dbManagement');
let userFound;
const strategy = new LocalStrategy(
    async (username, password, done) => {
    (async () => {
    console.log("DOING STUFF HERE");
    userFound = await db.findUser(username);
    console.log(userFound);
})();
	if (!userFound) {
	// no such user
	return done(null, false, { 'message' : 'Wrong cred' });
	}
	if (!validatePassword(username, password)) {
	await new Promise((r) => setTimeout(r, 2000)); // two second delay
	return done(null, false, { 'message' : 'Wrong password' });
	}
	// success!
	return done(null, username);
    });

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



//Serve css data
app.use(express.static('public'));
// Serve the webpages
app.use(express.static('client'));


// Serve BrowsePage.html at the root directory
app.get('/', (req, res) => {
    const path = 'client/BrowsePage.html';
    console.log('Trying to serve: BrowsePage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
});

// Dummy testing endpoint that will be removed eventually
app.get('/switches', (req, res) => {
    res.send('Switch data I guess?');
});

// This receives post requests. Dummy response for now.
app.post('/updateParts', (req, res) => {
    res.send('Post Request Received');
});

app.post('/removePart', (req, res) => {
    res.send('Post Request Received');
});

app.get('/userParts', (req, res) => {
    console.log("Trying to send: JSON response data");
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify([
        { id: 34, name: "Gateron Red", type: "linear-switch", cost: faker.commerce.price(), link: faker.internet.url() },
        { id: 132, name: "HyperX Pudding Keycaps", type: "cherry-keycaps", cost: faker.commerce.price(), link: faker.internet.url() },
        { id: 138, name: "Hot-swappable Optical PCB", type: "hot-swap-optical-pcb", cost: faker.commerce.price(), link: faker.internet.url() },
        { id: 382, name: "Coorded USB to USB C cable", type: "cable", cost: faker.commerce.price(), link: faker.internet.url() }]));
    res.end();
    // res.write({'username': 'example-name', 'name': 'Andrew', 'bday': 'The 15th century', 'email': 'example@example.com', 'phone': '500-500-5000'});
});
app.get('/socialGet', (req, res) => {
    console.log("Trying to send: JSON response data");
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify([
        { date: "Oct 14, 2020", email: "john@email.com", bodyText: "I love reds" },
        { date: "Nov 14, 1945", email: "mary@email.com", bodyText: "I can type faster than 100wpm" },
        { date: "Sep 14, 2020", email: "cena@email.com", bodyText: "I type with 2 fingers" },
        { date: "Aug 14, 2020", email: "cocojuice@email.com", bodyText: "I like using vintage keyboards" }]));
    res.end();
    // res.write({'username': 'example-name', 'name': 'Andrew', 'bday': 'The 15th century', 'email': 'example@example.com', 'phone': '500-500-5000'});
});
function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
	// If we are authenticated, run the next route.
	next();
    } else {
        res.redirect('/');
    }
}

function blob() {
    const imgSource = "https://cdn.shopify.com/s/files/1/1473/3902/products/658baabe15b30353f6c8386a00a112e1_52ab83c4-011c-41cf-b07e-df27d5038d0a_large.jpg?v=1584436526";
    const imgDesc = faker.commerce.productDescription();
    const name = faker.commerce.productName();
    const id = faker.random.number();
    const desc = faker.commerce.productDescription();
    const price = faker.commerce.price();
    return { imgSource: imgSource, imgDesc: imgDesc, name: name, id: id, desc: desc, price: price };
}
function writeBlob(res) {
    const array = [];
    for (let i = 0; i < 10; i++) {
        array.push(blob());
    }
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify(array, null, 2));
    return;
}
// const x = {imgSource : "asdfoiwje.com", imgDesc : "picture of part", name : "name of part", id: unique id number, desc : "part description"}
app.get('/caseProducts', (req, res) => {
    writeBlob(res);
    res.end();
});
app.get('/pcbProducts', (req, res) => {
    writeBlob(res);
    res.end();
});
app.get('/keySwitchProducts', (req, res) => {
    writeBlob(res);
    res.end();
});
app.get('/keyCapProducts', (req, res) => {
    writeBlob(res);
    res.end();
});
app.get('/cableProducts', (req, res) => {
    writeBlob(res);
    res.end();
});
app.get('/userInfo', (req, res) => {
    console.log("Trying to send: JSON response data");
    res.writeHead(200, { 'Content-Type': 'text/json' });
    const username = faker.internet.userName();
    const name = faker.name.findName();
    const date = faker.date.past();
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber();
    // res.write(String.raw`{ "username": ${username}, "name": ${name}, "bday": ${date}, "email": ${email}, "phone": ${phone} }`);
    res.write(JSON.stringify({ username: username, name: name, bday: date, email: email, phone: phone }));
    res.end();
});
/* const users = { 'emery' : [
  '2401f90940e037305f71ffa15275fb0d',
  '61236629f33285cbc73dc563cfc49e96a00396dc9e3a220d7cd5aad0fa2f3827d03d41d55cb2834042119e5f495fc3dc8ba3073429dd5a5a1430888e0d115250'
] }; */

 /* function findUser(email) {
    if (!userFound) {
	return false;
    } else {
	return true;
    }
}  */

function validatePassword(name, pwd) {
    console.log(name)
    console.log(pwd)
    if (!userFound) {
        console.log("why is it wrong here");
	return false;
    }
    const salt = userFound.find(item => item.username === name).salt;
    const hashedPwd = userFound.find(item => item.username === name).hashedPwd;
    console.log(salt);
    console.log(hashedPwd);
    if (!mc.check(pwd, salt, hashedPwd)) {
	return false;
    }
    return true;
}

app.get('/',
	checkLoggedIn,
	(req, res) => {
        console.log("CHecking login");
        res.send("hello world");
	}); 

// Handle post data from the login.html form.
app.post('/login',
passport.authenticate('local' , {     // use username/password authentication
'successRedirect' : '/profilePage.html',   // when we login, go to /private 
'failureRedirect' : '/InfoPage.html'      // otherwise, back to login
}));

// Handle the URL /login (just output the login.html file).
app.get('/login',
	(req, res) => res.sendFile('client/login.html',{ 'root' : __dirname }));

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});
/* app.get('/private/:userID/',
	checkLoggedIn, // We also protect this route: authenticated...
	(req, res) => {
	if (req.params.userID === req.user) {
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.write('<H1>HELLO ' + req.params.userID + "</H1>");
		res.write('<br/><a href="/logout">click here to logout</a>');
		res.end();
	} else {
		res.redirect('/profilePage/');
	}
	}); */


app.listen(port, () => {
    console.log('Server listening on port:', port);
});


// This just here for testing purposes.
(async () => {
    console.log("DOING STUFF HERE");
    const r = await db.getCables();

    console.log(r);
})();