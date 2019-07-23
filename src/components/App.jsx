import React from "react";
import TimeEntriesTable from "./TimeEntriesTable.jsx";
import config from "../config";

let authorizeButton = document.getElementById("authorize_button");
let signoutButton = document.getElementById("signout_button");

class App extends React.Component {
  state = { isSignedIn: false, timeEntries: [] };

  initClient = () => {
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
            .isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(
            window.gapi.auth2.getAuthInstance().isSignedIn.get()
          );
          authorizeButton.onclick = this.handleAuthClick;
          signoutButton.onclick = this.handleSignoutClick;
          this.setState({
            isSignedIn: window.gapi.auth2.getAuthInstance().isSignedIn.get()
          });
          this.retrieveData();
        },
        (error) => {
          console.log(JSON.stringify(error, null, 2));
        }
      );
  };

  updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      authorizeButton.style.display = "none";
      signoutButton.style.display = "block";
    } else {
      authorizeButton.style.display = "block";
      signoutButton.style.display = "none";
    }
  };

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick = async (event) => {
    await window.gapi.auth2.getAuthInstance().signIn();

    this.setState({
      isSignedIn: window.gapi.auth2.getAuthInstance().isSignedIn.get()
    });
    this.retrieveData();
  };

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick = async (event) => {
    await window.gapi.auth2.getAuthInstance().signOut();
    this.setState({
      isSignedIn: window.gapi.auth2.getAuthInstance().isSignedIn.get()
    });
  };

  retrieveData = () => {
    if (this.state.isSignedIn === true) {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.SPREADSHEETID,
          range: "Sheet1!A2:C"
        })
        .then(
          (response) => {
            this.setState({ timeEntries: response.result.values });
          },
          (response) => {
            console.log("Error: " + response.result.error.message);
          }
        );
    }
  };

  componentDidMount = () => {
    window.gapi.load("client:auth2", this.initClient);
  };

  render() {
    if (this.state.isSignedIn === false) {
      return <div>Please sign in with your Google Account</div>;
    }

    return (
      <div className="App">
        <TimeEntriesTable timeEntries={this.state.timeEntries} />
      </div>
    );
  }
}

export default App;
