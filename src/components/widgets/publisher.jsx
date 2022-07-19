import React, { Component } from "react";
import "../../styles/components.css";

class Publisher extends Component {
  render() {
    return (
      <div className="bg-light">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.props.handlers.onPublish(
              this.props.widget,
              this.props.widget.data
            );
          }}
        >
          <label>Topic: {this.props.widget.topic}</label>
          <br />
          <label>
            {"Message: "}
            <input
              type="text"
              value={this.props.widget.data}
              onChange={(e) =>
                this.props.handlers.onEditData(this.props.widget, e)
              }
            />
          </label>
          <br />
          <input
            type="submit"
            value="Publish"
            className="btn btn-secondary"
            style={{ marginTop: 10 }}
          />
        </form>
      </div>
    );
  }
}

export default Publisher;
