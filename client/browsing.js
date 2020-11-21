
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


// Function to add eventlistener to all buttons on pcb page
async function pcbButtons() {
    let btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            const response = await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            document.getElementById("pcbButton").disabled = true;
            document.getElementById("caseButton").disabled = false;

            document.getElementById("userInstruction").innerHTML = "<b>Select a <u><span style='color:darkcyan'>Case</span></u> of your choice to proceed to cases.</b>";

            await listParts("./caseProducts");
            await caseButtons();
        });
    }
}

// Function to add eventlistener to all buttons on case page
async function caseButtons() {
    let btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            const response = await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            document.getElementById("caseButton").disabled = true;
            document.getElementById("ksButton").disabled = false;

            document.getElementById("userInstruction").innerHTML = "<b>Select a <u><span style='color:darkcyan'>Keyswitch</span></u> of your choice to proceed to keycaps.</b>";

            await listParts("./keySwitchProducts");
            await ksButtons();
        });
    }
}

// Function to add eventlistener to all buttons on keyswitch page
async function ksButtons() {
    let btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            const response = await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            document.getElementById("ksButton").disabled = true;
            document.getElementById("kcButton").disabled = false;

            document.getElementById("userInstruction").innerHTML = "<b>Select a <u><span style='color:darkcyan'>Keycap</span></u> of your choice to proceed to cables.</b>";

            await listParts("./keyCapProducts");
            await kcButtons();
        });
    }
}

// Function to add eventlistener to all buttons on keycap page
async function kcButtons() {
    let btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            const response = await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            document.getElementById("kcButton").disabled = true;
            document.getElementById("cableButton").disabled = false;

            document.getElementById("userInstruction").innerHTML = "<b>Select a <u><span style='color:darkcyan'>Cable</span></u> of your choice to finish.</b>";

            await listParts("./cableProducts");
            await cableButtons();
        });
    }
}

// Function to add eventlistener to all buttons on cable page
async function cableButtons() {
    let btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            const response = await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partID: btnArray[i].id
                })
            });

            cleanTable();

            document.getElementById("partTab").style.visibility = "hidden";

            document.getElementById("cableButton").disabled = true;

            document.getElementById("userInstruction").innerHTML = "<b>Build complete.</b>";
            document.getElementById("warning").innerHTML = "<b>See your build by clicking on 'My Profile' at the top right of your screen.</b>";
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

    document.getElementById("partTab").style.visibility = "hidden";

    // when Build button is first clicked list pcbs and remove button
    document.getElementById("mainButton").addEventListener('click', async () => {
        cleanTable();

        const button = document.getElementById("mainButton");
        button.parentNode.removeChild(button);

        document.getElementById("partTab").style.visibility = "visible";

        document.getElementById("pcbButton").disabled = false;

        document.getElementById("userInstruction").innerHTML = "<b>Select a <u><span style='color:darkcyan'>PCB</span></u> of your choice to proceed to cases.</b>";

        await listParts("./pcbProducts");
        await pcbButtons();
    });

    /*
    // If Case button is clicked display all cases
    document.getElementById("caseButton").addEventListener('click', async () => {
        cleanTable();
        await listParts("./caseProducts");
        await addToBtns();
    });

    // If Key Switch button is clicked display all key switches
    document.getElementById("ksButton").addEventListener('click', async () => {
        cleanTable();
        await listParts("./keySwitchProducts");
        await addToBtns();
    });

    // If Key Caps button is clicked display all key caps
    document.getElementById("kcButton").addEventListener('click', async () => {
        cleanTable();
        await listParts("./keyCapProducts");
        await addToBtns();
    });

    //If Cables button is clicked display all cables
    document.getElementById("cableButton").addEventListener('click', async () => {
        cleanTable();
        await listParts("./cableProducts");
        await addToBtns();
    });*/
});
