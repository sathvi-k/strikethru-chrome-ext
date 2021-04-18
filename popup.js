
// on window load, send a message to the background script to load the signed-in user's information
window.onload = function() {
    chrome.runtime.sendMessage(
        {command: "getUserInfo"}
    );
}

function showHiddenSpeech(){
    console.log('clicked');
    // if user clicks this button, remove our changes and just show the original page
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "noTextHide"});
    });
    
}

let toggle1 = '';
let toggle2 = '';
let toggle3 = '';
let toggle4 = '';
let toggle5 = '';
let toggle6 = '';
toggles = ['', '', '', '', '', ''];
document.getElementById('toggle1').addEventListener('change', (e) => {
    toggle1 = e.target.checked ? 'h' : '';
    toggles[0] = toggle1;
    chrome.runtime.sendMessage(
        {command: "updateFilters", toggleStates: toggles}
    );
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "toggleContent", toggleStates: toggles});
    });
});
document.getElementById('toggle2').addEventListener('change', (e) => {
    toggle2 = e.target.checked ? 'r' : '';
    toggles[1] = toggle2;
    chrome.runtime.sendMessage(
        {command: "updateFilters", toggleStates: toggles}
    );
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "toggleContent", toggleStates: toggles});
    });
});
document.getElementById('toggle3').addEventListener('change', (e) => {
    toggle3 = e.target.checked ? 't' : '';
    toggles[2] = toggle3;
    chrome.runtime.sendMessage(
        {command: "updateFilters", toggleStates: toggles}
    );
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "toggleContent", toggleStates: toggles});
    });
});
document.getElementById('toggle4').addEventListener('change', (e) => {
    toggle4 = e.target.checked ? 's' : '';
    toggles[3] = toggle4;
    chrome.runtime.sendMessage(
        {command: "updateFilters", toggleStates: toggles}
    );
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "toggleContent", toggleStates: toggles});
    });
});
document.getElementById('toggle5').addEventListener('change', (e) => {
    toggle5 = e.target.checked ? 'a' : '';
    toggles[4] = toggle5;
    chrome.runtime.sendMessage(
        {command: "updateFilters", toggleStates: toggles}
    );
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "toggleContent", toggleStates: toggles});
    });
});
document.getElementById('toggle6').addEventListener('change', (e) => {
    toggle5 = e.target.checked ? 'c' : '';
    toggles[5] = toggle6;
    chrome.runtime.sendMessage(
        {command: "updateFilters", toggleStates: toggles}
    );
});


document.getElementById('reveal-btn').addEventListener('click', showHiddenSpeech);
