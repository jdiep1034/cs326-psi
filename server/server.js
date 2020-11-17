// import { createServer } from 'http';
// import { parse } from 'url';
// import { join } from 'path';
// import { readFileSync, existsSync /*, fs at */ } from 'fs';
const fs = require('fs');
const readFileSync = fs.readFileSync;
const existsSync = fs.existsSync;
const express = require('express');
const faker = require('faker');
// import express from 'express';
// import path from 'path';
// import faker from 'faker';

const app = express();
const port = process.env.PORT || 8080;



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


app.listen(port, () => {
    console.log('Server listening on port:', port);
});


const db = require('../client/dbManagement');

(async () => {
    const r = await db.getCables();
    console.log("DOING STUFF HERE");
    console.log(r);
})();