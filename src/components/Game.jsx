import { useState, useEffect, useCallback } from 'react'

const Game = () => {
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // Get computer's random choice
  const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors']
    const randomIndex = Math.floor(Math.random() * choices.length)
    return choices[randomIndex]
  }

  // Get game result based on user and computer choices
  const getResult = (user, computer) => {
    if (user === computer) {
      return 'draw'
    }

    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'user'
    }

    return 'computer'
  }

  // Play game when user makes a choice
  const playGame = (choice) => {
    if (isDisabled) return

    const user = choice
    const computer = getComputerChoice()

    setUserChoice(user)
    setComputerChoice(computer)
    setIsDisabled(true)
    setShowResult(true)

    const gameResult = getResult(user, computer)

    if (gameResult === 'user') {
      setUserScore((prev) => prev + 1)
      setResult('user')
    } else if (gameResult === 'computer') {
      setComputerScore((prev) => prev + 1)
      setResult('computer')
    } else {
      setResult('draw')
    }
  }

  // Reset game
  const resetGame = useCallback(() => {
    setUserChoice(null)
    setComputerChoice(null)
    setResult(null)
    setIsDisabled(false)
    setShowResult(false)
  }, [])

  // Reset scores
  const resetScores = () => {
    setUserScore(0)
    setComputerScore(0)
    resetGame()
  }

  // Auto reset after showing result
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        resetGame()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showResult, resetGame])

  // Get emoji for choice
  const getEmoji = (choice) => {
    const emojis = {
      rock: '🪨',
      paper: '📄',
      scissors: '✂️',
    }
    return emojis[choice] || ''
  }

  return (
    <div className="game-container">
      <h1 className="game-title">Rock Paper Scissors</h1>

      {/* Score Display */}
      <div className="score-container">
        <div className="score-box">
          <h2>Your Score</h2>
          <p className="score-value">{userScore}</p>
        </div>
        <div className="score-box">
          <h2>Computer Score</h2>
          <p className="score-value">{computerScore}</p>
        </div>
      </div>

      {/* Game Choices */}
      <div className="choices-container">
        <button
          className={`choice-btn ${isDisabled ? 'disabled' : ''} ${
            userChoice === 'rock' ? 'selected' : ''
          }`}
          onClick={() => playGame('rock')}
          disabled={isDisabled}
        >
          <span className="emoji">🪨</span>
          <span className="choice-text">Rock</span>
        </button>

        <button
          className={`choice-btn ${isDisabled ? 'disabled' : ''} ${
            userChoice === 'paper' ? 'selected' : ''
          }`}
          onClick={() => playGame('paper')}
          disabled={isDisabled}
        >
          <span className="emoji">📄</span>
          <span className="choice-text">Paper</span>
        </button>

        <button
          className={`choice-btn ${isDisabled ? 'disabled' : ''} ${
            userChoice === 'scissors' ? 'selected' : ''
          }`}
          onClick={() => playGame('scissors')}
          disabled={isDisabled}
        >
          <span className="emoji">✂️</span>
          <span className="choice-text">Scissors</span>
        </button>
      </div>

      {/* Result Display */}
      {showResult && (
        <div className={`result-container ${result}`}>
          <div className="choices-display">
            <div className="choice-display">
              <p className="choice-label">Your Choice</p>
              <div className="choice-icon">
                {userChoice && getEmoji(userChoice)}
              </div>
              <p className="choice-name">{userChoice}</p>
            </div>

            <div className="vs">VS</div>

            <div className="choice-display">
              <p className="choice-label">Computer Choice</p>
              <div className="choice-icon">
                {computerChoice && getEmoji(computerChoice)}
              </div>
              <p className="choice-name">{computerChoice}</p>
            </div>
          </div>

          <div className="result-message">
            {result === 'user' && (
              <h2 className="result-text win">🎉 You Win!</h2>
            )}
            {result === 'computer' && (
              <h2 className="result-text lose">😢 Computer Wins!</h2>
            )}
            {result === 'draw' && (
              <h2 className="result-text draw">🤝 It's a Draw!</h2>
            )}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="button-container">
        <button className="reset-btn" onClick={resetGame}>
          Reset Round
        </button>
        <button className="reset-btn secondary" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  )
}

export default Game

