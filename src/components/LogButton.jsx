import React from "react";
import styles from "./LogButton.module.css";

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
      return (
        <button className={styles.action_btn} disabled={true}>
          Saving data...
        </button>
      );
    }

    return (
      <button className={styles.action_btn} ref="btn" onClick={this.action}>
        {this.buttonTextHandler()}
      </button>
    );
  }
}

export default LogButton;
