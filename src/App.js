import React, { Component } from "react";
import "./App.css";

const API =
  "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      score: 0,
      correct_answer: "",
      incorrect_answers: ""
    };
  }

  handleClick = event => {
    const isRight = this.state.correct_answer;
    this.setState({
      score: this.state.score + 1,
      correct_answer: event.target.value,
      incorrect_answers: event.target.value
    });
  };

  componentDidMount() {
    this.populateAppWithData();
  }

  populateAppWithData() {
    const showData = fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ results: data.results }));
    console.log(showData);
  }

  render() {

    const results = this.state.results.slice().map((result, index) => (
      <ul onClick={this.handleClick.bind(this)} key={`result ${index}`}>
        <li>
          <h2> {result.question}</h2>
          {""}
          <h5>{result.correct_answer}</h5>
        </li>
        {result.incorrect_answers.map(incAnswer => (
          <li>
            <h5>{incAnswer}</h5>
          </li>
        ))}
      </ul>
    ));

    return (
      <div className="App">
        <h1>Quiz App</h1>
        <div>{results[Math.floor(Math.random() * results.length)]}</div>
        <div>Score: {this.state.score}</div>
      </div>
    );
  }
}


export default App;
