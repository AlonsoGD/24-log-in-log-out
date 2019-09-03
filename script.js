// Client ID and API key from the Developer Console
const CLIENT_ID =
  "523793257628-l1tsj3jh60tmgi2o94g69da2gbhh6rpv.apps.googleusercontent.com";
const API_KEY = "AIzaSyB9vPPhtEmTWUXozvc2bz9aXjxu0Cw8gxs";
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4"
];
const SPREADSHEETID = "1D83m9_MC_9I-Ji2wPDgm0VCpoz4IzPNfIVVnMY5Atqk";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let authorizeButton = document.getElementById("authorize_button");
let signoutButton = document.getElementById("signout_button");

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(
      () => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      },
      (error) => {
        console.log(JSON.stringify(error, null, 2));
      }
    );
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
    retrieveData();
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
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

let allTimeEntries = [];

function retrieveData() {
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: SPREADSHEETID,
      range: "Sheet1!A2:C"
    })
    .then(
      function(response) {
        allTimeEntries = response.result.values;
        console.log(allTimeEntries);
      },
      function(response) {
        console.log("Error: " + response.result.error.message);
      }
    );
}
function formatDateYYYYMMDD(date) {
  return date.toISOString().substr(0, 10);
}

function logInTimePresent() {
  function getLastTimeEntry() {
    return allTimeEntries[allTimeEntries.length - 1];
  }

  let lastTimeEntry = getLastTimeEntry();

  if (lastTimeEntry[1] === undefined) {
    return true;
  } else {
    return false;
  }
}

function saveLogInDate(date) {
  let values = [[date]];

  let body = {
    values: values
  };
  window.gapi.client.load("sheets", "v4", () => {
    gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: SPREADSHEETID,
        range: "Sheet1",
        valueInputOption: "USER_ENTERED",
        resource: body
      })
      .then((response) => {
        let result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`);
        retrieveData();
      });
  });
}

function saveLogOutDate(date) {
  let values = [[date]];

  let body = {
    values: values
  };

  window.gapi.client.load("sheets", "v4", () => {
    gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId: SPREADSHEETID,
        range: emptyLogOutRange(),
        valueInputOption: "USER_ENTERED",
        resource: body
      })
      .then((response) => {
        var result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
        retrieveData();
      });
  });
}

function emptyLogOutRange() {
  let rowNumber = allTimeEntries.length + 1;
  return `Sheet1!B${rowNumber}:C`;
}

handleClientLoad();
