import React from "react";
import "./App.css";

class Square extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { value: null }
  // }
  render() {
    return (
      <div
        className="square"
        onClick={() => {
          this.props.onClick();
        }}
      >
        {this.props.value}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  handleClick(number) {
    const squares = this.state.squares.slice();
    console.log(squares);

    if (this.calculateWinner(squares) || squares[number]) {
      console.log("called");

      return;
    }
    squares[number] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(number) {
    return (
      <Square
        value={this.state.squares[number]}
        onClick={() => this.handleClick(number)}
      />
    );
  }

  render() {
    let status = (this.state.xIsNext ? "player1" : "player2") + "'s turn";
    const winner = this.calculateWinner(this.state.squares);

    if (winner) {
      let win = winner == "X" ? "player1" : "player2";
      status = win + " has won!!";
    }
    return (
      <div className="game">
        <p className="msg">Welcome to Tic-Tac-Toe!!</p>
        <div className="board">
          <div className="row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>

          <div className="row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>

          <div className="row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <div className="status">{status}</div>
      </div>
    );
  }
}

export default Board;
