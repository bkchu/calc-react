import React, { Component } from "react";

class Output extends Component {
  componentDidUpdate() {
    this.inputRef.scrollTop = this.inputRef.scrollHeight;
  }
  render() {
    return (
      <textarea
        style={{ maxHeight: "100px" }}
        onChange={this.props.changed}
        value={this.props.query}
        className="Output"
        ref={input => (this.inputRef = input)}
      >
        {this.props.query}
      </textarea>
    );
  }
}

export default Output;
