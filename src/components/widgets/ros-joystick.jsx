import React, { Component } from "react";
import { Joystick } from "react-joystick-component";

class ROSJoystick extends Component {
  prev = {
    x: 0,
    y: 0,
  };
  data = {
    x: 0,
    y: 0,
  };
  handleMove = (event) => {
    var tx = -event.x * 0.75;
    var ty = -event.y * 0.75;

    if (Math.abs(this.prev.x - tx) < 2 && Math.abs(this.prev.y - ty) < 2) {
      console.log("Too small");
    } else {
      this.prev.x = tx;
      this.prev.y = ty;
      //polar
      var r = Math.sqrt(tx * tx + ty * ty);
      var t = Math.atan2(ty, tx);

      //rotate 45
      t -= Math.PI / 4;

      //cartesian and scale
      var x = r * Math.cos(t) * Math.sqrt(2);
      var y = r * Math.sin(t) * Math.sqrt(2);

      //set and send
      console.log("(", x, ", ", y, ")");
      this.data.x = Math.round(x);
      this.data.y = Math.round(y);
      this.props.handlers.onPublish(
        this.props.widget,
        JSON.stringify(this.data)
      );
    }
  };
  handleStop = (event) => {
    console.log("Stopping");
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
