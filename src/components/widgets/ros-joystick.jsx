import * as ROSLIB from "roslib";
import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import Draggable from "../draggable";

class ROSJoystick extends Component {
  handleMove = (event) => {
    this.state.x = Math.round(event.x);
    this.state.y = Math.round(event.y);
    this.publish();
  };
  handleStop = (event) => {
    this.state.x = 0;
    this.state.y = 0;
    this.publish();
  };

  publish = () => {
    console.log("[", this.state.x, ", ", this.state.y, "]");
    var data = new ROSLIB.Message({
      x: this.state.x,
      y: this.state.y,
    });
    this.state.topic.publish(data);
  };

  render() {
    return (
      <Joystick
        size={200}
        move={this.handleMove}
        stop={this.handleStop}
      ></Joystick>
    );
  }
}

export default ROSJoystick;
