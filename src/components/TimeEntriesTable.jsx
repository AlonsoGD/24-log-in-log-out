import React from "react";
import { elapsedTime, ISODateStringToLocaleString } from "../helpers.js";

const TimeEntriesTable = (props) => {
  const tableStyle = { border: "1px solid black", padding: "5px" };

  const renderHeaders = () => {
    if (props.timeEntries.length === 0) {
      return (
        <tr>
          <td>No entries yet...</td>
        </tr>
      );
    }

    return (
      <tr>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Time Spent</th>
      </tr>
    );
  };

  const renderTableData = () => {
    if (props.timeEntries.length === 0) {
      return;
    }
    return props.timeEntries.map((e) => {
      return (
        <tr key={props.timeEntries.indexOf(e)}>
          <td style={tableStyle}>{ISODateStringToLocaleString(e[0])}</td>
          <td style={tableStyle}>{ISODateStringToLocaleString(e[1])}</td>
          <td style={tableStyle}>{elapsedTime(e[0], e[1])}</td>
        </tr>
      );
    });
  };

  return (
    <table>
      <tbody>
        {renderHeaders()}
        {renderTableData()}
      </tbody>
    </table>
  );
};

export default TimeEntriesTable;
