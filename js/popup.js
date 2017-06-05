document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    let activateButton = document.querySelector('#activate-button');
    chrome.storage.sync.get("status", function(result) {
        activateButton.checked = result.status;
    });

    activateButton.addEventListener("change", function(event) {
        chrome.tabs.query({
            url: "https://www.youtube.com/*"
        }, function(tabs) {
            console.log(tabs);
            chrome.storage.sync.set({ "status": activateButton.checked });
        });
    });
});
