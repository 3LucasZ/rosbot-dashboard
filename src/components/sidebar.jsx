import React, { Component } from "react";
import Publisher from "./widgets/publisher";
import ROSJoystick from "./widgets/ros-joystick";
import Subscriber from "./widgets/subscriber";

class Sidebar extends Component {
  buttons = [
    {
      key: 0,
      type: Publisher,
      label: "Publisher",
      mode: "publisher",
    },
    {
      key: 1,
      type: ROSJoystick,
      label: "Joystick",
      mode: "publisher",
    },
    {
      key: 2,
      type: Subscriber,
      label: "Subscriber",
      mode: "subscriber",
    },
  ];
  render() {
    return (
      <div
        style={{
          display: "inline-block",
          verticalAlign: "top",
        }}
      >
        <div>
          <button
            className="btn btn-secondary"
            //style={{ display: "block" }}
            onClick={this.props.onToggleLock}
          >
            <i
              className={
                this.props.lock ? "bi bi-lock-fill" : "bi bi-unlock-fill"
              }
            ></i>
          </button>
          <button
            className="btn btn-warning"
            //style={{ display: "block" }}
            onClick={this.props.onToggleLock}
          >
            <i className="bi bi-upload"></i>
          </button>
        </div>
        <div style={{ height: 30 }} />
        <div>
          {this.buttons.map((button) => {
            return (
              <button
                key={button.key}
                className="btn btn-success"
                style={{ display: "block", marginBottom: 10 }}
                onClick={() => this.props.add(button.type, button.mode)}
              >
                Add {button.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Sidebar;
