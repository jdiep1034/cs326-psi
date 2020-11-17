const pgp = require("pg-promise")({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

const username = 'postgres';
const password = 'postgres';
const psqlURL = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/`;
const db = pgp(psqlURL);

console.log('Trying to find:', psqlURL);
async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        try {
            connection.done();
        } catch (ignored) {
            console.log(ignored);
        }
    }
}

async function getPCBs() {
    return await connectAndRun(db => db.any('SELECT * FROM PCBs'));
}
async function getCases() {
    return await connectAndRun(db => db.any('SELECT * FROM Cases'));
}
async function getSwitches() {
    return await connectAndRun(db => db.any('SELECT * FROM Switches'));
}
async function getkeyCaps() {
    return await connectAndRun(db => db.any('SELECT * FROM keyCaps'));
}
async function getCables() {
    return await connectAndRun(db => db.any('SELECT * FROM Cables'));
}

(async () => {
    const r = await getCables();
    console.log(r);
})();

console.log('hi');

module.exports.getCables = getCables;