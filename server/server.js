// File Stream stuff
// const fs = require('fs');
// const readFileSync = fs.readFileSync;
// const existsSync = fs.existsSync;

// server webpage serving and endpoint handling
const express = require('express');
const expressSession = require('express-session');

// data faking
const faker = require('faker');

// Login system
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const minicrypt = require('../server/miniCrypt');
const mc = new minicrypt();

const session = {
    secret: process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave: false,
    saveUninitialized: false
};


// Database operations
const db = require('../client/dbManagement');

const app = express();
const port = process.env.PORT || 8080;

// let userFound;
let user; // TODO, Make this not global.



const strategy = new LocalStrategy(
    async (username, password, done) => {

        // First look for user in database
        const dbQuery = await db.findUser(username);

        // console.log(userFound);

        // if user is not found
        if (dbQuery.length === 0) { // pretty sure we move the below if statement up here for error checking
            return done(null, false, { 'message': 'Wrong cred' });

        }
        // Set the global user. This is really bad and I need to figure out how to fix it
        user = dbQuery.find(item => item.username === username);

        if (!validatePassword(username, password, user)) {
            await new Promise((r) => setTimeout(r, 2000)); // two second delay
            return done(null, false, { 'message': 'Wrong password' });
        }
        // success!
        return done(null, username);
    });

function validatePassword(username, pwd, sqlUser) {
    const salt = sqlUser.salt;
    const hashedpwd = sqlUser.hashedpwd;

    if (!mc.check(pwd, salt, hashedpwd)) {
        return false;
    }
    return true;
}

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
app.use(express.urlencoded({ 'extended': true })); // allow URLencoded data



// Serve css data
app.use(express.static('public'));
// Serve the webpages
app.use(express.static('client'));


// Serve BrowsePage.html at the root directory

// app.get('/', (req, res) => {
//     const path = 'client/BrowsePage.html';
//     console.log('Trying to serve: BrowsePage');
//     if (existsSync(path)) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(readFileSync(path));
//         res.end();
//     }
//     // res.send(readFileSync(path));
// });

// Dummy testing endpoint that will be removed eventually
app.get('/switches', (req, res) => {
    res.send('Switch data I guess?');
});


let build = {
    pcb: null,
    case: null,
    switch: null,
    keycap: null,
    cable: null
};

// This receives post requests. Dummy response for now.
// TODO: Have this return the proper database entry.
app.post('/updateParts', (req, res) => {
    // Add pcbPart to data object. 
    console.log('starting post');
    let body = '';
    req.on('data', data => body += data);
    req.on('end', async () => {
        const data = JSON.parse(body);
        console.log("Post request handling");
        console.log(data);

        build[data.partType] = parseInt(data.partID, 10);
        console.log(build);

        res.writeHead(200);
        res.end('Post Request Received');
    });

    // res.send('Post Request Received');
});

app.get('/insertBuild', checkLoggedIn, (req, res) => {
    console.log('Trying insert');
    if (build.pcb && build.case && build.switch && build.keycap && build.cable) {
        console.log('Inserting build in table');
        db.addBuild(user.buildid, build.pcb, build.case, build.switch, build.keycap, build.cable);
    } else {
        console.log('Failed insert');
    }

});

app.post('/removePart', (req, res) => {
    res.send('Post Request Received');
});

// Modify this to display the actual build
// TODO Have this return the proper database entry
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
        res.redirect('/login.html');
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
// eslint-disable-next-line no-unused-vars
function writeBlob(res) {
    const array = [];
    for (let i = 0; i < 10; i++) {
        array.push(blob());
    }
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify(array, null, 2));
    return;
}


