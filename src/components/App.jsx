import React from "react";

import HeaderTitle from "./HeaderTitle.jsx";
import TimeEntriesTable from "./TimeEntriesTable.jsx";
import InputDate from "./InputDate.jsx";
import AuthButton from "./AuthButton.jsx";
import Background from "./Background.jsx";

import config from "../config";
import styles from "./styles/App.module.css";

class App extends React.Component {
  state = {
    isSignedIn: "load",
    timeEntries: [],
    isLogInCellPopulated: "load"
  };

  initClient = () => {
    window.gapi.client
      .init({
        clientId: config.CLIENT_ID,
        discoveryDocs: config.DISCOVERY_DOCS,
        scope: config.SCOPES
      })
      .then(
        () => {
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance();
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

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick = (statusFromAuthButton) => {
    this.setState({
      isSignedIn: statusFromAuthButton
    });
    this.retrieveData();
  };

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick = (statusFromAuthButton) => {
    this.setState({
      isSignedIn: statusFromAuthButton
    });
  };

  //checks if log in cell in the spreadsheet is populated
  isLogInCellPopulated = () => {
    if (this.state.timeEntries.length === 0) {
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
            if (response.result.values !== undefined) {
              this.setState({
                timeEntries: response.result.values
              });
            }
          },
          (response) => {
            alert("Error: " + response.result.error.message);
          }
        )
        .then(() => {
          this.isLogInCellPopulated();
        });
    }
  };

  updateLogOutTimeEntriesState = (date) => {
    let lastArrayInState = this.state.timeEntries[
      this.state.timeEntries.length - 1
    ][0];
    let previousState = this.state.timeEntries;

    previousState.pop();

    this.setState({
      timeEntries: [...previousState, [lastArrayInState, date.toJSON()]]
    });
  };

  updateLogInTimeEntriesState = (date) => {
    this.setState({
      timeEntries: [...this.state.timeEntries, [date.toJSON(), ""]]
    });
  };

  saveLogIn = (date) => {
    this.updateLogInTimeEntriesState(date);

    this.setState({
      isLogInCellPopulated: "load"
    });

    let values = [[date]];

    let body = {
      values: values
    };
    window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .append({
          spreadsheetId: config.SPREADSHEETID,
          range: "Sheet1",
          valueInputOption: "USER_ENTERED",
          resource: body
        })
        .then((response) => {
          //let result = response.result;
          //console.log(`${result.updates.updatedCells} cells appended.`);
          this.retrieveData();
        });
    });
  };

  saveLogOut = (date) => {
    this.updateLogOutTimeEntriesState(date);

    this.setState({
      isLogInCellPopulated: "load"
    });

    let range = `Sheet1!B${this.state.timeEntries.length + 2}:C`;

    let values = [[date]];

    let body = {
      values: values
    };

    window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .update({
          spreadsheetId: config.SPREADSHEETID,
          range: range,
          valueInputOption: "USER_ENTERED",
          resource: body
        })
        .then((response) => {
          //var result = response.result;
          //console.log(`${result.updatedCells} cells updated.`);
          this.retrieveData();
        });
    });
  };

  componentDidMount = () => {
    window.gapi.load("client:auth2", this.initClient);
  };

  render() {
    if (this.state.isSignedIn === "load") {
      return (
        <>
          <div>LOADING...</div>
          <Background />
        </>
      );
    } else if (this.state.isSignedIn === false) {
      return (
        <>
          <div className={styles.header_bar}>
            <div className={styles.header_title}>
              <HeaderTitle title="Time Logger" />
            </div>
            <div className={styles.auth_button}>
              <AuthButton
                handleAuthClick={this.handleAuthClick}
                handleSignoutClick={this.handleSignoutClick}
                isSignedIn={this.state.isSignedIn}
              />
            </div>
          </div>
          <div>Please sign in with your Google Account</div>
          <Background />
        </>
      );
    }

    return (
      <>
        <header className={styles.header_bar}>
          <div className={styles.header_title}>
            <HeaderTitle title="Time Logger" />
          </div>
          <div className={styles.auth_button}>
            <AuthButton
              handleAuthClick={this.handleAuthClick}
              handleSignoutClick={this.handleSignoutClick}
              isSignedIn={this.state.isSignedIn}
            />
          </div>
        </header>
        <section className={styles.timeEntries_section}>
          <TimeEntriesTable timeEntries={this.state.timeEntries} />
        </section>
        <section className={styles.inputDate_section}>
          <InputDate
            saveLogIn={this.saveLogIn}
            saveLogOut={this.saveLogOut}
            isLogInCellPopulated={this.state.isLogInCellPopulated}
          />
        </section>
        <Background />
      </>
    );
  }
}

export default App;
