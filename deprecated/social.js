window.addEventListener("load", async function () {
  const apiResult = await fetch("./socialGet");
  const apiData = apiResult.ok ? await apiResult.json() : [];

  const container = document.getElementById('socialBody');
  /* const apiData = [{
    cardTitle: "cardTitle1",
    date:'Oct 12, 1999'
    email: "myEmail@hotmail.com",
    bodyText: "out1"
  }, {
    cardTitle: "cardTitle2",
    date:'Oct 22, 1999'
    email: "notMyEmail@hotmail.com",
    bodyText: "out2"
  }, {
    cardTitle: "cardTitle1",
    date:'Oct 32, 1999'
    email: "myRealEmail@hotmail.com",
    bodyText: "out3"
  }]; */

  // eslint-disable-next-line no-unused-vars
  apiData.forEach((result, idx) => {
    // Create card element
    const card = document.createElement('div');
    card.classList = 'card-body';

    // Construct card content
    const content = `
    <div class="card" style="width: 95%;">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">${result.date}</h6>
                <h6 class="card-subtitle mb-2 text-muted">${result.email}</h6>
                <p class="card-text">${result.bodyText}</p>
                <a href="#" class="card-link">Like</a>
                <a href="#" class="card-link">comments</a>
            </div>
        </div>
  `;

    // Append newyly created card element to the container
    container.innerHTML += content;
  });

});
