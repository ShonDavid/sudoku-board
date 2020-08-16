import React, { Component } from "react";
import ThSudoku from "./Thsudoku";

class SudokuBoard extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    let sudoku = [];
    let row = [];
    for (let i = 0; i < 81; i++) {
      row.push(
        <ThSudoku
          id={i}
          num={this.props.numbers[i].thNum}
          editable={this.props.numbers[i].hide}
          style={this.props.numbers[i].style}
          handleColorChange={this.props.handleColorChange}
          handleColorBackgroundChange={this.props.handleColorBackgroundChange}
          handleInsertNum={this.props.handleInsertNum}
          congrats={this.props.congrats}
        />
      );
      if ((i + 1) % 9 === 0) {
        sudoku.push(<tr>{row}</tr>);
        row = [];
      }
    }
    return sudoku;
  }
}

export default SudokuBoard;
