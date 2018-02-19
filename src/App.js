import React, { Component } from "react";
import "./App.css";
import Button from "./Component/Button/Button";
import Output from "./Component/Output/Output";
import safeEval from "safe-eval";

class App extends Component {
  state = {
    query: "",
    numParens: 0
  };

  onChangeHandler = event => {
    this.setState({ query: event.target.value });
  };

  onClickHandler = event => {
    const button = event.target.value;
    const { query, numParens } = this.state;

    let stateObj = {};
    const lastChar = query.slice(-1);
    const lastLastChar = query.slice(-2, -1);
    console.log(lastLastChar, lastChar);

    const isLastCharOperation = () => {
      return ["+", "-", "*", "/"].includes(lastChar);
    };

    const isLastCharNumber = () => {
      return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        lastChar
      );
    };

    const replaceOperation = () => {
      return query.slice(0, -1) + button;
    };

    switch (button) {
      case "+":
        if (isLastCharOperation()) {
          stateObj = {
            query: replaceOperation()
          };
        } else {
          stateObj = {
            query: query + "+"
          };
        }
        break;
      case "-":
        if (isLastCharOperation()) {
          stateObj = {
            query: replaceOperation()
          };
        } else {
          stateObj = {
            query: query + "-"
          };
        }
        break;
      case "*":
        if (
          lastChar === "(" ||
          (isLastCharOperation() && lastLastChar === "(") ||
          query === ""
        ) {
          stateObj = {
            query: query
          };
        } else if (isLastCharOperation()) {
          stateObj = {
            query: replaceOperation()
          };
        } else {
          stateObj = {
            query: query + "*"
          };
        }
        break;
      case "/":
        if (
          lastChar === "(" ||
          (isLastCharOperation() && lastLastChar === "(") ||
          query === ""
        ) {
          stateObj = {
            query: query
          };
        } else if (isLastCharOperation()) {
          stateObj = {
            query: replaceOperation()
          };
        } else {
          stateObj = {
            query: query + "/"
          };
        }
        break;
      case "(":
        if (isLastCharNumber() || lastChar === ")") {
          stateObj = {
            query: query + "*(",
            numParens: numParens + 1
          };
        } else {
          stateObj = {
            query: query + "(",
            numParens: numParens + 1
          };
        }
        break;
      case ")":
        if (isLastCharOperation()) {
          stateObj = {
            query: replaceOperation(),
            numParens: numParens - 1
          };
        } else if (lastChar === "(") {
          stateObj = {
            query: query
          };
        } else if (numParens > 0) {
          stateObj = {
            query: query + ")",
            numParens: numParens - 1
          };
        }
        break;
      case "=":
        if (
          numParens === 0 &&
          isLastCharOperation() === false &&
          query.length > 0
        ) {
          try {
            stateObj = {
              query: safeEval(query).toString()
            };
          } catch (error) {
            stateObj = {
              query: "Error!"
            };
          }
        }
        break;
      case "AC":
        stateObj = {
          query: "",
          numParens: 0
        };
        break;
      default:
        if (lastChar === ")") {
          stateObj = {
            query: query + "*" + button
          };
        } else {
          stateObj = {
            query: query + button
          };
        }
    }

    // switch (button) {
    //   case "+":
    //     stateObj = {
    //       query: operation ? query.slice(0, -3) + " + " : query + " + ",
    //       numberEntered: false,
    //       operation: true
    //     };
    //     break;

    //   case "-":
    //     stateObj = {
    //       query: operation ? query.slice(0, -3) + " - " : query + " - ",
    //       numberEntered: false,
    //       operation: true
    //     };
    //     break;

    //   case "*":
    //     if ((!openParen && numberEntered) || (!numberEntered && openParen)) {
    //       stateObj = {
    //         query: operation ? query.slice(0, -3) + " * " : query + " * ",
    //         numberEntered: false,
    //         operation: true
    //       };
    //     }
    //     break;

    //   case "/":
    //     if (!openParen || numberEntered || (!numberEntered && openParen)) {
    //       stateObj = {
    //         query: operation ? query.slice(0, -3) + " / " : query + " / ",
    //         numberEntered: false,
    //         operation: true
    //       };
    //     }
    //     break;

    //   case "+/-":
    //     this.setState({
    //       query: `-1 * (${query})`,
    //       numberEntered: false
    //     });
    //     break;

    //   case "(":
    //     stateObj = {
    //       query: numberEntered ? `${query} * (` : query + "(",
    //       numberEntered: false,
    //       openParen: true,
    //       closeParen: false,
    //       numParens: numParens + 1
    //     };
    //     break;

    //   case ")":
    //     if (numberEntered && numParens >= 1) {
    //       stateObj = {
    //         query: query + ")",
    //         closeParen: true,
    //         numParens: numParens - 1
    //       };
    //     } else {
    //       stateObj = {
    //         query: query
    //       };
    //     }
    //     break;

    //   case "AC":
    //     stateObj = {
    //       query: "",
    //       openParen: false,
    //       numberEntered: false,
    //       closeParen: false,
    //       operation: false,
    //       numParens: 0
    //     };
    //     break;

    //   case "=":
    //     try {
    //       stateObj = {
    //         query: safeEval(query),
    //         numberEntered: true,
    //         openParen: false,
    //         closeParen: false,
    //         operation: false,
    //         numParens: 0
    //       };
    //     } catch (error) {
    //       stateObj = {
    //         query: "ERROR!"
    //       };
    //     }
    //     break;
    //   //for a number
    //   default:
    //     if ((closeParen && !operation) || (closeParen && numberEntered)) {
    //       stateObj = {
    //         query: `${query} * ${event.target.value}`,
    //         numberEntered: true,
    //         closeParen: false,
    //         openParen: false
    //       };
    //     } else {
    //       stateObj = {
    //         query: query + event.target.value,
    //         numberEntered: true,
    //         operation: false,
    //         openParen: false
    //       };
    //     }
    // }

    this.setState(stateObj);
  };

  render() {
    return (
      <div className="App">
        <Output changed={this.onChangeHandler} query={this.state.query} />

        <Button label="AC" clicked={this.onClickHandler} />
        <Button label="(" clicked={this.onClickHandler} />
        <Button label=")" clicked={this.onClickHandler} />
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
