import React from "react";
import styles from "./styles/NavigationDrawer.module.css";

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
        <span onClick={this.action}>open</span>
        <div id="mySidenav" className={`${styles.sidenav} ${styleClasses}`}>
          <a href="javascript:void(0)">&times;</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>
      </>
    );
  }
}

export default NavigationDrawer;
