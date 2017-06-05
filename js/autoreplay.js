"use strict";

let durationTime = document.querySelector('.ytp-time-duration'),
    replayButton = document.querySelector('.ytp-play-button'),
    timer = 0;

let timeObserver = new MutationObserver(function(mutations) {
    if(mutations[1].addedNodes[0].data === durationTime.innerHTML) {
        clearTimeout(timer);
        timer = setTimeout(function() {
            replayButton.click();
        }, 500);
    }
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
    let target = document.querySelector('.ytp-time-current');

    chrome.storage.sync.get("status", function(result) {
        if(result.status) {
            // Auto-replay activated!
            timeObserver.observe(target, observerOptions);
        } else {
            // Auto-replay deactivated!
            timeObserver.disconnect();
        }
    });
});
