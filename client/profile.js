window.addEventListener("load", async function () {
    const userPartsRequest = await fetch("./userParts");
    const userPartsData = userPartsRequest.ok ? await userPartsRequest.json() : [];

    // Header of User's parts table
    const headerTr = document.createElement('tr');
    const headerTh = document.createElement('th');

    headerTh.scope = "col";
    headerTh.innerText = "#";
    headerTr.appendChild(headerTh);

    const headerId = document.createElement('th');
    const headerName = document.createElement('th');
    const headerType = document.createElement('th');
    const headerCost = document.createElement('th');
    const headerLink = document.createElement('th');

    headerId.innerText = "Product ID";
    headerName.innerText = "Name";
    headerType.innerText = "Type";
    headerCost.innerText = "Cost";
    headerLink.innerText = "Link";

    headerTr.appendChild(headerId);
    headerTr.appendChild(headerName);
    headerTr.appendChild(headerType);
    headerTr.appendChild(headerCost);
    headerTr.appendChild(headerLink);

    document.getElementById('user-parts-table').appendChild(headerTr);

    // List of User's selected parts, if any
    let rowNum = 1;
    for (const userPart of userPartsData) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const id = document.createElement('td');
        const name = document.createElement('td');
        const type = document.createElement('td');
        const cost = document.createElement('td');
        const link = document.createElement('td');

        th.scope = "row";
        th.innerText = rowNum.toString();
        rowNum += 1;

        id.innerText = userPart.id;
        name.innerText = userPart.name;
        type.innerText = userPart.type;
        cost.innerText = userPart.cost;
        link.innerText = userPart.link;

        tr.appendChild(th);
        tr.appendChild(id);
        tr.appendChild(name);
        tr.appendChild(type);
        tr.appendChild(cost);
        tr.appendChild(link);

        document.getElementById('user-parts-table').appendChild(tr);
    }

    // User info bottom of page
    const userInfoRequest = await fetch("./userInfo");
    const userInfoData = userInfoRequest.ok ? await userInfoRequest.json() : [];

    document.getElementById('navbarUsername').innerText = userInfoData.username;
    document.getElementById('username').innerText = userInfoData.username;
    document.getElementById('name').innerText = userInfoData.name;
    document.getElementById('bday').innerText = userInfoData.bday;
    document.getElementById('email').innerText = userInfoData.email;
    document.getElementById('phone').innerText = userInfoData.phone;
});