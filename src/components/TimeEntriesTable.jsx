import React from "react";
import { elapsedTime, ISODateStringToLocaleString } from "../helpers.js";
import DateFormatButton from "./DateFormatButton";

import styles from "./styles/TimeEntries.module.css";

class TimeEntriesTable extends React.Component {
  state = { dateFormat: "allDigits", formatCounter: 0 };

  cycleDateFormats = () => {
    const dateFormat = ["allDigits", "short", "long", "narrow"];

    if (this.state.formatCounter === dateFormat.length) {
      this.setState({ dateFormat: dateFormat[0], formatCounter: 0 });
    }

    this.setState({
      dateFormat: dateFormat[this.state.formatCounter + 1],
      formatCounter: this.state.formatCounter + 1
    });

    console.log(this.state);
  };

  renderHeaders = () => {
    if (this.props.timeEntries.length === 0) {
      return (
        <tr>
          <td className={styles.te_cells}>No entries yet...</td>
        </tr>
      );
    }

    return (
      <tr className={styles.te_row}>
        <th className={styles.te_headers}>START TIME</th>
        <th className={styles.te_headers}>END TIME</th>
        <th className={styles.te_headers}>TIME SPENT</th>
      </tr>
    );
  };

  renderTableData = () => {
    if (this.props.timeEntries.length === 0) {
      return;
    }
    return this.props.timeEntries.map((dateRecord) => {
      return (
        <tr key={this.props.timeEntries.indexOf(dateRecord)}>
          <td className={styles.te_cells}>
            {ISODateStringToLocaleString(dateRecord[0], this.state.dateFormat)}
          </td>
          <td className={styles.te_cells}>
            {ISODateStringToLocaleString(dateRecord[1], this.state.dateFormat)}
          </td>
          <td className={styles.te_cells}>
            {elapsedTime(dateRecord[0], dateRecord[1])}
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <>
        <table className={styles.te_table}>
          <tbody>
            {this.renderHeaders()}
            {this.renderTableData()}
          </tbody>
        </table>
        <DateFormatButton cycleDateFormats={this.cycleDateFormats} />
      </>
    );
  }
}

export default TimeEntriesTable;
