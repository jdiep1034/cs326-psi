
// Function to list all "" parts in table
async function listParts(fetchPath) {
    const partsRequest = await fetch(fetchPath);
    const partsData = partsRequest.ok ? await partsRequest.json() : [];

    for (const part of partsData) {

        // part div
        const main = document.createElement('div');
        main.className = "card mb-2";
        main.style.width = "100%";

        // part img
        const img = document.createElement('img');
        img.src = part.imgSource;
        img.className = "card-img-top";
        img.alt = part.imgDesc;
        img.style.height = '200px';
        img.style.width = '200px';

        // part body
        const body = document.createElement('div');
        body.className = "card-body";

        // part name
        const name = document.createElement('h5');
        name.className = "card-title";
        name.innerText = part.name;

        // part price
        const price = document.createElement('h5');
        price.className = "card-subtitle mb-2";
        price.innerText = "$".concat(part.price);

        // part id
        const id = document.createElement('h6');
        id.className = "card-subtitle mb-2 text-muted";
        id.innerText = "Part ID: ".concat(part.id);

        // part description
        const desc = document.createElement('p');
        desc.className = "card-text";
        desc.innerText = part.desc;

        // "Add part to User's build" button
        const button = document.createElement('a');
        button.className = "btn btn-primary addToBuild";
        button.id = part.id.toString();
        button.innerText = "Select this Part";

        // Append children to card body
        body.appendChild(name);
        body.appendChild(price);
        body.appendChild(id);
        body.appendChild(desc);
        body.appendChild(button);

        // Append img and card body to card div
        main.appendChild(img);
        main.appendChild(body);

        //append card to product table div
        document.getElementById("product-table").appendChild(main);
    }
}

async function pcbBack() {
    cleanTable();

    document.getElementById("pcbButton").disabled = false;
    document.getElementById("caseButton").disabled = true;
    const backButton = document.getElementById("backButton");
    backButton.style.visibility = "hidden";

    backButton.removeEventListener('click', pcbBack);

    document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>PCB</span> of your choice to proceed to cases.</b>";

    await listParts("./pcbProducts");
    await pcbButtons();
}

async function caseBack() {
    cleanTable();

    document.getElementById("caseButton").disabled = false;
    document.getElementById("ksButton").disabled = true;
    const backButton = document.getElementById("backButton");

    backButton.addEventListener('click', pcbBack);
    backButton.removeEventListener('click', caseBack);

    document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Case</span> of your choice to proceed to cases.</b>";

    await listParts("./caseProducts");
    await caseButtons();
}

async function ksBack() {
    cleanTable();

    document.getElementById("kcButton").disabled = true;
    document.getElementById("ksButton").disabled = false;
    const backButton = document.getElementById("backButton");

    backButton.addEventListener('click', caseBack);
    backButton.removeEventListener('click', ksBack);

    document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Keyswitch</span> of your choice to proceed to cases.</b>";

    await listParts("./keySwitchProducts");
    await ksButtons();
}

async function kcBack() {
    cleanTable();

    document.getElementById("cableButton").disabled = true;
    document.getElementById("kcButton").disabled = false;
    const backButton = document.getElementById("backButton");

    backButton.addEventListener('click', ksBack);
    backButton.removeEventListener('click', kcBack);

    document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Keycap</span> of your choice to proceed to cases.</b>";

    await listParts("./keyCapProducts");
    await kcButtons();
}

async function cableBack() {
    cleanTable();

    document.getElementById("kcButton").disabled = true;
    document.getElementById("cableButton").disabled = false;
    const backButton = document.getElementById("backButton");

    backButton.addEventListener('click', kcBack);
    backButton.removeEventListener('click', cableBack);

    document.getElementById("partGroup").style.visibility = "visible";
    //document.getElementById("sortGroup").style.visibility = "visible";
    document.getElementById("buildButtons").style.visibility = "hidden";
    document.getElementById("rebuildButton").style.visibility = "hidden";
    document.getElementById("cbuildButton").style.visibility = "hidden";

    document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Cable</span> of your choice to proceed to cases.</b>";

    await listParts("./cableProducts");
    await cableButtons();
}

// Function to add eventlistener to all buttons on pcb page
async function pcbButtons() {
    const btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partType: 'pcb',
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            // Hide/show correct tabs to display build progress
            document.getElementById("pcbButton").disabled = true;
            document.getElementById("caseButton").disabled = false;
            document.getElementById("backButton").style.visibility = "visible";
            const backButton = document.getElementById("backButton");

            // Back button function
            backButton.addEventListener('click', pcbBack);

            document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Case</span> of your choice to proceed to cases.</b>";

            // List products and update buttons
            await listParts("./caseProducts");
            await caseButtons();
        });
    }
}

