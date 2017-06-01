document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    let activateButton = document.querySelector('#activate-button');

    chrome.storage.sync.get("enabled", function(items) {
        activateButton.checked = items.enabled;
    });

    activateButton.addEventListener("change", function(event) {
        chrome.tabs.query({
            url: "https://www.youtube.com/*"
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                enabled: activateButton.checked
            }, function(response) {
                chrome.storage.sync.set({ "enabled": response.enabled });
            });
        });
    });
});
