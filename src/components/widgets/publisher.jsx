import React, { Component } from "react";
import "../../styles/components.css";

class Publisher extends Component {
  render() {
    return (
      <div className="bg-light">
        <form
          onSubmit={(e) => this.props.handlers.onPublish(this.props.widget, e)}
        >
          <label>
            {"Topic: "}
            <input
              type="text"
              value={this.props.widget.topic}
              onChange={(e) =>
                this.props.handlers.onEditTopic(this.props.widget, e)
              }
            />
          </label>
          <br />
          <label>
            {"Type: "}
            <input
              type="text"
              value={this.props.type}
              onChange={(e) =>
                this.props.handlers.onEditDatatype(this.props.widget, e)
              }
            />
          </label>
          <br />
          <label>
            {"Message: "}
            <input
              type="text"
              value={this.props.data}
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
