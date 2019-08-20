import React from "react";
//import { toTimeInputValue, toDateInputValue } from "../helpers.js";

import Flatpickr from "react-flatpickr";
import LogButton from "./LogButton.jsx";

import "./styles/InputDate.css";

class InputDate extends React.Component {
  state = {
    date: new Date()
  };

  saveLogIn = () => {
    this.props.saveLogIn(this.state.date);
  };

  saveLogOut = () => {
    this.props.saveLogOut(this.state.date);
  };

  render() {
    return (
      <>
        <Flatpickr
          data-enable-time
          value={this.state.date}
          options={{ static: true }}
          onChange={(date) => {
            this.setState({ date: new Date(date) });
          }}
        />
        <LogButton
          saveLogOut={this.saveLogOut}
          saveLogIn={this.saveLogIn}
          isLogInCellPopulated={this.props.isLogInCellPopulated}
        />
      </>
    );
  }
}

export default InputDate;
