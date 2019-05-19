import React, { Component } from "react";
import "./App.css";

const API =
  "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        this.props.correct_answer,
        this.props.incorrect_answers
      ],
      results: [],
      isShowing: false
    };
  }



  handleClick = event => {
    this.setState({
      isShowing: true,
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
        {this.state.isShowing && (
          <Counter
            className="modal"
            show={this.state.isShowing}
            question={this.state.question}
            correct_answer={this.state.correct_answer}
          />
        )}
        <Counter questions={this.state.question}
        // [{question, correct_answer, incorrect_answers }, /*...*/]} 
        />
      </div>
    );
  }
}


class TheAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correct_answer: "",
      answered: undefined, isRight: undefined
    };
  }
  answerClicked(answer) {
    const { hasAnswered, correct_answer } = this.props;
    return event => {
      if (this.state.answered) return;
      const isRight = correct_answer === answer;
      hasAnswered(isRight);
      this.setState({ answered: answer, isRight });
    }
  }

  render() {
    const { question, correct_answer, incorrect_answers } = this.props;
    const { answered, isRight } = this.state;
    return (
      <div>{question}
        {[...incorrect_answers, correct_answer]
          .map(answer => <div onClick={this.answerClicked(answer)}>{answer} </div>)}
        {answered && `You answered ${answered}`}
        {answered && isRight && "This is correct!"}
        {answered && !isRight && "This is incorrect. please try again"}
      </div>
    )
  }
}


class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: 0,
      counter: 0
    };

  }
  questionAnswered(isRight) {
    this.setState(({ counter, right }) => ({ counter: counter + 1, right: right + isRight }));
  }

  render() {
    const { questions } = this.props;
    const { counter, right } = this.state;
    const unanswered = this.props.questions - counter;
    if (unanswered <= 0) {
      return `All answered`;
    }

    return (
      <div>
        You have {unanswered} questions left, {right} are already correct!
      {questions.map(it => <TheAnswers key={it.question} {...it}
          hasAnswered={it => this.questionAnswered(it)} />)}
        <div>{this.state.counter}</div>
      </div>
    )
  }
}
export default App;
