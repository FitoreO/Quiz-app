import React, { Component } from 'react';

const API =
    "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium";

class rightAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correct_answer: "",
            results: []
        }

    }
    render() {
        <h5>{results.correct_answer}</h5>
        return (
            { results }
        )
    }
}

export default rightAnswer;