import React from "react";
import config from "../config.js";

class TimeEntriesTable extends React.Component {
  state = { timeEntries: [] };

  renderTableData = () => {
    let tableStyle = { border: "1px solid black" };

    return this.state.timeEntries.map((e) => {
      return (
        <tr key={this.state.timeEntries.indexOf(e)}>
          <td>{e[0]}</td>
          <td>{e[1]}</td>
        </tr>
      );
    });
  };

  retrieveData = () => {
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
  };

  render() {
    return (
      <div>
        <button onClick={this.retrieveData}>Retrieve data</button>
        <table>
          <tbody>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TimeEntriesTable;
