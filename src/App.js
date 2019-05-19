import React, { Component } from "react";
import "./App.css";

const API =
  "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "",
      results: [],
      score: 0
    };
  }



  handleClick = event => {
    this.setState({
      score: this.state.score + 1,
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
          <h5 className="correctAnswer">{result.correct_answer}</h5>
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
        <TheCounter question={this.state.question}
          score={this.state.score}
          right={this.state.right}
        />
      </div>
    );
  }
}


class MythologyAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: undefined, isRight: undefined
    };
  }
  answerClicked(answer) {
    const { hasAnswered, correct_answer } = this.props;
    return event => {
      if (this.state.answered) return;
      const isRight = correct_answer === correct_answer;
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


class TheCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      right: 0,
      score: 0,
    };

  }
  questionAnswered(isRight) {
    this.setState(({ score, right }) => ({ score: score + 1, right: right + isRight }));
  }

  render() {
    const { question } = this.props;
    const { score, right } = this.state;
    const unanswered = this.props.question - score;
    if (unanswered <= 0) {
      return 'They are all answered';
    }

    return (
      <div>
        You have {unanswered} questions left, {right} are already correct!
      {question.map(i => <MythologyAnswers key={i.question} {...i}
          hasAnswered={it => this.questionAnswered(it)} />)}
        <div>Score: {this.state.score}</div>
      </div>
    )
  }
}
export default App;
