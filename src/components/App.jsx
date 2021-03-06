import React from "react";

import HeaderTitle from "./HeaderTitle.jsx";
import TimeEntriesTable from "./TimeEntriesTable.jsx";
import InputDate from "./InputDate.jsx";
import AuthButton from "./AuthButton.jsx";
import Background from "./Background.jsx";
import NavigationDrawer from "./NavigationDrawer.jsx";

import config from "../config";
import styles from "./styles/App.module.css";
import LoadingSpinner from "./LoadingSpinner.jsx";

class App extends React.Component {
  state = {
    isSignedIn: "load",
    timeEntries: [],
    isLogInCellPopulated: "load",
    dateFormat: "allDigits",
    formatCounter: 0
  };

  cycleDateFormats = () => {
    const dateFormats = ["allDigits", "short", "long", "narrow"];

    this.setState({
      dateFormat: dateFormats[this.state.formatCounter + 1],
      formatCounter: this.state.formatCounter + 1
    });

    if (this.state.formatCounter === dateFormats.length - 1) {
      this.setState({ dateFormat: dateFormats[0], formatCounter: 0 });
    }
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
          this.retrieveUserDB();
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
    this.retrieveUserDB();
  };

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick = (statusFromAuthButton) => {
    this.setState({
      isSignedIn: statusFromAuthButton,
      timeEntries: []
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

  createSpreadSheet = () => {
    window.gapi.client.sheets.spreadsheets
      .create({
        properties: {
          title: "logInLogOut_log"
        }
      })
      .then((response) => {
        config.USER_SPREADSHEETID = response.result.spreadsheetId;
        this.createNewUser();
        this.retrieveEntriesData();
      });
  };

  createNewUser = () => {
    let googleUserOpenId = window.gapi.auth2.getAuthInstance().currentUser.Ab
      .El;

    let values = [[googleUserOpenId, config.USER_SPREADSHEETID]];

    let body = {
      values: values
    };
    window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .append({
          spreadsheetId: config.DB_SPREADSHEETID,
          range: "Sheet1!A2:C",
          valueInputOption: "USER_ENTERED",
          resource: body
        })
        .then((response) => {
          let result = response.result;
          console.log(`${result.updates.updatedCells} cells appended.`);
        });
    });
  };

  searchSpreadsheetID = (usersDbArray) => {
    let googleUserOpenId = window.gapi.auth2.getAuthInstance().currentUser.je
      .Ca;
    for (let i = 0; i < usersDbArray.length; i++) {
      if (usersDbArray[i][0] === googleUserOpenId) {
        config.USER_SPREADSHEETID = usersDbArray[i][1];
      }
    }
  };

  retrieveUserDB = () => {
    if (this.state.isSignedIn === true) {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.DB_SPREADSHEETID,
          range: "Sheet1!A2:C"
        })
        .then(
          (response) => {
            this.searchSpreadsheetID(response.result.values);
          },
          (response) => {
            alert("Error: " + response.result.error.message);
          }
        )
        .then(() => {
          if (config.USER_SPREADSHEETID === "") {
            this.createSpreadSheet();
          } else {
            this.retrieveEntriesData();
          }
        });
    }
  };

  retrieveEntriesData = () => {
    if (this.state.isSignedIn === true) {
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: config.USER_SPREADSHEETID,
          range: "Sheet1!A1:C"
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
          spreadsheetId: config.USER_SPREADSHEETID,
          range: "Sheet1",
          valueInputOption: "USER_ENTERED",
          resource: body
        })
        .then((response) => {
          //let result = response.result;
          //console.log(`${result.updates.updatedCells} cells appended.`);
          this.retrieveEntriesData();
        });
    });
  };

  saveLogOut = (date) => {
    this.updateLogOutTimeEntriesState(date);

    this.setState({
      isLogInCellPopulated: "load"
    });

    let range = `Sheet1!B${this.state.timeEntries.length + 1}:C`;

    let values = [[date]];

    let body = {
      values: values
    };

    window.gapi.client.load("sheets", "v4", () => {
      window.gapi.client.sheets.spreadsheets.values
        .update({
          spreadsheetId: config.USER_SPREADSHEETID,
          range: range,
          valueInputOption: "USER_ENTERED",
          resource: body
        })
        .then((response) => {
          //var result = response.result;
          //console.log(`${result.updatedCells} cells updated.`);
          this.retrieveEntriesData();
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
          <LoadingSpinner size="10em" />
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
        <div className={styles.menuButton_wrapper}>
          <NavigationDrawer
            cycleDateFormats={this.cycleDateFormats}
          ></NavigationDrawer>
        </div>
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
          <TimeEntriesTable
            timeEntries={this.state.timeEntries}
            dateFormat={this.state.dateFormat}
          />
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
