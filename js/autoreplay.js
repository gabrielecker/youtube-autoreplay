"use strict";

let target = document.querySelector('.ytp-time-current'),
    durationTime = document.querySelector('.ytp-time-duration'),
    replayButton = document.querySelector('.ytp-play-button');

let timeObserver = new MutationObserver(function(mutations) {
    if(mutations[1].addedNodes[0].data === durationTime.innerHTML) {
        setTimeout(function() {
            replayButton.click()
        }, 500);
    }
});

function toggleAutoreplay(enabled) {
    if(enabled) {
        timeObserver.observe(target, { attributes: true, childList: true, characterData: true });
    } else {
        timeObserver.disconnect();
    }
    return enabled;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({ enabled: toggleAutoreplay(request.enabled) });
});
