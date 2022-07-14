import React, { Component } from "react";
import "../../styles/components.css";

class Publisher extends Component {
  render() {
    return (
      <div>
        <form
          onSubmit={(e) => this.props.widget.onPublish(this.props.widget, e)}
        >
          <label>
            Topic:
            <input
              type="text"
              value={this.props.widget.topic}
              onChange={(e) =>
                this.props.widget.onEditTopic(this.props.widget, e)
              }
            />
          </label>
          <br />
          <label>
            Type:
            <input
              type="text"
              value={this.props.type}
              onChange={(e) =>
                this.props.widget.onEditDatatype(this.props.widget, e)
              }
            />
          </label>
          <br />
          <label>
            Message:
            <input
              type="text"
              value={this.props.data}
              onChange={(e) =>
                this.props.widget.onEditData(this.props.widget, e)
              }
            />
          </label>
          <br />
          <input type="submit" value="Publish" />
        </form>
      </div>
    );
  }
}

export default Publisher;
