const pgp = require('pg-promise')({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

const username = 'postgres';
const password = 'postgres';
const psqlURL = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/psiproject`;
const db = pgp(psqlURL);

console.log('Trying to find:', psqlURL);
async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
        try {
            connection.done();
        } catch (ignored) {
            console.log(ignored);
        }
    }
}

// The next 5 functions are generic select * statements for each table in the database. TODO: Add tables for login and profile
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

async function findUser(email) {
    return JSON.stringify(await connectAndRun(db => db.any('SELECT * FROM profiles where email=$1', [email])));
} 


// Retrieve a table of cases compatible with a chosen pcb
// Return value: List of objects, each containing a tuple of the table
async function getCasesFromPCBs(pcb_size) {
    return await connectAndRun(db => db.any('SELECT c.itemId, c.partname, c.partDescription, c.pcb_size FROM pcbs p join cases c on p.PCB_size=c.PCB_size WHERE p.PCB_size=$1;', [pcb_size]));
}

// Retrieve a tables of switches compatible with a chosen pcb
// Return value: List of objects, each containing a tuple of the table
async function getSwitchesFromPCBs(switch_type) {
    return await connectAndRun(db => db.any('SELECT s.itemID, s.partname, s.partdescription, s.switch_type FROM pcbs p join switches s on p.switch_type=s.switch_type WHERE p.switch_type=$1;', [switch_type]));
}










// testing here
// (async () => {
//     const r = await getCasesFromPCBs('80');
//     console.log(r);
// })();

// console.log('hi');

// Export functions
module.exports = {
    getPCBs: getPCBs,
    getCases: getCases,
    getSwitches: getSwitches,
    getkeyCaps: getkeyCaps,
    getCables: getCables,
    getCasesFromPCBs: getCasesFromPCBs,
    getSwitchesFromPCBs: getSwitchesFromPCBs,
    findUser: findUser

};