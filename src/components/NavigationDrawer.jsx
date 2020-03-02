import React from "react";
import styles from "./styles/NavigationDrawer.module.css";

import SettingsButton from "./SettingsButton.jsx";
import DateFormatButton from "./DateFormatButton.jsx";
import LineDivider from "./LineDivider.jsx";

class NavigationDrawer extends React.Component {
  state = { hideNav: false };

  action = () => {
    if (this.state.hideNav === true) {
      this.setState({ hideNav: false });
    } else {
      this.setState({ hideNav: true });
    }
  };

  render() {
    let styleClasses = this.state.hideNav ? styles.show : styles.hide;
    return (
      <>
        <span onClick={this.action}>
          <SettingsButton></SettingsButton>
        </span>
        <div id="mySidenav" className={`${styles.sidenav} ${styleClasses}`}>
          <h2 className={styles.navTitle}>Settings</h2>
          <LineDivider color="#818181"></LineDivider>
          <button onClick={this.action} className={styles.closebutton}>
            &times;
          </button>
          <DateFormatButton cycleDateFormats={this.props.cycleDateFormats} />
        </div>
      </>
    );
  }
}

export default NavigationDrawer;
