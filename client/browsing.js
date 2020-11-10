
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
        img.style.height = '50px';
        img.style.width = '50px';

        // part body
        const body = document.createElement('div');
        body.className = "card-body";

        // part name
        const name = document.createElement('h5');
        name.className = "card-title";
        name.innerText = part.name;

        // part price
        const price = document.createElement('h5');
        price.className = "card-subtitle";
        price.innerText = part.price;

        // part id
        const id = document.createElement('h6');
        id.className = "card-subtitle mb-2 text-muted";
        id.innerText = part.id;

        // part description
        const desc = document.createElement('p');
        desc.className = "card-text";
        desc.innerText = part.desc;

        // "Add part to User's build" button
        const button = document.createElement('a');
        button.className = "btn btn-primary addToBuild";
        button.id = part.id.toString();
        button.innerText = "Add to build";

        // Append children to card body
        body.appendChild(name);
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


// Function to add eventlistener to all "add" buttons
async function addToBtns() {
    let btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            const response = await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    partID: btnArray[i].id
                })
            });
        });
    };
};


// Function to clear all parts in table
function cleanTable() {
    const parent = document.getElementById("product-table");

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};


window.addEventListener("load", async function () {

    // If Case button is clicked display all cases
    document.getElementById("caseButton").addEventListener('click', async () => {
        cleanTable();
        await listParts("./caseProducts");
        await addToBtns();
    });

    // If PCB button is clicked display all pcbs
    document.getElementById("pcbButton").addEventListener('click', async () => {
        cleanTable();
        await listParts("./pcbProducts");
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
    });
});