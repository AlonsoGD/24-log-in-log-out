import React from "react";

class LogButton extends React.Component {
  //state = { buttonState: this.props.isLogInCellPopulated };

  action = () => {
    this.props.action();
  };

  render() {
    return (
      <button disabled={this.props.isLogInCellPopulated} onClick={this.action}>
        {this.props.buttonText}
      </button>
    );
  }
}

export default LogButton;
