import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  // State for the game board
  const [board, setBoard] = useState(Array(9).fill(null));

  // State for the current player (blue or red)
  const [currentPlayer, setCurrentPlayer] = useState('blue');

  // State for player scores with persistent storage in local storage
  const [scores, setScores] = useState({
    blue: localStorage.getItem('blueScore') || 0,
    red: localStorage.getItem('redScore') || 0,
  });

  // Save scores to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('blueScore', scores.blue);
    localStorage.setItem('redScore', scores.red);
  }, [scores]);

  // Function to handle cell clicks
  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    // Create a copy of the current board
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for a winner
    const winner = calculateWinner(newBoard);
    if (winner) {
      // Update scores and reset the board if there's a winner
      const updatedScores = { ...scores };
      updatedScores[winner] += 1;
      setScores(updatedScores);
      setBoard(Array(9).fill(null));
    } 
    else {
      // Switch players
      setCurrentPlayer(currentPlayer === 'blue' ? 'red' : 'blue');
    }
  };

  // Function to render individual cells
  const renderCell = (index) => (
    <div
      className={`cell ${board[index]}`}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </div>
  );

  // Check for a winner
  const winner = calculateWinner(board);

  // Display game status
  const status = winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`;

  return (
    <div className="tic-tac-toe">
      <div className="scores">
        <div className="blue-score">Blue: {scores.blue}</div>
        <div className="red-score">Red: {scores.red}</div>
      </div>
      <div className="status">{status}</div>
      <div className="board">
        {Array.from({ length: 9 }, (_, index) => renderCell(index))}
      </div>
    </div>
  );
}


// Function to calculate the winner
function calculateWinner(board) {
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

  for (let line of lines) {
    const [a, b, c] = line; 
    // this above line- Destructuring assignment is used to extract the three cell indices 
    // from the current winning combination being checked.
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null; // No winner yet
}

export default TicTacToe;
