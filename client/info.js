// Add event listener to logout button
window.addEventListener("load", async function () {
    document.getElementById('logoutButton').addEventListener('click', async () => {
        await fetch('/logout');
    });
});