// Convert a pcb tuple obtained from a SQL table into an object with correctly named keys
function pcbObject(object) {
    return { imgSource: object.image, imgDesc: 'placeholder text', name: object.partname, id: object.itemid, desc: object.partdescription, price: object.price };
}
function caseObject(object) {
    return { imgSource: object.image, imgDesc: 'placeholder text', name: object.partname, id: object.itemid, desc: object.partdescription, price: object.price };
}
function switchObject(object) {
    return { imgSource: object.image, imgDesc: 'placeholder text', name: object.partname, id: object.itemid, desc: object.partdescription, price: object.price };
}
function keyCapObject(object) {
    return { imgSource: object.image, imgDesc: 'placeholder text', name: object.partname, id: object.itemid, desc: object.partdescription, price: object.price };
}
function cableObject(object) {
    return { imgSource: object.image, imgDesc: 'placeholder text', name: object.partname, id: object.itemid, desc: object.partdescription, price: object.price };
}

// Convert all tuples in an sql table object into an array of objects with correct key names using the function f
// @param f: {} => {}
function convertDbToObject(sqlObject, f) {
    return sqlObject.map(object => {
        return f(object);
    });
}
// Send an sql table in json form in a server response to a get request. Server response must be ended manually.
function writeDbObject(res, sqlObject, f) {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify(convertDbToObject(sqlObject, f), null, 2));
    // allow calling function to end response
}

// const x = {imgSource : "asdfoiwje.com", imgDesc : "picture of part", name : "name of part", id: unique id number, desc : "part description"}
app.get('/caseProducts', async (req, res) => {
    // writeBlob(res);
    const sqlObject = await db.getCases();
    writeDbObject(res, sqlObject, caseObject);
    res.end();
});
app.get('/pcbProducts', async (req, res) => {
    // writeBlob(res);
    const sqlObject = await db.getPCBs();
    writeDbObject(res, sqlObject, pcbObject);
    res.end();
});
app.get('/keySwitchProducts', async (req, res) => {
    // writeBlob(res);
    const sqlObject = await db.getSwitches();
    writeDbObject(res, sqlObject, switchObject);
    res.end();
});
app.get('/keyCapProducts', async (req, res) => {
    // writeBlob(res);
    const sqlObject = await db.getkeyCaps();
    writeDbObject(res, sqlObject, keyCapObject);
    res.end();
});
app.get('/cableProducts', async (req, res) => {
    // writeBlob(res);
    const sqlObject = await db.getCables();
    writeDbObject(res, sqlObject, cableObject);
    res.end();
});
app.get('/userInfo', (req, res) => {
    console.log("Trying to send: JSON response data");
    res.writeHead(200, { 'Content-Type': 'text/json' });
    const username = user.username;
    const name = user.username;
    const date = "some day";
    const email = user.email;
    const phone = "111 2222 3333";
    // res.write(String.raw`{ "username": ${username}, "name": ${name}, "bday": ${date}, "email": ${email}, "phone": ${phone} }`);
    res.write(JSON.stringify({ username: username, name: name, bday: date, email: email, phone: phone }));
    res.end();
});


app.get('/',
    checkLoggedIn,
    (req, res) => {
        console.log("Checking login");
        res.send("Hello world");
    });

// Handle post data from the login.html form.
app.post('/login',
    passport.authenticate('local', {     // use username/password authentication
        'successRedirect': '/profilePage.html',   // when we login, go to /private 
        'failureRedirect': '/login.html'      // otherwise, back to login
    }));

// Handle the URL /login (just output the login.html file).
app.get('/login',
    (req, res) => res.sendFile('client/login.html', { 'root': __dirname }));

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});


app.post('/register', (req, res) => {
    const email = req.body['email'];
    const username = req.body['username'];
    const ret = mc.hash(req.body['password']);

    if (db.addUser(email, username, 234, ret[1], ret[0])) {
        res.redirect('/login.html');
    } else {
        res.redirect('/register.html');
    }
});

// Register URL
app.get('/register',
    (req, res) => res.sendFile('client/register.html',
        { 'root': __dirname }));


// Start the server
app.listen(port, () => {
    console.log('Server listening on port:', port);
});
