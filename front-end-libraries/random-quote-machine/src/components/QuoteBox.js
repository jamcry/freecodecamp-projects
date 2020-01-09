import React, { Component } from 'react'
import "./QuoteBox.scss";
import {ReactComponent as TwitterLogo} from "../twitter.svg";

class QuoteBox extends Component {
  state = {
    data: {}
  }

  fetchQuote = () => {
    // Programming Quotes API by @skolakoda - https://github.com/skolakoda/programming-quotes-api
    const url = "https://programming-quotes-api.herokuapp.com/quotes/random";
    fetch(url)
    .then(res => res.json())
    .then(data => this.setState({ data }))
    .catch(err => console.error(err.message));
  }

  componentDidMount = () => {
    this.fetchQuote();
  }

  render () {
    return (
      <div id="quote-box">
        <div id="text">{this.state.data.en || "Loading..."}</div>
        <div id="author">- {this.state.data.author}</div>
        <button id="new-quote" onClick={this.fetchQuote}>New Quote</button>
        <a href="https://twitter.com/intent/tweet" id="tweet-quote">
          <TwitterLogo />
        </a>
      </div>
    );
  }
};

export default QuoteBox;