// Function to add eventlistener to all buttons on case page
async function caseButtons() {
    const btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partType: 'case',
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            // Hide/show correct tabs to display build progress
            document.getElementById("caseButton").disabled = true;
            document.getElementById("ksButton").disabled = false;
            const backButton = document.getElementById("backButton");

            // Back button function
            backButton.removeEventListener('click', pcbBack);
            backButton.addEventListener('click', caseBack);

            document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Keyswitch</span> of your choice to proceed to keycaps.</b>";

            // List products and update buttons
            await listParts("./keySwitchProducts");
            await ksButtons();
        });
    }
}

// Function to add eventlistener to all buttons on keyswitch page
async function ksButtons() {
    const btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partType: 'switch',
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            // Hide/show correct tabs to display build progress
            document.getElementById("ksButton").disabled = true;
            document.getElementById("kcButton").disabled = false;
            const backButton = document.getElementById("backButton");

            // Back button function
            backButton.removeEventListener('click', caseBack);
            backButton.addEventListener('click', ksBack);

            document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Keycap</span> of your choice to proceed to cables.</b>";

            // List products and update buttons
            await listParts("./keyCapProducts");
            await kcButtons();
        });
    }
}

// Function to add eventlistener to all buttons on keycap page
async function kcButtons() {
    const btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partType: 'keycap',
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            // Hide/show correct tabs to display build progress
            document.getElementById("kcButton").disabled = true;
            document.getElementById("cableButton").disabled = false;
            const backButton = document.getElementById("backButton");

            // Back button function
            backButton.removeEventListener('click', ksBack);
            backButton.addEventListener('click', kcBack);

            document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Cable</span> of your choice to finish.</b>";

            // List products and update buttons
            await listParts("./cableProducts");
            await cableButtons();
        });
    }
}

// Function to add eventlistener to all buttons on cable page
async function cableButtons() {
    const btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partType: 'cable',
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            // Hide/show correct tabs to display build progress
            document.getElementById("partGroup").style.visibility = "hidden";
            //document.getElementById("sortGroup").style.visibility = "hidden";
            document.getElementById("buildButtons").style.visibility = "visible";
            document.getElementById("rebuildButton").style.visibility = "visible";
            document.getElementById("cbuildButton").style.visibility = "visible";
            const backButton = document.getElementById("backButton");

            // Back button function
            backButton.removeEventListener('click', kcBack);
            backButton.addEventListener('click', cableBack);

            document.getElementById("cableButton").disabled = true;

            // End of build
            document.getElementById("userInstruction").innerHTML = "<b>Build complete.</b>";
            document.getElementById("warning").innerText = "";
        });
    }
}


// Function to clear all parts in table
function cleanTable() {
    const parent = document.getElementById("product-table");

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


window.addEventListener("load", async function () {

    document.getElementById("pcbButton").disabled = true;
    document.getElementById("caseButton").disabled = true;
    document.getElementById("ksButton").disabled = true;
    document.getElementById("kcButton").disabled = true;
    document.getElementById("cableButton").disabled = true;

    document.getElementById("partGroup").style.visibility = "hidden";
    document.getElementById("sortGroup").style.visibility = "hidden";
    document.getElementById("rebuildButton").style.visibility = "hidden";
    document.getElementById("cbuildButton").style.visibility = "hidden";
    document.getElementById("backButton").style.visibility = "hidden";

    // when Build button is first clicked list pcbs and remove button
    document.getElementById("beginButton").addEventListener('click', async () => {
        cleanTable();

        const button = document.getElementById("beginButton");
        button.parentNode.removeChild(button);

        document.getElementById("partGroup").style.visibility = "visible";
        //document.getElementById("sortGroup").style.visibility = "visible";

        document.getElementById("pcbButton").disabled = false;

        document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>PCB</span> of your choice to proceed to cases.</b>";

        await listParts("./pcbProducts");
        await pcbButtons();
        await fetch('./removePart');
    });

    // Add to build button
    document.getElementById('cbuildButton').addEventListener('click', async () => {
        await fetch('/insertBuild');
    });

    // Logout button
    document.getElementById('logoutButton').addEventListener('click', async () => {
        await fetch('/logout');
    });
});
