import React from "react";
import styles from "./styles/Buttons.module.css";
import LoadingSpinner from "./LoadingSpinner.jsx";

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
        <button
          className={`${styles.google_button} ${styles.google_button__action}`}
          disabled={true}
        >
          <span className={styles.text}>
            <LoadingSpinner size="2em" />
          </span>
        </button>
      );
    }

    return (
      <button
        className={`${styles.google_button} ${styles.google_button__action}`}
        ref="btn"
        onClick={this.action}
      >
        <span className={styles.text}>{this.buttonTextHandler()}</span>
      </button>
    );
  }
}

export default LogButton;
