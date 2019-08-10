import React from "react";

import styles from "./styles/Buttons.module.css";
import GoogleIcon from "./GoogleIcon";
class AuthButton extends React.Component {
  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick = async (event) => {
    this.props.handleAuthClick("load");
    await window.gapi.auth2.getAuthInstance().signIn();
    this.props.handleAuthClick(
      window.gapi.auth2.getAuthInstance().isSignedIn.get()
    );
  };

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick = async (event) => {
    await window.gapi.auth2.getAuthInstance().signOut();
    this.props.handleSignoutClick(
      window.gapi.auth2.getAuthInstance().isSignedIn.get()
    );
  };

  action = () => {
    if (this.props.isSignedIn === true) {
      this.handleSignoutClick();
    } else {
      this.handleAuthClick();
    }
  };

  buttonTextHandler = () => {
    if (this.props.isSignedIn === true) {
      return "Log out";
    }
    return "Sign in with Google";
  };

  render() {
    return (
      <button
        className={`${styles.google_button} ${styles.google_button__signIn}`}
        onClick={this.action}
      >
        <span className={styles.google_icon}>
          <GoogleIcon />
        </span>
        <span className={styles.text}>{this.buttonTextHandler()}</span>
      </button>
    );
  }
}

export default AuthButton;
