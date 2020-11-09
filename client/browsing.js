function toggle() {
    alert("button pressed");
};
window.addEventListener("load", async function () {
    document.getElementById('prev').addEventListener('click', () => {
        alert("button pressed");
        toggle();
    });
});