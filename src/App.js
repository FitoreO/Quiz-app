import React, { Component } from "react";
import "./App.css";

const API =
  "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      score: []
    };
  }

  componentDidMount() {
    this.populateAppWithData();
  }

  populateAppWithData() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ results: data.results }));
  }

  render() {
    const { results } = this.state;
    return (
      <div className="App">
        <h1>Quiz App</h1>
        <TheCounter results={results}
          Counter={this.state.score}
          right={this.state.correct_answer}
        />
      </div>
    );
  }
}
class MythologyAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: "",
      isRight: null
    };
  }
  answerClicked(answer) {
    const { hasAnswered, correct_answer } = this.props;
    return event => {
      const isRight = correct_answer === answer;
      hasAnswered(isRight);
      this.setState({ answered: answer, isRight });
    };
  }

  render() {
    const { question, correct_answer, incorrect_answers } = this.props;
    const { answered, isRight } = this.state;
    return (
      <div className="newQuestion">
        {question}
        {incorrect_answers && incorrect_answers
          .concat(correct_answer)
          .map(answer => (<div onClick={this.answerClicked(answer)}>{answer} </div>))} <br />
        {answered && `You answered ${answered}`} <br />
        <div className="correctAnswer"> {" "}{answered && isRight && "This is correct!"} {" "} </div>
        <div className="incorrectAnswer"> {" "}{answered && !isRight && "This is incorrect. please try again"} {" "}</div>
      </div>
    )
  }
}

class TheCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: 0,
      Counter: 0,
      unanswered: 0
    };

  }
  questionAnswered = isRight => {
    this.setState(({ Counter, right }) => ({ Counter: Counter + 1, right: right + isRight }));
  }

  render() {
    const { results } = this.props;
    const { Counter } = this.state;
    const unanswered = this.props.results && Counter;
    if (unanswered >= 10) {
      return `You got ${this.state.right} right out of ${this.state.Counter}`;
    }
    const question = results[Counter];
    return (
      <div className="newQuestion">
        <MythologyAnswers {...question} hasAnswered={this.questionAnswered} />
      </div>
    )
  }
}
export default App;
