import React from "react";
import styles from "./styles/NavigationDrawer.module.css";

class NavigationDrawer extends React.Component {
  state = { display: "hide" };

  action = () => {
    console.log("It's clicked");
  };

  render() {
    let display = this.state.display;
    return (
      <>
        <span onClick={this.action}>open</span>
        <div id="mySidenav" className={`${styles.sidenav} styles.${display}`}>
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
