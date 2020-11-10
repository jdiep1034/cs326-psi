// import { createServer } from 'http';
// import { parse } from 'url';
// import { join } from 'path';
import { readFileSync, existsSync /*, fs at */ } from 'fs';
import express from 'express';
// import path from 'path';
import faker from 'faker';

const app = express();
const port = process.env.PORT || 8080;


// let database;
// if (existsSync("database.json")) {
//     database = JSON.parse(readFileSync("database.json"));
// } else {
//     database = {
//         pcb: [],
//         switch: [],
//         cap: []
//     };
// }

//Serve css data
app.use(express.static('public'));
// Serve the webpages
app.use(express.static('client'));

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
// app.get('/profile', (req, res) => {
//     const path = 'client/profilePage.html';
//     console.log('Trying to serve: profilePage');
//     if (existsSync(path)) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(readFileSync(path));
//         res.end();
//     }
//     // res.send(readFileSync(path));
// });

// app.get('/social', (req, res) => {
//     const path = 'client/SocialPage.html';
//     console.log('Trying to serve: SocialPage');
//     if (existsSync(path)) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(readFileSync(path));
//         res.end();
//     }
//     // res.send(readFileSync(path));
// });
// app.get('/info', (req, res) => {
//     const path = 'client/InfoPage.html';
//     console.log('Trying to serve: InfoPage');
//     if (existsSync(path)) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.write(readFileSync(path));
//         res.end();
//     }
//     // res.send(readFileSync(path));
// });
app.get('/switches', (req, res) => {
    // Should we be sending dummy data or something? I'm honestly not sure.
    res.send('Switch data I guess?');
});

// This receives post requests
app.post('/dummypost', (req, res) => {
    // TODO: Do something with the post request. Commented lines not working currently
    // let body = '';
    // req.on('data', data => body += data);
    // const data = JSON.parse(body);
    // database.pcb.push(
    //     {
    //         data: data.pcb
    //     });
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


app.listen(port, () => {
    console.log('Server listening on port:', port);
});
