import React from "react";
import Widget from "./components/widgets/widget";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Stream from "./components/stream";
import * as ROSLIB from "roslib";

class App extends React.Component {
  state = {
    ros: new ROSLIB.Ros({ url: "ws://192.168.1.241:9090" }),
    widgets: [],
    lock: false,
    nextID: 0,
    message: "None",
    image: "",
  };
  //dragging
  meta = {
    initX: 200,
    initY: 200,
    clickX: 0,
    clickY: 0,
    drag: false,
  };

  componentDidMount() {
    fetch("/api")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          message: json.message,
        });
      });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar
          add={this.handleAdd}
          onToggleLock={this.handleToggleLock}
          lock={this.state.lock}
        />
        <Stream
          ros={this.state.ros}
          image={this.state.image}
          handleImage={this.handleImage}
        />

        {this.state.widgets.map((widget) => {
          return (
            <Widget
              lock={this.state.lock}
              key={widget.id}
              widget={widget}
              handlers={{
                //drag
                onWidgetDown: this.handleWidgetDown,
                onWidgetDrag: this.handleWidgetDrag,
                onWidgetUp: this.handleWidgetUp,
                //delete
                onWidgetDelete: this.handleWidgetDelete,
                //ROS
                onEditTopic: this.handleEditTopic,
                onEditDatatype: this.handleEditDatatype,
                onSaveTopic: this.handleSaveTopic,
                onEditData: this.handleEditData,
                onPublish: this.handlePublish,
              }}
            />
          );
        })}
        <h1>Messages from server: {this.state.message}</h1>
      </div>
    );
  }

  //Stream: receive
  handleImage = (data) => {
    this.setState({
      image: data,
    });
  };

  //Sidebar: add
  handleAdd = (type, mode) => {
    var widgets = [...this.state.widgets];
    widgets.push({
      //locate
      id: this.state.nextID,
      //display
      type: type,
      x: 200,
      y: 200,
      //ROS
      mode: mode,
      name: "/chatter",
      datatype: "std_msgs/String",
      data: '{ "data": "Hello" }',
      topic: new ROSLIB.Topic({
        ros: this.state.ros,
        name: "/chatter",
        messageType: "std_msgs/String",
      }),
    });
    this.setState({
      widgets: widgets,
      nextID: this.state.nextID + 1,
    });
  };

  //Sidebar: lock
  handleToggleLock = () => {
    this.setState({
      lock: !this.state.lock,
    });
  };

  //Sidebar: save
  saveWidgets() {}

  // Sidebar: delete
  handleWidgetDelete = (id) => {
    const widgets = this.state.widgets.filter((w) => w.id !== id);
    this.setState({
      widgets: widgets,
    });
  };

  // Widget: drag
  handleWidgetDown = (widget, e) => {
    const widgets = [...this.state.widgets];
    const i = widgets.indexOf(widget);
    //console.log("Clicked ", widget.id);
    this.meta.initX = widgets[i].x;
    this.meta.initY = widgets[i].y;
    this.meta.clickX = e.clientX;
    this.meta.clickY = e.clientY;
    if (!this.state.lock) this.meta.drag = true;
  };
  handleWidgetDrag = (widget, e) => {
    const widgets = [...this.state.widgets];
    const i = widgets.indexOf(widget);
    if (this.meta.drag) {
      //console.log("Dragged ", widget.id);
      widgets[i].x = this.meta.initX - this.meta.clickX + e.clientX;
      widgets[i].y = this.meta.initY - this.meta.clickY + e.clientY;
      //console.log("New coord: ", widgets[i].x, ",", widgets[i].y);
      this.setState({
        widgets: widgets,
      });
    }
  };
  handleWidgetUp = (widget, e) => {
    //console.log("Lifted ", widget.id);
    this.meta.drag = false;
  };

  // Widget: ROS
  //Topic change
  handleEditTopic = (widget, e) => {
    //console.log("Lifted ", widget.id);
    const widgets = [...this.state.widgets];
    const i = widgets.indexOf(widget);
    widgets[i].name = e.target.value;
    this.setState({
      widgets: widgets,
    });
  };
  handleEditDatatype = (widget, e) => {
    const widgets = [...this.state.widgets];
    const i = widgets.indexOf(widget);
    widgets[i].datatype = e.target.value;
    this.setState({
      widgets: widgets,
    });
  };
  handleSaveTopic = (widget) => {
    const widgets = [...this.state.widgets];
    const i = widgets.indexOf(widget);
    if (widgets[i].mode == "subscriber") {
      widgets[i].topic.unsubscribe();
    }
    widgets[i].topic = new ROSLIB.Topic({
      ros: this.state.ros,
      name: widgets[i].name,
      messageType: widgets[i].datatype,
    });
    if (widgets[i].mode == "subscriber") {
      widgets[i].topic.subscribe((msg) => {
        this.handleNewData(widget, msg.data);
      });
    }
    this.setState({
      widgets: widgets,
    });
  };

  //Topic Ops
  //Publisher Ops
  handleEditData = (widget, e) => {
    const widgets = [...this.state.widgets];
    const i = widgets.indexOf(widget);
    widgets[i].data = e.target.value;
    this.setState({
      widgets: widgets,
    });
  };
  handlePublish = (widget, data) => {
    const widgets = [...this.state.widgets];
    const i = widgets.indexOf(widget);
    var json;
    try {
      json = JSON.parse(data);
    } catch (err) {
      console.log("Error parsing JSON: ", data);
    }
    var msg = new ROSLIB.Message(json);
    widgets[i].topic.publish(msg);
  };

  //Subscriber Ops
  handleNewData = (widget, data) => {
    const widgets = [...this.state.widgets];
    const i = widgets.indexOf(widget);
    widgets[i].data = data;
    this.setState({
      widgets: widgets,
    });
  };
}

export default App;
