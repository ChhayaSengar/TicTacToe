import React, { useState, useEffect } from 'react';


function TicTacToe() {
  // Initialize player scores from local storage or default to 0
  const [blueScore, setBlueScore] = useState(parseInt(localStorage.getItem('blueScore')) || 0);
  const [redScore, setRedScore] = useState(parseInt(localStorage.getItem('redScore')) || 0);

  // Initialize the game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState('blue');
  const [winner, setWinner] = useState(null);

  // Handle click on a cell
  const handleCellClick = (index) => {
    if (board[index] || winner) return; // Ignore if cell is already clicked or game is won

    const newBoard = [...board];
    newBoard[index] = nextPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      // Update the scores and save to local storage
      if (newWinner === 'blue') {
        setBlueScore(blueScore + 1);
        localStorage.setItem('blueScore', blueScore + 1);
      } else {
        setRedScore(redScore + 1);
        localStorage.setItem('redScore', redScore + 1);
      }
      setWinner(newWinner);
    } else {
      setNextPlayer(nextPlayer === 'blue' ? 'red' : 'blue');
    }
  };

  // Calculate the winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setNextPlayer('blue');
    setWinner(null);
  };

  useEffect(() => {
    // Reset the game when the winner is determined
    if (winner) {
      setTimeout(() => resetGame(), 2000);
    }
  }, [winner]);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="scores">
        <div className="score blue">Blue: {blueScore}</div>
        <div className="score red">Red: {redScore}</div>
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <div className="winner">Winner: {winner}</div>}
    </div>
  );
}

export default TicTacToe;

