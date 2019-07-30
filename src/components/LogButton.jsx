import React from "react";

class LogButton extends React.Component {
  state = { buttonDisabled: this.props.isLogInCellPopulated };

  disabledStatusHandler = () => {
    if (this.props.isLogInCellPopulated === "load") {
      return true;
    }
    return false;
  };

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
      return <span>Loading...</span>;
    }

    return (
      <>
        {console.log(this.props.isLogInCellPopulated)}
        <button ref="btn" onClick={this.action}>
          {this.buttonTextHandler()}
        </button>
      </>
    );
  }
}

export default LogButton;
