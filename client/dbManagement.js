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
        console.error('Error in handling SQL query');
        console.error(e);
        // throw e;
        return null;
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
    return await connectAndRun(db => db.any('SELECT * FROM PCBs;'));
}
async function getCases() {
    return await connectAndRun(db => db.any('SELECT * FROM Cases;'));
}
async function getSwitches() {
    return await connectAndRun(db => db.any('SELECT * FROM Switches;'));
}
async function getkeyCaps() {
    return await connectAndRun(db => db.any('SELECT * FROM keyCaps;'));
}
async function getCables() {
    return await connectAndRun(db => db.any('SELECT * FROM Cables;'));
}

async function getSpecificPcb(itemID) {
    return await connectAndRun(db => db.any('SELECT * FROM PCBs WHERE itemID=$1;', [itemID]));
}

async function getSpecificCase(itemID) {
    return await connectAndRun(db => db.any('SELECT * FROM cases WHERE itemID=$1;', [itemID]));
}
async function getSpecificSwitch(itemID) {
    return await connectAndRun(db => db.any('SELECT * FROM switches WHERE itemID=$1;', [itemID]));
}
async function getSpecificKeycap(itemID) {
    return await connectAndRun(db => db.any('SELECT * FROM keycaps WHERE itemID=$1;', [itemID]));
}
async function getSpecificCable(itemID) {
    return await connectAndRun(db => db.any('SELECT * FROM cables WHERE itemID=$1;', [itemID]));
}
async function findUser(username) {

    const r = await connectAndRun(db => db.any('SELECT * FROM profiles where username=$1;', [username]));
    return r;
}

async function addUser(email, username, buildID, password, salt) {
    return await connectAndRun(db => db.any('INSERT INTO profiles (email, username, hashedpwd, salt) VALUES ($1, $2, $3, $4);', [email, username, password, salt]));
}

async function addBuild(buildID, pcbID, caseID, switchID, keycapID, cableID) {
    return await connectAndRun(db => db.any('INSERT INTO Builds VALUES ($1, $2, $3, $4, $5, $6);', [buildID, pcbID, caseID, switchID, keycapID, cableID]));
}
// Retrieve a table of cases compatible with a chosen pcb
// Return value: List of objects, each containing a tuple of the table
async function getCasesFromPCBs(pcb_size) {
    // return await connectAndRun(db => db.any('SELECT c.itemId, c.image, c.partname, c.partDescription, c.pcb_size, c.price, c.purchase_link FROM pcbs p join cases c on p.PCB_size=c.PCB_size WHERE p.PCB_size=$1;', [pcb_size]));
    return await connectAndRun(db => db.any('SELECT * FROM cases WHERE PCB_size=$1;', [pcb_size]));
}

// Retrieve a tables of switches compatible with a chosen pcb
// Return value: List of objects, each containing a tuple of the table
async function getSwitchesFromPCBs(switch_type) {
    // return await connectAndRun(db => db.any('SELECT s.itemID, s.image, s.partname, s.partdescription, s.switch_type, s.price, s.purchase_link FROM pcbs p join switches s on p.switch_type=s.switch_type WHERE p.switch_type=$1;', [switch_type]));
    return await connectAndRun(db => db.any('SELECT * FROM switches WHERE switch_type=$1;', [switch_type]));
}



//Use this function to retrieve the build from the sql table for display on the profile page
async function getBuild(buildID) {
    return await connectAndRun(db => db.any('SELECT * FROM builds where buildID=$1;', [buildID]));
}


// Use this to insert a new build into the build table
async function newBuild(buildID, pcbID, caseID, switchID, keycapID, cableID) {
    return await connectAndRun(db =>
        db.none('INSERT INTO builds values($1, $2, $3);'[buildID, pcbID, caseID, switchID, keycapID, cableID]));
}

//Use this function to delete a build from the table
async function deleteBuild(buildID) {
    return await connectAndRun(db => db.none('DELETE FROM builds where buildID=$1', [buildID]));
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
    findUser: findUser,
    addUser: addUser,
    getBuild: getBuild,
    newBuild: newBuild,
    deleteBuild: deleteBuild,
    addBuild: addBuild,
    getSpecificPcb: getSpecificPcb,
    getSpecificCase: getSpecificCase,
    getSpecificSwitch: getSpecificSwitch,
    getSpecificKeycap: getSpecificKeycap,
    getSpecificCable: getSpecificCable

};