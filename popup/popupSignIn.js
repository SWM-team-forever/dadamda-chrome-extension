document.addEventListener('DOMContentLoaded', () => {
    var y = document.getElementById("google-login-button");
    y.addEventListener("click", openIndex);
});

function openIndex() {
    chrome.runtime.sendMessage("google-login", (response) => { });
}