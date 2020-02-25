import React, { Component } from 'react'
import './App.css'

// Here I have different kind of states. These states hold different kind of data. 
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      playerDevil: '😈',
      playerAngel: '😇',
      current: '😈',
      board: [],
      gameOver: false,
      msgRed: false,
      msgYellow: false,
      msgDraw: false,
      msgNewGame: '',
      playerTurnMsg: '',
    };
  }
  
  // Function to create game board.
  createTable() {
    let board = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) { 
        row.push(null) 
      }
      board.push(row);
    }
    this.setState({
      board: board,
      current: this.state.playerDevil,
      gameOver: false,
      msgRed: '',
      msgYellow: '',
      msgDraw: '',
    });
  }

  // Function to start a new game if Devil wins.
  onSubmitRed() {
    this.setState({
      current: this.state.playerDevil,
      gameOver: false,
      msgRed: '',
    });  
  }

  // Function to start a new game if Angel wins.
  onSubmitYellow() {
    this.setState({
      current: this.state.playerAngel,
      gameOver: false,
      msgYellow: '',
    });
  }

  // Function to start a new game if it is a draw.
  onSubmitDraw() {
    this.setState({
      current: this.state.playerDevil,
      gameOver: false,
      msgDraw: '',
    });  
  }

  // Function to play again.
  onSubmitReturn() {
    this.createTable();
  }

  // Function to quit the game.
  onSubmitQuit() {
    window.close();
  }

  // Function to change between players.
  changePlayer() {
    if (this.state.current === this.state.playerDevil) {
        this.setState({
          playerTurnMsg: 'It is 😇 turn',
      })
        return this.state.playerAngel;
    }else {
        this.setState({
          playerTurnMsg: 'It is 😈 turn',
      })
        return this.state.playerDevil;
    }
  }
  
  // Function to set pieces on the board, to make impossible to drop discs into a full collumn and to create all possible ways to end the game.  
  gameplay = (j) => {
    if (this.state.gameOver === false) {

      let board = this.state.board;

      let noMoreWords = false;
      
      for (let i = 5; i >= 0; i--) {
        if (!board[i][j]) {
          board[i][j] = this.state.current;
          noMoreWords = true;
          break;
        }
      }

      if (!noMoreWords) {
        return null;
      }

      // All possible ways to end the game.
      let result = this.checkAllWinConitions(board);

      if (result === this.state.playerDevil) {
        this.setState({  
          gameOver: true, 
          msgRed: true,
        });

      }else if (result === this.state.playerAngel) {
        this.setState({ 
          gameOver: true,
          msgYellow: true,
         });
        
      }else if (result === 'draw') {
        this.setState({  
          gameOver: true, 
          msgDraw: true, 
        });

      }else {
        this.setState({ 
          current: this.changePlayer(),
        });
      }
    }else {
      this.setState({ 
        msgNewGame: 'Game over. Please start a new game.' });
    }
  }
  
  // Function to check wining verticaly. Function runs only if row is 3 or more than 3.
  winConditionVertical(board) {
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j] && board[i][j] === board[i - 2][j] && board[i][j] === board[i - 3][j]) {
            return board[i][j];    
          }
        }
      }
    }
  }
  
  // Function to check wining horizontaly. Function runs only if column is 3 och less than 3.
  winConditionHorizontal(board) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2] && board[i][j] === board[i][j + 3]) {
            return board[i][j];
          }
        }
      }
    }
  }
  
  // Function to check wining diagonaly to the right. Function runs only if row is 3 or more and if column is 3 or less.
  winConditionDiagonalRight(board) {
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j + 1] &&  board[i][j] === board[i - 2][j + 2] && board[i][j] === board[i - 3][j + 3]) {
            return board[i][j];
          }
        }
      }
    }
  }
  
  // Function to check wining diagonaly to the left. Function runs only if row and column is 3 or more.
  winConditionDiagonalLeft(board) {
    for (let i = 3; i < 6; i++) {
      for (let j = 3; j < 7; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j - 1] && board[i][j] === board[i - 2][j - 2] && board[i][j] === board[i - 3][j - 3]) {
            return board[i][j];
          }
        }
      }
    }
  }
  
  // Function to check if it is a draw.
  winConditionDraw(board) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j] === null) {
          return null;
        }
      }
    }
    return 'draw';    
  }
  
  // Function to check all win conditions.
  checkAllWinConitions(board) {
    return this.winConditionVertical(board) || this.winConditionDiagonalRight(board) || this.winConditionDiagonalLeft(board) || this.winConditionHorizontal(board) || this.winConditionDraw(board);
  }
  
  componentDidMount() {
    this.onSubmitRed();
    this.onSubmitYellow();
    this.onSubmitDraw();
    this.createTable();
  }
  
  // Here I render all elements for the game. For example messages, buttons, title, circles, cells, rows, players/colors(playerDevil and playerAngel) in the table and much more.
  render() {

    if(this.state.msgRed) {
      return  (
      <div>
        <p className="messageRed">{this.state.msgRed}  Player {this.state.playerDevil} wins!</p>
      <div className='twoButtons'>
        <button className='buttonWinDevil' onClick= { () => {this.onSubmitReturn();}}>Play again</button>
        <button className='buttonWinDevil' onClick= { () => {this.onSubmitQuit();}}>Quit</button>
      </div>
      </div>
      );
    }

    if(this.state.msgYellow) {
      return  (
      <div>
        <p className="messageYellow">{this.state.msgYellow}  Player {this.state.playerAngel} wins!</p>
      <div className='twoButtons'>
        <button className='buttonWinAngel' onClick= { () => {this.onSubmitReturn();}}>Play again</button>
        <button className='buttonWinAngel' onClick= { () => {this.onSubmitQuit();}}>Quit</button>
      </div>
      </div>
      );
    }

    if(this.state.msgDraw) {
      return  (
      <div>
        <p className="messageDraw"> It`s a draw! </p>
      <div className='twoButtons'>
        <button className='buttonWinDraw' onClick= { () => {this.onSubmitReturn();}}>Play again</button>
        <button className='buttonWinDraw' onClick= { () => {this.onSubmitQuit();}}>Quit</button>
      </div>
      </div>
      );
    }

    const Row = ({ row, gameplay }) => {
      return (
        <tr className='circle'>
          {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} gameplay={gameplay} />)}
        </tr>
      );
    };

    const Cell = ({ value, columnIndex, gameplay }) => {
      let color = 'white';
      if (value === '😈') {
        color = 'red';
      } else if (value === '😇') {
        color = 'yellow';
      }
      return (
        <td>
          <div className="cell" onClick={() => {gameplay(columnIndex)}}>
            <div className={color}></div>
          </div>
        </td>
      );
    };

    return (
      <div className='divButton'>
          <header>
            <h1>Connect Four</h1>
            <p className='playerTurn' style={{ color: 'rgb(209, 207, 209)'}}>{this.state.playerTurnMsg}</p>
          </header>
          <table >
            <tbody>
              {this.state.board.map((row, i) => (<Row key={i} row={row} gameplay={this.gameplay} />))}
            </tbody>
          </table>
          <button className="button" onClick={ () => { this.createTable(); this.onSubmitRed(); this.onSubmitYellow(); this.onSubmitDraw();  }} >Reset Game</button>
      </div>
    );
  }
}

export default App