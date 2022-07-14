import React, { Component } from "react";
import "../styles/components.css";
class Draggable extends Component {
  initX;
  initY;
  clickX;
  clickY;

  drag = false;

  state = {
    x: 50,
    y: 50,
  };

  styles = {
    position: "absolute",
    left: this.state.x,
    top: this.state.y,
  };

  dragMouseDown = (e) => {
    this.clickX = e.clientX;
    this.clickY = e.clientY;
    this.initX = this.state.x;
    this.initY = this.state.y;
    this.drag = true;
  };
  elementDrag = (e) => {
    if (this.drag) {
      this.setState({
        x: this.initX - this.clickX + e.clientX,
        y: this.initY - this.clickY + e.clientY,
      });
    }
  };
  dragMouseUp = (e) => {
    this.drag = false;
  };

  render() {
    // this.updateStyles();
    return (
      <div
        style={{
          position: "absolute",
          left: this.state.x,
          top: this.state.y,
        }}
      >
        <div
          style={{
            width: 75,
            height: 75,
          }}
          onMouseDown={this.dragMouseDown}
          onMouseMove={this.elementDrag}
          onMouseUp={this.dragMouseUp}
          className="bg-med"
        >
          Handle
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
