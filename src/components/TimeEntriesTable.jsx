import React from "react";
import { elapsedTime, ISODateStringToLocaleString } from "../helpers.js";
import styles from "./styles/TimeEntries.module.css";

class TimeEntriesTable extends React.Component {
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
            {ISODateStringToLocaleString(dateRecord[0], this.props.dateFormat)}
          </td>
          <td className={styles.te_cells}>
            {ISODateStringToLocaleString(dateRecord[1], this.props.dateFormat)}
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
      </>
    );
  }
}

export default TimeEntriesTable;
