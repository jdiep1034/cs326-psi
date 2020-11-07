import { createServer } from 'http';
import { parse } from 'url';
import { join } from 'path';
import { writeFile, readFileSync, existsSync /*, fs at */ } from 'fs';
import express from 'express';
import path from 'path';

const app = express();
const port = 8080;

let database;
if (existsSync("database.json")) {
    database = JSON.parse(readFileSync("database.json"));
} else {
    database = {
        pcb: [],
        switch: [],
        cap: []
    };
}
app.use(express.static('public'));

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
app.get('/profile', (req, res) => {
    const path = 'client/profilePage.html';
    console.log('Trying to serve: profilePage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
});

app.get('/social', (req, res) => {
    const path = 'client/SocialPage.html';
    console.log('Trying to serve: SocialPage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
});
app.get('/info', (req, res) => {
    const path = 'client/InfoPage.html';
    console.log('Trying to serve: InfoPage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
});
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





app.listen(port, () => {
    console.log('Server listening on port:', port);
});
