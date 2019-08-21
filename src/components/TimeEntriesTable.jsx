import React from "react";
import { elapsedTime, ISODateStringToLocaleString } from "../helpers.js";

import styles from "./styles/TimeEntries.module.css";

class TimeEntriesTable extends React.Component {
  state = { dateFormat: "default" };

  renderHeaders = () => {
    if (this.props.timeEntries.length === 0) {
      return (
        <tr>
          <td>No entries yet...</td>
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
    return this.props.timeEntries.map((e) => {
      return (
        <tr key={this.props.timeEntries.indexOf(e)}>
          <td className={styles.te_cells}>
            {ISODateStringToLocaleString(e[0])}
          </td>
          <td className={styles.te_cells}>
            {ISODateStringToLocaleString(e[1])}
          </td>
          <td className={styles.te_cells}>{elapsedTime(e[0], e[1])}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <table className={styles.te_table}>
        <tbody>
          {this.renderHeaders()}
          {this.renderTableData()}
        </tbody>
      </table>
    );
  }
}

export default TimeEntriesTable;
