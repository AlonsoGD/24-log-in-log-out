import React from "react";

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
    return "Log in";
  };

  render() {
    return <button onClick={this.action}>{this.buttonTextHandler()}</button>;
  }
}

export default AuthButton;
