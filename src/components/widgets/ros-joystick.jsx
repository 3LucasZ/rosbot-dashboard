import React, { Component } from "react";
import { Joystick } from "react-joystick-component";

class ROSJoystick extends Component {
  data = {
    x: 0,
    y: 0,
  };
  handleMove = (event) => {
    this.data.x = Math.round(event.x);
    this.data.y = Math.round(event.y);
    this.props.handlers.onPublish(this.props.widget, JSON.stringify(this.data));
  };
  handleStop = (event) => {
    this.data.x = 0;
    this.data.y = 0;
    this.props.handlers.onPublish(this.props.widget, JSON.stringify(this.data));
  };

  render() {
    return (
      <Joystick
        size={200}
        // baseColor="#FFFF99"
        // stickColor="#FFD300"
        move={this.handleMove}
        stop={this.handleStop}
      ></Joystick>
    );
  }
}

export default ROSJoystick;
