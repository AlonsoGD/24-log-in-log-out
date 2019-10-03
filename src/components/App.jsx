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
          this.retrieveUserData();
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
    this.retrieveUserData();
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

  retrieveUserData = () => {
    let searchSpreadsheetID = (myArray) => {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i][0] === userEmail) {
          console.log(myArray[i][1]);
          return myArray[i][1];
        }
      }
    };

    if (this.state.isSignedIn === true) {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.DB_SPREADSHEETID,
          range: "Sheet1!A2:C"
        })
        .then(
          (response) => {
            searchSpreadsheetID(response.result.values);
          },
          (response) => {
            alert("Error: " + response.result.error.message);
          }
        );
    }
  };

  retrieveData = () => {
    if (this.state.isSignedIn === true) {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          USER_SPREADSHEETID: config.USER_SPREADSHEETID,
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
          USER_SPREADSHEETID: config.USER_SPREADSHEETID,
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
          USER_SPREADSHEETID: config.USER_SPREADSHEETID,
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
          <div className={styles.centered}>
            Please sign in with your Google Account
          </div>
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
        </header>
        <section className={styles.inputDate_section}>
          <div className={styles.m_15}>
            <h3>Select the date and save the entry:</h3>
          </div>
          <div>
            <InputDate
              saveLogIn={this.saveLogIn}
              saveLogOut={this.saveLogOut}
              isLogInCellPopulated={this.state.isLogInCellPopulated}
            />
          </div>
        </section>
        <section className={styles.timeEntries_section}>
          <TimeEntriesTable timeEntries={this.state.timeEntries} />
        </section>
        <div className={styles.auth_button_wrapper}>
          <AuthButton
            handleAuthClick={this.handleAuthClick}
            handleSignoutClick={this.handleSignoutClick}
            isSignedIn={this.state.isSignedIn}
          />
        </div>
        <Background />
      </>
    );
  }
}

export default App;
