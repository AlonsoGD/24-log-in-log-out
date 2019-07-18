import React from "react";
import TimeEntriesTable from "./TimeEntriesTable.jsx";
import handleClientLoad from "../googleAuth";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {handleClientLoad()}
        <TimeEntriesTable />
      </div>
    );
  }
}

export default App;
