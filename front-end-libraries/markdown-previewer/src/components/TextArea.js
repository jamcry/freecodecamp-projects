import React, { Component } from "react";

import "./TextArea.css";

class TextArea extends Component {
  render() {
    return (
      <div className="box-container x">
        <div className="box-title">Markdown</div>
        <textarea
          id="editor"
          value={this.props.value}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default TextArea;
