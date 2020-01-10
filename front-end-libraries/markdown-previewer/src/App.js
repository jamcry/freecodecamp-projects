import React, { Component } from "react";
import Header from "./components/Header";
import Preview from "./components/Preview";
import TextArea from "./components/TextArea";
import marked from "marked";
import sampleMDString from "./sample.js";
import "./styles.css";

class App extends Component {
  state = {
    input: sampleMDString
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  getHTMLString = () => marked(this.state.input);

  render() {
    return (
      <>
        <Header />
        <div className="App">
          <TextArea value={this.state.input} handleChange={this.handleChange} />
          <Preview HTMLString={this.getHTMLString()} />
        </div>
      </>
    );
  }
}

export default App;
