import React from "react";

const TimeEntriesTable = (props) => {
  if (props.timeEntries === []) {
    return <div>Loading...</div>;
  }

  const renderTableData = () => {
    if (props.timeEntries === undefined) {
      return (
        <tr>
          <td>No entries yet...</td>
        </tr>
      );
    }
    return props.timeEntries.map((e) => {
      return (
        <tr key={props.timeEntries.indexOf(e)}>
          <td>{e[0]}</td>
          <td>{e[1]}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default TimeEntriesTable;
