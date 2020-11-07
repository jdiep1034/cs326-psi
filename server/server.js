import { createServer } from 'http';
import { parse } from 'url';
import { join } from 'path';
import { writeFile, readFileSync, existsSync /*, fs at */ } from 'fs';
import express from 'express';
import path from 'path';

const app = express();
const port = 8080

let database;
if (existsSync("database.json")) {
    database = JSON.parse(readFileSync("database.json"));
} else {
    database = {
        wordScores: [],
        gameScores: []
    };
}
app.use(express.static('public'));

app.get('/', (req, res) => {
    const path = 'client/BrowsePage.html'
    console.log('Trying to serve: BrowsePage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
})
app.get('/profile', (req, res) => {
    const path = 'client/profilePage.html'
    console.log('Trying to serve: profilePage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
})

app.get('/social', (req, res) => {
    const path = 'client/SocialPage.html'
    console.log('Trying to serve: SocialPage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
})
app.get('/info', (req, res) => {
    const path = 'client/InfoPage.html'
    console.log('Trying to serve: InfoPage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
});
app.get('/switches', (req, res) => {

});
app.listen(port, () => {
    console.log('Server listening on port:', port);
})

/* createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/wordScore') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.wordScores.push({
                name: data.name,
                word: data.word,
                score: data.score
            });

            writeFile("database.json", JSON.stringify(database, null, 2), err => {
                if (err) {
                    console.err(err);
                } else {
                    res.end();
                }
            });
        });
    } else if (parsed.pathname === '/gameScore') {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            const data = JSON.parse(body);
            database.gameScores.push({
                name: data.name,
                score: data.score
            });

            writeFile("database.json", JSON.stringify(database, null, 2), err => {
                if (err) {
                    console.err(err);
                } else {
                    res.end();
                }
            });
        });
    } else if (parsed.pathname === '/highestWordScores') {
        res.end(JSON.stringify(
            database.wordScores.sort((a, b) => b.score - a.score).filter((v, i) => i < 10), null, 2
        ));
    } else if (parsed.pathname === '/highestGameScores') {
        res.end(JSON.stringify(
            database.gameScores.sort((a, b) => b.score - a.score).filter((v, i) => i < 10), null, 2
        ));
    } else {
        // If the client did not request an API endpoint, we assume we need to fetch a file.
        // This is terrible security-wise, since we don't check the file requested is in the same directory.
        // This will do for our purposes.
        const filename = parsed.pathname === '/' ? "profilePage.html" : parsed.pathname.replace('/', '');
        const path = join("client/", filename);
        console.log("trying to serve " + path + "...");
        if (existsSync(path)) {
            if (filename.endsWith("html")) {
                res.writeHead(200, { "Content-Type": "text/html" });
            } else if (filename.endsWith("css")) {
                res.writeHead(200, { "Content-Type": "text/css" });
            } else if (filename.endsWith("js")) {
                res.writeHead(200, { "Content-Type": "text/javascript" });
            } else {
                res.writeHead(200);
            }

            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(8080); */