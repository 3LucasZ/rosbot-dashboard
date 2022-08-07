import React, { Component } from "react";
import * as ROSLIB from "roslib";

class Stream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: new ROSLIB.Topic({
        ros: this.props.ros,
        name: "/image",
        messageType: "std_msgs/String",
      }),
    };
    this.state.stream.subscribe(function (msg) {
      props.handleImage("data:image/jpeg;base64," + msg.data);
    });
  }

  render() {
    return (
      <img
        src={
          this.props.image.length == 0
            ? require("./blank.jpg")
            : this.props.image
        }
        width={"500"}
        height={"500"}
      />
    );
  }
}

export default Stream;
