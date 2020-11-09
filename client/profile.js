window.addEventListener("load", async function() {
    const userPartsRequest = await fetch("./userParts");
    const userPartsData = userPartsRequest.ok ? await userPartsRequest.json() : [];

    for (const userPart of userPartsData) {
        const tr = document.createElement('tr');
    }
})