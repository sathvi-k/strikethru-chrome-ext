
// on window load, send a message to the background script to load the signed-in user's information
window.onload = function() {
    chrome.runtime.sendMessage(
        {command: "getUserInfo"}
    );

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.command == "email") {
                const { userEmail }  = request;
                document.getElementById('user').innerHTML = "Welcome, " + userEmail + "!";
            }
        }
    );
}

function showHiddenSpeech(){
    console.log('clicked');
    // if user clicks this button, remove our changes and just show the original page --> maybe we can simply reload the page?
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        // console.log(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, {command: "noTextHide"});
    });
    
}

let toggle1 = 'off';
let toggle2 = 'off';
let toggle3 = 'off';
let toggle4 = 'off';
let toggle5 = 'off';
document.getElementById('toggle1').addEventListener('change', (e) => {
    toggle1 = e.target.checked ? 'on' : 'off';
});
document.getElementById('toggle2').addEventListener('change', (e) => {
    toggle2 = e.target.checked ? 'on' : 'off';
});
document.getElementById('toggle3').addEventListener('change', (e) => {
    toggle3 = e.target.checked ? 'on' : 'off';
});
document.getElementById('toggle4').addEventListener('change', (e) => {
    toggle4 = e.target.checked ? 'on' : 'off';
});
document.getElementById('toggle5').addEventListener('change', (e) => {
    toggle5 = e.target.checked ? 'on' : 'off';
});

function handleToggles() {
    console.log(toggle1, toggle2, toggle3, toggle4, toggle5);
    // TODO: make api call? or reparse page + refresh
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
}


document.getElementById('reveal-btn').addEventListener('click', showHiddenSpeech);
// document.getElementById('check-btn').addEventListener('click', handleToggles);
