function listCases() {
    const casePartsRequest = await fetch("./caseParts");
    const casePartsData = casePartsRequest.ok ? await casePartsRequest.json() : [];

    for (const casePart of casePartsData) {

        // Card div
        const cardMain = document.createElement('div');
        cardMain.classList.add = "card mb-2";
        cardMain.style.width = "100%";

        // Case img
        const img = document.createElement('img');
        img.src = casePart.imgSource;
        img.classList.add = "card-img-top";
        img.alt = casePart.imgDesc;

        // Card body
        const cardBody = document.createElement('div');
        cardBody.classList.add = "card-body";

        // Case name
        const name = document.createElement('h5');
        name.classList.add = "card-title";
        name.innerText = casePart.name;

        // Case id
        const id = document.createElement('h6');
        id.classList.add = "card-subtitle mb-2 text-muted";
        id.innerText = casePart.id;

        // Case description
        const desc = document.createElement('p');
        desc.classList.add = "card-text";
        desc.innerText = casePart.desc;

        // "Add Case to User's build" button
        const button = document.createElement('a');
        button.classList.add = "btn btn-primary addToBuild";
        button.id = casePart.id.toString();
        button.innerText = "Add to build";

        // Append children to card body
        cardBody.appendChild(name);
        cardBody.appendChild(id);
        cardBody.appendChild(desc);
        cardBody.appendChild(button);

        // Append img and card body to card div
        cardMain.appendChild(img);
        cardMain.appendChild(cardBody);

        //append card to product table div
        document.getElementById("product-table").appendChild(cardMain);
    };
}

function listPcbs() { };

function listSwitches() { };

function listKeyCaps() { };

function listCables() { };


// Add eventlistener to all "add" buttons
function addtoBtns() {
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
        cleanTable();
        listCases();
        addToBtns();
    });

    // If PCB button is clicked display all pcbs
    document.getElementById("caseButton").addEventListener('click', () => {
        cleanTable();
        listPcbs();
        addToBtns();
    });

    // If Key Switch button is clicked display all key switches
    document.getElementById("caseButton").addEventListener('click', () => {
        cleanTable();
        listSwitches();
        addToBtns();
    });

    // If Key Caps button is clicked display all key caps
    document.getElementById("caseButton").addEventListener('click', () => {
        cleanTable();
        listKeyCaps();
        addToBtns();
    });

    //If Cables button is clicked display all cables
    document.getElementById("caseButton").addEventListener('click', () => {
        cleanTable();
        listCables();
        addToBtns();
    });
});