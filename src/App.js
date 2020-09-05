import React from 'react';
import './App.css';


function BoardSquare(props) {
    return (
      <button className={props.value === 0 ? "square zero" : "square"} onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      gameBoardDemension: 9,
      fieldSideDemension: 3,
      gameBoardArray: [],
      gameWin: false,
    }
  }

  handleClick(square) {
    if(this.state.gameWin || square === 0) {
      return
    }
    var gameArray = this.state.gameBoardArray.flat();
    var checkArray = gameArray.flat().sort().filter(x => x > 0);
    checkArray.push(0);
    var zeroIndex = gameArray.indexOf(0)
    var eIndex = gameArray.indexOf(square)

    if(Math.abs(eIndex - zeroIndex) === 1 || Math.abs(eIndex - zeroIndex) === this.state.fieldSideDemension) {
      
      gameArray[zeroIndex] = square;
      gameArray[eIndex] = 0;

      const dividedArray = [];
      for (let i = 0; i < gameArray.length; i += this.state.fieldSideDemension) {
        let chunk = gameArray.slice(i, i + this.state.fieldSideDemension);
        dividedArray.push(chunk)
      }

      this.setState({gameBoardArray: dividedArray})
      if(gameArray.flat().toString() === checkArray.toString()) {
        this.setState({gameWin: true});
      }
    }
  }

  componentDidMount() {
    this.initGameBoard(this.state.gameBoardDemension);
  }

  initGameBoard(gameBoardDemension) {
    this.setState({gameWin: false});
    const fieldSideDemension = Math.sqrt(gameBoardDemension);
    this.setState({fieldSideDemension: fieldSideDemension})
    var boardArray = [];
    //create array
    for(let i = 0; i < gameBoardDemension; i++) {
      boardArray.push(i)
    }
    //shuffle array
    for (let i = boardArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [boardArray[i], boardArray[j]] = [boardArray[j], boardArray[i]];
    }
    //divide array
    const dividedArray = [];
    for (let i = 0; i < boardArray.length; i += fieldSideDemension) {
      let chunk = boardArray.slice(i, i + fieldSideDemension);
      dividedArray.push(chunk)
    }
    this.setState({gameBoardArray: dividedArray})
  }

  renderSquare(row, square) {
    return (
      <BoardSquare
        key={square}
        value={square}
        onClick={() => this.handleClick(square)}
      />
    );
  }

  render() {    
    const {gameBoardArray, gameWin} = this.state;

    return (
      <div>
        <div>
          New game: 
          <button className="new-game" onClick={() => this.initGameBoard(9)}>3x3</button>
          <button className="new-game" onClick={() => this.initGameBoard(16)}>4x4</button>
          <button className="new-game" onClick={() => this.initGameBoard(25)}>5x5</button>
        </div>
        <div className="game">
          <div className="game-board">
            {gameBoardArray.map(row => (
                <div className="board-row" key={row}>
                  {row.map(square => (
                    this.renderSquare(row, square)
                  ))}
                </div>
                )
            )}
          </div>
        </div>
        {gameWin && 
          <div className="game-status">You win! Congratulations!</div>
        }
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Board />
    );
  }
}

export default App;
