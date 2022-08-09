import React, { Component } from "react";
import "../../styles/components.css";

class Subscriber extends Component {
  render() {
    return (
      <div className="bg-light">
        <p>Topic: {this.props.widget.name} </p>
        <p>Data: {this.props.widget.data} </p>
      </div>
    );
  }
}

export default Subscriber;
