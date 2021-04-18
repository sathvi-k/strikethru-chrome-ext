window.onload = function() {
    let badWords = { // WE COPIED AND PASTED THESE
        "h": ["fag", "faggot"],
        "t": ["tranny", "hermaphrodite", "shemale", "heshe", "he/she", "chick-with-a-dick", "chick with a dick", "transgenderist", "shim"],
        "r": ["chink", "chigger", "nigger", "nigga"],
        "s": ["cunt", "slut", "whore"],
        "a": ["kike"]
    };
    let alreadyFilter = [];
    let filter = [];

    const toggles = ["h", "r", "t", "s", "a"];
    for (let i=0; i < toggles.length - 1; i++) {
        if (toggles[i] != ""){
            if (!alreadyFilter.includes(toggles[i])){
                alreadyFilter.push(toggles[i]);
                for (let j=0; j < badWords[toggles[i]].length; j++){
                    filter.push(badWords[toggles[i]][j]);
                }
            }
        }
    }

    // the stuff we want to parse probably
    body = Array.from(document.getElementsByTagName("body")[0].children);
    
    let proper = [];
    for (j=0; j < body.length; j++) {
        if (['script', 'noscript', 'style', 'iframe'].indexOf(body[j].localName) < 0) {
            for (i=0; i<filter.length; i++){
                if (body[j].textContent.toLowerCase().includes(filter[i])) {
                    proper.push(body[j]);
                }
            }
        }
    }
    
    function findByIdRecursive(array) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.children.length == 0) {
                for (i=0; i<filter.length; i++){
                    if (element.textContent.toLowerCase().includes(filter[i])) {
                        return element;
                    }
                }
            } else {
                if (element.children) {
                    const found = findByIdRecursive(element.children);
                    if (found) {
                        return found;
                    }
                }
            }
        }
    }

    let idx = [];
    for (let i=0; i < proper.length; i++) {
        // console.log(proper[i]);
        if (proper[i].children.length > 0) {
            const elt = findByIdRecursive(proper[i].children);
            idx.push(elt);
        }
    }
    
    for (let j=0; j < idx.length; j++){
        if (idx[j]){
            idx[j].classList.add("blurWords");
        }
    }

    var html = document.getElementsByTagName("html")[0];
    html.classList.add("blurredBackground");


    // need to wait half a second before showing confirm alert because the css blur style take a while to show up
    setTimeout(function(){ 
        var answer = confirm ("Warning: There is hateful speech on this webpage. Press 'OK' if you would like to view the page.");
        if (answer) {
            // if user clicks x on alert, alert goes away and they can read the blurred out text
            html.classList.remove("blurredBackground");
            // TODO: replace content with blurred out words HERE
        }
    }, 500);

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.command == "noTextHide") {
                $(".blurWords").removeClass("blurWords");
            } else if (request.command == "toggleContent") {
                const toggles = request.toggleStates;
                for (let i=0; i < toggles.length - 1; i++) {
                    if (toggles[i] != ""){
                        if (!alreadyFilter.includes(toggles[i])){
                            alreadyFilter.push(toggles[i]);
                            for (let j=0; j < badWords[toggles[i]].length; j++){
                                filter.push(badWords[toggles[i]][j]);
                            }
                        }
                    }
                }
            }
        }
    );
}



