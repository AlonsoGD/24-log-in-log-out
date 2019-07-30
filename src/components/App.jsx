import React from "react";
import TimeEntriesTable from "./TimeEntriesTable.jsx";
import InputDate from "./InputDate.jsx";

import config from "../config";
import styles from "./App.module.css";

let authorizeButton = document.getElementById("authorize_button");
let signoutButton = document.getElementById("signout_button");

class App extends React.Component {
  state = { isSignedIn: false, timeEntries: [], isLogInCellPopulated: "load" };

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

  //checks if log in cell in the spreadsheet is populated
  isLogInCellPopulated = () => {
    if (this.state.timeEntries === undefined) {
      this.setState({ isLogInCellPopulated: false });
    } else {
      let lastTimeEntry = this.state.timeEntries[
        this.state.timeEntries.length - 1
      ];

      if (lastTimeEntry[1] === undefined) {
        this.setState({ isLogInCellPopulated: true });
      } else {
        this.setState({ isLogInCellPopulated: false });
      }
    }
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
        )
        .then(() => {
          this.isLogInCellPopulated();
        });
    }
  };

  saveLogInDate = async (date) => {
    let values = [[date]];

    let body = {
      values: values
    };
    await window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .append({
          spreadsheetId: config.SPREADSHEETID,
          range: "Sheet1",
          valueInputOption: "USER_ENTERED",
          resource: body
        })
        .then((response) => {
          let result = response.result;
          console.log(`${result.updates.updatedCells} cells appended.`);
          this.retrieveData();
          this.setState({ isLogInCellPopulated: "load" });
        });
    });
  };

  saveLogOutDate = async (date) => {
    let range = `Sheet1!B${this.state.timeEntries.length + 1}:C`;

    let values = [[date]];

    let body = {
      values: values
    };

    await window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .update({
          spreadsheetId: config.SPREADSHEETID,
          range: range,
          valueInputOption: "USER_ENTERED",
          resource: body
        })
        .then((response) => {
          var result = response.result;
          console.log(`${result.updatedCells} cells updated.`);
          this.retrieveData();
          this.setState({ isLogInCellPopulated: "load" });
        });
    });
  };

  componentDidMount = () => {
    window.gapi.load("client:auth2", this.initClient);
  };

  render() {
    if (this.state.isSignedIn === false) {
      return <div>Please sign in with your Google Account</div>;
    }

    return (
      <div className={styles.test}>
        <TimeEntriesTable timeEntries={this.state.timeEntries} />
        <InputDate
          saveLogIn={this.saveLogInDate}
          saveLogOut={this.saveLogOutDate}
          isLogInCellPopulated={this.state.isLogInCellPopulated}
        />
      </div>
    );
  }
}

export default App;
