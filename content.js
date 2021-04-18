window.onload = function() {
    // the stuff we want to parse probably
    body = document.getElementsByTagName("body")[0].children;
    console.log(body);

    for (let i=0; i < body.length; i+=1) {
        if (body[i].innerText) {
            if (body[i].innerText.toLowerCase().includes("twilio")){
                console.log();
                $(`${body[i].classList[0]}`).wrap( "<div class='blurWords'></div>" );
            }
        } 
    }

    // $("body").wrap( "<div class='blurWords'></div>" );

    // TODO: parse through body html, check if there's any hate words in there
    // !!!!!!!!! IMPT CODE GOES HERE !!!!!!  PARSING HAPPENS HERE  !!!!!!!!!

    // if any hate words, show alert on page, blur out words (by adding spans with a class around them) & blur background initially:
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("blurredBackground");
    // html.classList.add("blurWords");


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
            console.log(request);
            if (request.command == "noTextHide") {
                // chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
                // html.classList.remove("blurWords"); // <-- remove text blur
                $(".blurWords").removeClass("blurWords");
            }
        }
    );
}



