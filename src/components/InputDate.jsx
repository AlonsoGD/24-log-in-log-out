import React from "react";
import { toTimeInputValue, toDateInputValue } from "../helpers.js";
import LogButton from "./LogButton.jsx";

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
  };

  saveLogOut = () => {
    this.props.saveLogOut(this.stateToDate());
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
        <LogButton
          action={this.saveLogIn}
          buttonText="Log in Entry"
          isLogInCellPopulated={this.props.isLogInCellPopulated}
        />
        <LogButton
          action={this.saveLogOut}
          buttonText="Log Out Entry"
          isLogInCellPopulated={!this.props.isLogInCellPopulated}
        />
      </>
    );
  }
}

export default InputDate;
