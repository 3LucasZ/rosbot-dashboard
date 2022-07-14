import React, { Component } from "react";
class Console extends Component {
  state = {
    messages: ["jeff", "dangley", "bob"],
  };
  render() {
    return (
      <div className="container">
        {this.state.messages.map((message) => (
          <p>message</p>
        ))}
      </div>
    );
  }
}

export default Console;
