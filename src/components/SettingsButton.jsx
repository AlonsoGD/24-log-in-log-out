import React from "react";

import styles from "./styles/Buttons.module.css";
import SettingsIcon from "./SettingsIcon";
class SettingsButton extends React.Component {
  action = () => {
    return;
  };

  render() {
    return (
      <button onClick={this.action} className={styles.settings_button}>
        <span>
          <SettingsIcon />
        </span>
      </button>
    );
  }
}

export default SettingsButton;
