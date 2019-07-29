import React from "react";
import { toTimeInputValue, toDateInputValue } from "../helpers.js";

class InputDate extends React.Component {
  state = {
    date: toDateInputValue(),
    time: toTimeInputValue()
  };

  stateToDate = () => {
    let fullDate = this.state.date + " " + this.state.time;
    return new Date(fullDate);
  };

  saveLogIn = () => {
    this.props.saveLogIn(this.stateToDate());
    this.setState({ disableButton: true });
  };

  saveLogOut = () => {
    this.props.saveLogOut(this.stateToDate());
    this.setState({ disableButton: false });
  };

  render() {
    return (
      <>
        <input
          type="date"
          value={this.state.date}
          onChange={(e) => {
            this.setState({ date: e.target.value });
          }}
        />
        <input
          type="time"
          value={this.state.time}
          onChange={(e) => {
            this.setState({ time: e.target.value });
          }}
        />
        <button onClick={this.saveLogIn}>Log in</button>
        <button onClick={this.saveLogOut}>Log out</button>
      </>
    );
  }
}

export default InputDate;
