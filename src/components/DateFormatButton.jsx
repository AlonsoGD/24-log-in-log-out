import React from "react";
import styles from "./styles/Buttons.module.css";

class LogButton extends React.Component {
  action = () => {
    this.props.cycleDateFormats();
  };

  render() {
    return (
      <button
        className={`${styles.google_button} ${styles.google_button__action}`}
        ref="btn"
        onClick={this.action}
      >
        <span className={styles.text}>Change date format</span>
      </button>
    );
  }
}

export default LogButton;
