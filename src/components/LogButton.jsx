import React from "react";

class LogButton extends React.Component {
  action = () => {
    if (this.props.isLogInCellPopulated === true) {
      this.props.saveLogOut();
    } else {
      this.props.saveLogIn();
    }
  };

  buttonTextHandler = () => {
    if (this.props.isLogInCellPopulated === true) {
      return "Save log out";
    }
    return "Save log in";
  };

  render() {
    if (this.props.isLogInCellPopulated === "load") {
      return <button disabled={true}>Loading...</button>;
    }

    return (
      <button ref="btn" onClick={this.action}>
        {this.buttonTextHandler()}
      </button>
    );
  }
}

export default LogButton;
