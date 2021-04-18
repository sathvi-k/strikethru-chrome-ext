const firebaseConfig = {
    apiKey: "AIzaSyB4f2Dh8xQX5t5sRdPRGW_4rVDQfjbFpog",
    authDomain: "strikethru-20e98.firebaseapp.com",
    projectId: "strikethru-20e98",
    storageBucket: "strikethru-20e98.appspot.com",
    messagingSenderId: "864511055059",
    appId: "1:864511055059:web:35f4091df4b38a9c687026"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let user = {};
let userID;
let filters;
let chosen;
let process;

chrome.identity.getAuthToken({ interactive: true }, function(token) {
    console.log("TOKEN: ", token);
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }
    var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
    firebase.auth().signInWithCredential(credential); // this line is being buggy in the background.js console idk why

    fetch ('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonResponse) {
        user = jsonResponse;
        userID = user.id;
        // console.log(user);
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "getUserInfo") {
            const userEmail = user.email;
            const userVal = userEmail.substring(0, userEmail.indexOf('@'));
            const url = `http://localhost:9090/api/user/${userVal}`;
            fetch(url, {
                headers:  { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Access-Control-Allow-Origin" : "*", 
                    "Access-Control-Allow-Credentials" : true 
                }
            }).then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    const { filterTypes, chosenFilter, processType } = data.result;
                    filters = filterTypes;
                    chosen = chosenFilter;
                    process = processType;
                });
            }).catch(error => {
                console.log("Error fetching response: ", error);
            });
            return true;  // respond asynchronously
        } else if (request.command == "updateFilters") {
            const toggleFilters = request.toggleStates.slice(0, 5);
            let toggleStringArr = [];
            for (let i=0; i < toggleFilters.length; i++){
                if (toggleFilters[i] !== "") {
                    toggleStringArr.push(toggleFilters[i]);
                }
            }
            const toggleString = toggleStringArr.toString();
            const userVal = user.email.substring(0, user.email.indexOf('@'));
            const url = `http://localhost:9090/api/user/${userVal}`;
            const bodyData = JSON.stringify({"processType": process, "filterTypes": toggleString, "chosenFilter": chosen });
            fetch(url, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: bodyData
            }).then((response) => {
                response.json().then((data) => {
                    console.log('data', data);
                })
            }).catch(error => {
                console.log("Error fetching response: ", error);
            });
        }
    }
);


// on page change, detect hate speech on the new page
/* chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      console.log('changed page, need to strike out hate speech');
    }
  }) */

/* chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.command == "getUserInfo") {
        const url = `http://localhost:9090/api/user/${userID}`;
        fetch(url, {
            headers:  { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
            }
        }).then((response) => {
            console.log(response);
            response.json().then((data) => {
                const people = data.people;
                const n = people.length;
                var dict = {}; // maps names to person id
                var names = [];

                for (i = 0; i < n; i++) {
                    dict[people[i].name] = people[i].id;
                    names.push(people[i].name);
                }
                chrome.runtime.sendMessage(
                    {command: "sendPeople", people: names, mappedIds: dict}
                );
            });
        }).catch(error => {
            console.log("Error fetching response: ", error);
        });
        return true;  // respond asynchronously
      }
}); */