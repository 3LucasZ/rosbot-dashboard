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
            this.props.handlers.onWidgetDown(this.props.widget, e)
          }
          onMouseMove={(e) =>
            this.props.handlers.onWidgetDrag(this.props.widget, e)
          }
          onMouseUp={(e) =>
            this.props.handlers.onWidgetUp(this.props.widget, e)
          }
          onMouseLeave={(e) =>
            this.props.handlers.onWidgetUp(this.props.widget, e)
          }
        >
          <button
            className="btn btn-danger"
            onClick={() =>
              this.props.handlers.onWidgetDelete(this.props.widget.id)
            }
          >
            X
          </button>
        </div>
        <div
          className={this.props.lock ? "bg-none" : "bg-light"}
          style={bodyStyle}
        >
          <ComponentType
            widget={this.props.widget}
            handlers={this.props.handlers}
          />
        </div>
      </div>
    );
  }
}

export default Widget;
