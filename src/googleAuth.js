import config from "./config";

let authorizeButton = document.getElementById("authorize_button");
let signoutButton = document.getElementById("signout_button");

/**
 *  On load, called to load the auth2 library and API client library.
 */
export default function handleClientLoad() {
  window.gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  window.gapi.client
    .init({
      apiKey: config.API_KEY,
      clientId: config.CLIENT_ID,
      discoveryDocs: config.DISCOVERY_DOCS,
      scope: config.SCOPES
    })
    .then(
      () => {
        // Listen for sign-in state changes.
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(
          window.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
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
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  window.gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  window.gapi.auth2.getAuthInstance().signOut();
}
