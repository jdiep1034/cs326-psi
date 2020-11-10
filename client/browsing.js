
// Function to list all "" parts in table
function listParts(fetchPath) {
    const partsRequest = await fetch(fetchPath);
    const partsData = partsRequest.ok ? await partsRequest.json() : [];

    for (const part of partsData) {

        // part div
        const main = document.createElement('div');
        main.classList.add = "card mb-2";
        main.style.width = "100%";

        // part img
        const img = document.createElement('img');
        img.src = part.imgSource;
        img.classList.add = "card-img-top";
        img.alt = part.imgDesc;

        // part body
        const body = document.createElement('div');
        body.classList.add = "card-body";

        // part name
        const name = document.createElement('h5');
        name.classList.add = "card-title";
        name.innerText = part.name;

        // part id
        const id = document.createElement('h6');
        id.classList.add = "card-subtitle mb-2 text-muted";
        id.innerText = part.id;

        // part description
        const desc = document.createElement('p');
        desc.classList.add = "card-text";
        desc.innerText = part.desc;

        // "Add part to User's build" button
        const button = document.createElement('a');
        button.classList.add = "btn btn-primary addToBuild";
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
    };
};


// Function to add eventlistener to all "add" buttons
function addToBtns() {
    let btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', () => {
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

    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    };
};


window.addEventListener("load", async function () {

    // If Case button is clicked display all cases
    document.getElementById("caseButton").addEventListener('click', () => {
        await cleanTable();
        await listParts("./caseProducts");
        await addToBtns();
    });

    // If PCB button is clicked display all pcbs
    document.getElementById("pcbButton").addEventListener('click', () => {
        cleanTable();
        listParts("./pcbProducts");
        addToBtns();
    });

    // If Key Switch button is clicked display all key switches
    document.getElementById("ksButton").addEventListener('click', () => {
        cleanTable();
        listParts("./keySwitchProducts");
        addToBtns();
    });

    // If Key Caps button is clicked display all key caps
    document.getElementById("kcButton").addEventListener('click', () => {
        cleanTable();
        listParts("./keyCapProducts");
        addToBtns();
    });

    //If Cables button is clicked display all cables
    document.getElementById("cableButton").addEventListener('click', () => {
        cleanTable();
        listParts("./cableProducts");
        addToBtns();
    });
});