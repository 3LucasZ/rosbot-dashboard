import React, { Component } from "react";
import "../../styles/components.css";

class Widget extends Component {
  render() {
    const outerStyle = {
      left: this.props.widget.x,
      top: this.props.widget.y,
      position: "absolute",
    };
    const headerStyle = {
      cursor: "pointer",
      height: 40,
      width: "100%",
    };
    const noHeaderStyle = {
      height: 40,
      visibility: "hidden",
    };
    const bodyStyle = {
      padding: 20,
    };
    const ComponentType = this.props.widget.type;
    return (
      <div style={outerStyle}>
        <div
          className="bg-dark text-end"
          style={this.props.lock ? noHeaderStyle : headerStyle}
          onMouseDown={(e) =>
            this.props.widget.onWidgetDown(this.props.widget, e)
          }
          onMouseMove={(e) =>
            this.props.widget.onWidgetDrag(this.props.widget, e)
          }
          onMouseUp={(e) => this.props.widget.onWidgetUp(this.props.widget, e)}
        >
          <button
            class="btn btn-danger"
            onClick={() =>
              this.props.widget.onWidgetDelete(this.props.widget.id)
            }
          >
            X
          </button>
        </div>
        <div
          className={this.props.lock ? "bg-none" : "bg-light"}
          style={bodyStyle}
        >
          <ComponentType widget={this.props.widget} />
        </div>
      </div>
    );
  }
}

export default Widget;
