import { useState, useEffect } from 'react'

const CoupleQuiz = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const questions = [
    {
      question: "What's my favorite color?",
      options: ["Red", "Blue", "Pink", "Green"],
      correct: 2
    },
    {
      question: "What's my favorite food?",
      options: ["Pizza", "Pasta", "Sushi", "Burger"],
      correct: 0
    },
    {
      question: "What's my dream destination?",
      options: ["Paris", "Tokyo", "New York", "Maldives"],
      correct: 3
    },
    {
      question: "What's my favorite movie genre?",
      options: ["Action", "Romance", "Comedy", "Horror"],
      correct: 1
    },
    {
      question: "What time do I usually wake up?",
      options: ["6 AM", "7 AM", "8 AM", "9 AM"],
      correct: 1
    },
    {
      question: "What's my favorite season?",
      options: ["Spring", "Summer", "Autumn", "Winter"],
      correct: 0
    },
    {
      question: "What's my love language?",
      options: ["Words", "Touch", "Gifts", "Time"],
      correct: 3
    },
    {
      question: "What's my favorite hobby?",
      options: ["Reading", "Cooking", "Dancing", "Gaming"],
      correct: 0
    }
  ]

  useEffect(() => {
    const saved = localStorage.getItem('quizHighScore')
    if (saved) setHighScore(parseInt(saved))
  }, [])

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const finalScore = selectedIndex === questions[currentQuestion].correct ? score + 1 : score
      if (finalScore > highScore) {
        setHighScore(finalScore)
        localStorage.setItem('quizHighScore', finalScore.toString())
      }
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
  }

  const percentage = showResult ? Math.round((score / questions.length) * 100) : 0

  return (
    <div className="couple-quiz">
      <button className="quiz-toggle" onClick={() => setShowPanel(!showPanel)}>
        🎮 Quiz Game
      </button>

      {showPanel && (
        <div className="quiz-panel">
          <h3>How Well Do You Know Me? 💕</h3>

          <div className="quiz-stats">
            <div className="stat">
              <span className="stat-label">High Score</span>
              <span className="stat-number">{highScore}/{questions.length}</span>
            </div>
          </div>

          {!showResult ? (
            <div className="quiz-game">
              <div className="question-progress">
                Question {currentQuestion + 1} of {questions.length}
              </div>

              <div className="question-card">
                <h4 className="question-text">{questions[currentQuestion].question}</h4>
                
                <div className="options-grid">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className="option-btn"
                      onClick={() => handleAnswer(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="quiz-result">
              <div className="result-emoji">
                {percentage >= 80 ? '🏆' : percentage >= 60 ? '😊' : percentage >= 40 ? '😅' : '😢'}
              </div>
              <div className="result-score">{score}/{questions.length}</div>
              <div className="result-percentage">{percentage}%</div>
              <div className="result-message">
                {percentage >= 80 && "Amazing! You know me so well! 💕"}
                {percentage >= 60 && percentage < 80 && "Pretty good! Keep learning! 😊"}
                {percentage >= 40 && percentage < 60 && "Not bad! We should talk more! 💬"}
                {percentage < 40 && "Let's spend more time together! ❤️"}
              </div>
              <button className="restart-btn" onClick={restartQuiz}>
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CoupleQuiz
