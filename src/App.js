import React, { Component } from "react";
import "./App.css";
import Button from "./Component/Button/Button";
import Output from "./Component/Output/Output";
import safeEval from "safe-eval";

class App extends Component {
  state = {
    query: "",
    numberEntered: false,
    openParen: false,
    closeParen: false,
    operation: false,
    numParens: 0
  };

  onChangeHandler = event => {
    this.setState({ query: event.target.value });
  };

  onClickHandler = event => {
    const button = event.target.value;
    const {
      query,
      numberEntered,
      openParen,
      closeParen,
      operation,
      numParens
    } = this.state;

    let stateObj = {};

    switch (button) {
      case "+":
        stateObj = {
          query: operation ? query.slice(0, -3) + " + " : query + " + ",
          numberEntered: false,
          operation: true
        };
        break;

      case "-":
        stateObj = {
          query: operation ? query.slice(0, -3) + " - " : query + " - ",
          numberEntered: false,
          operation: true
        };
        break;

      case "*":
        if (!openParen || numberEntered || (!numberEntered && openParen)) {
          stateObj = {
            query: operation ? query.slice(0, -3) + " * " : query + " * ",
            numberEntered: false,
            operation: true
          };
        }
        break;

      case "/":
        if (!openParen || numberEntered || (!numberEntered && openParen)) {
          stateObj = {
            query: operation ? query.slice(0, -3) + " / " : query + " / ",
            numberEntered: false,
            operation: true
          };
        }
        break;

      case "+/-":
        this.setState({
          query: `-1 * (${query})`,
          numberEntered: false
        });
        break;

      case "(":
        stateObj = {
          query: numberEntered ? `${query} * (` : query + "(",
          numberEntered: false,
          openParen: true,
          closeParen: false,
          numParens: numParens + 1
        };
        break;

      case ")":
        if (numberEntered && numParens >= 1) {
          stateObj = {
            query: query + ")",
            closeParen: true,
            numParens: numParens - 1
          };
        } else {
          stateObj = {
            query: query
          };
        }
        break;

      case "AC":
        stateObj = {
          query: "",
          openParen: false,
          numberEntered: false,
          closeParen: false,
          operation: false,
          numParens: 0
        };
        break;

      case "=":
        try {
          stateObj = {
            query: safeEval(query),
            numberEntered: true,
            openParen: false,
            closeParen: false,
            operation: false,
            numParens: 0
          };
        } catch (error) {
          stateObj = {
            query: "ERROR!"
          };
        }
        break;
      //for a number
      default:
        if ((closeParen && !operation) || (closeParen && numberEntered)) {
          stateObj = {
            query: `${query} * ${event.target.value}`,
            numberEntered: true,
            closeParen: false,
            openParen: false
          };
        } else {
          stateObj = {
            query: query + event.target.value,
            numberEntered: true,
            operation: false,
            openParen: false
          };
        }
    }

    this.setState(stateObj);
  };

  render() {
    return (
      <div className="App">
        <Output changed={this.onChangeHandler} query={this.state.query} />

        <Button label="AC" clicked={this.onClickHandler} />
        <Button label={"("} clicked={this.onClickHandler} />
        <Button label={")"} clicked={this.onClickHandler} />
        <Button label="/" clicked={this.onClickHandler} />

        <Button label="7" clicked={this.onClickHandler} />
        <Button label="8" clicked={this.onClickHandler} />
        <Button label="9" clicked={this.onClickHandler} />
        <Button label="*" clicked={this.onClickHandler} />

        <Button label="4" clicked={this.onClickHandler} />
        <Button label="5" clicked={this.onClickHandler} />
        <Button label="6" clicked={this.onClickHandler} />
        <Button label="-" clicked={this.onClickHandler} />

        <Button label="1" clicked={this.onClickHandler} />
        <Button label="2" clicked={this.onClickHandler} />
        <Button label="3" clicked={this.onClickHandler} />
        <Button label="+" clicked={this.onClickHandler} />

        <Button label="0" clicked={this.onClickHandler} />
        <Button label="00" clicked={this.onClickHandler} />
        <Button label="." clicked={this.onClickHandler} />
        <Button label="=" clicked={this.onClickHandler} />
      </div>
    );
  }
}

export default App;
