import React from "react";
import "./App.css";
import SudokuBoard from "./components/sudokuBoard";
const sudoku = require("sudoku");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      congrats: false,
      sudokuSolvedArray: "",
      sudokuPuzzleArray: "",
      sudokuDoneArray: "",
      value: "",
      numbers: new Array(81).fill({
        thNum: "",
        timesInserted: 0,
        insertedNum: "",
        hide: false,
        style: { color: "black", backgroundColor: "transparent" },
      }),
    };
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleColorBackgroundChange = this.handleColorBackgroundChange.bind(
      this
    );
  }
  //when input is gotten from the user, we change the color, the inserted number, the times the number inserted, and the score.
  async handleColorChange(color, num, id) {
    await this.setState({
      sudokuDoneArray: this.state.sudokuDoneArray.map((x, i) =>
        id === i ? num : x
      ),
      numbers: this.state.numbers.map((x, i) =>
        i === id
          ? {
              thNum: x.thNum,
              timesInserted: x.timesInserted + 1,
              insertedNum: num,
              hide: x.hide,
              style: {
                color: color,
                backgroundColor: x.style.backgroundColor,
              },
            }
          : x
      ),
    });
    // Here we update the score if needed.
    if (this.state.numbers[id].timesInserted === 1) {
      if (this.state.numbers[id].thNum === this.state.numbers[id].insertedNum)
        this.setState({ score: this.state.score + 50 });
    }
    //here we congratulate the player if he finished all.
    if (
      JSON.stringify(this.state.sudokuSolvedArray) ==
      JSON.stringify(this.state.sudokuDoneArray)
    ) {
      await this.setState({
        congrats: true,
      });
      await this.setState({
        numbers: this.state.numbers.map((x, i) =>
          true
            ? {
                thNum: x.thNum,
                timesInserted: 0,
                insertedNum: x.insertedNum,
                hide: false,
                style: {
                  color: x.style.color,
                  animationName: "congrats",
                  animationDuration: "1s",
                  animationDelay: i / 30 + "s",
                  animationFillMode: "forwards",
                },
              }
            : x
        ),
      });
    }
  }
  handleColorBackgroundChange(color, id) {
    this.setState({
      numbers: this.state.numbers.map((x, i) =>
        i === id || i % 9 === id % 9 || Math.floor(i / 9) === Math.floor(id / 9)
          ? {
              thNum: x.thNum,
              timesInserted: x.timesInserted,
              insertedNum: x.insertedNum,
              hide: x.hide,
              style: {
                color: x.style.color,
                backgroundColor: color,
              },
            }
          : x
      ),
    });
  }

  sudokuArrayPuzzle(hardnessLevel, solvedArray) {
    let puzzleArray = solvedArray;
    let arr = new Array(81).fill(-1);
    while (arr.filter((x) => x !== -1).length < hardnessLevel) {
      let r = Math.floor(Math.random() * 81);
      if (arr[r] === -1) arr[r] = -2;
    }
    return puzzleArray.map((x, i) => (arr[i] === -1 ? x + 1 : 0));
  }

  async handleRandomizePuzzle(hardnessLevel) {
    let arr = sudoku.solvepuzzle(sudoku.makepuzzle());
    await this.setState({
      sudokuSolvedArray: arr.map((x) => x + 1),
      sudokuPuzzleArray: this.sudokuArrayPuzzle(hardnessLevel, arr),
    });
    await this.setState({
      score: 0,
      congrats: false,
      sudokuDoneArray: this.state.sudokuPuzzleArray,
      numbers: this.state.numbers.map((x, i) => ({
        thNum: this.state.sudokuSolvedArray[i],
        timesInserted: 0,
        insertedNum: "",
        hide: this.state.sudokuPuzzleArray[i] === 0,
        style: {
          color: "black",
          backgroundColor: x.style.backgroundColor,
        },
      })),
    });
  }

  render() {
    return (
      <div className="App">
        <div className="table-container">
          <table className="sudoku-table">
            <SudokuBoard
              numbers={this.state.numbers}
              handleColorChange={this.handleColorChange}
              handleColorBackgroundChange={this.handleColorBackgroundChange}
              handleInsertNum={this.handleInsertNum}
              sudokuSolvedArray={this.state.sudokuSolvedArray}
              congrats={this.state.congrats}
            />
          </table>
        </div>
        <div className="buttons-score-container">
          <div className="btn-group">
            <button onClick={() => this.handleRandomizePuzzle(20)}>Easy</button>
            <button onClick={() => this.handleRandomizePuzzle(40)}>
              Medium
            </button>
            <button onClick={() => this.handleRandomizePuzzle(60)}>Hard</button>
          </div>
        </div>
        <div className="buttons-score-container">
          <h1>
            {this.state.congrats
              ? "Congratulations! You scored " + this.state.score + "!"
              : "Score: " + this.state.score}
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
