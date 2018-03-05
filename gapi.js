var CLIENT_ID = '378432852378-i1kkib75iqogl7i261rh8u86aqpb6fvs.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBlNaJLDypSKfWLn4CuaIwhCSZi-5EhWnk';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad(callback) {
    gapi.load('client:auth2', () => initClient(callback));
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient(callback) {

    console.log('initClient');
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        console.log('initClient - then');
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        var isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        updateSigninStatus(isSignedIn);
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        callback(isSignedIn);
    },
        (error) => console.error(error))
        .catch((error) => {
            console.error(error)
        });

}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        appendValues();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function appendValues(spreadsheetId, range, valueInputOption, _values, callback) {
    var values = [
        [
            'new val','12345'
        ],
        // Additional rows ...
    ];
    var body = {
        values: values
    };
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: '1yAnQKLKAKQVMFLy-xPbYrd7NISsTtnfhGQPp8S9bbuY',
        range: 'Sheet1!A2:B',
        valueInputOption: 'USER_ENTERED',
        resource: body
    }).then((response) => {
        var result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`)
    });
}