import React, { Component } from "react";
import ReactHtmlParse from "react-html-parser";
import "./Preview.css";

class Preview extends Component {
  render() {
    return (
      <div className="box-container">
        <div className="box-title">Preview</div>
        <div id="preview">{ReactHtmlParse(this.props.HTMLString)}</div>
      </div>
    );
  }
}

export default Preview;
