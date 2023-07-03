document.addEventListener('DOMContentLoaded', () => {
    var y = document.getElementById("url-save");
    y.addEventListener("click", saveUrl);
});

function saveUrl() {
    chrome.runtime.sendMessage("save", (response) => { 
        if(response == "Success"){
            //document.getElementById("test1").innerHTML = "Hello！";
        } else if(response == "Fail"){

        }
    });
}