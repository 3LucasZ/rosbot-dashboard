import React, { Component } from "react";
import Publisher from "./widgets/publisher";
import ROSJoystick from "./widgets/ros-joystick";

class Sidebar extends Component {
  buttons = [
    {
      type: Publisher,
      label: "Publisher",
    },
    {
      type: ROSJoystick,
      label: "Joystick",
    },
  ];
  render() {
    return (
      <div>
        <div>
          <button
            class="btn btn-secondary"
            style={{ display: "block" }}
            onClick={this.props.onToggleLock}
          >
            <i
              class={this.props.lock ? "bi bi-lock-fill" : "bi bi-unlock-fill"}
            ></i>
          </button>
        </div>
        <div style={{ height: 30 }} />
        <div>
          {this.buttons.map((button) => {
            return (
              <button
                class="btn btn-success"
                style={{ display: "block" }}
                onClick={() => this.props.add(button.type)}
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
