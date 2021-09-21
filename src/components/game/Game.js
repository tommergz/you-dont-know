import React, { useEffect, useState } from 'react';
import './Game.css'
// Components
import Card from '../card/Card';
import allQuestions from '../allQuestions';

const App = () => {

  useEffect(() => {
    console.log(allQuestions);
    setQuestions(allQuestions)
  }, [])

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTheGame = async () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].rightAnswer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].rightAnswer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;
    setNumber(nextQ);
  };
  return (
    <>
      <h1>YOU DON'T KNOW</h1>
      {gameOver ? (
        <button className='start' onClick={startTheGame}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className='score text-wrapper'>Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <Card
          questionNumber={number + 1}
          totalQuestions={questions.length}
          question={questions[number].question}
          answers={questions[number].answers}
          rightAnswer={questions[number].rightAnswer}
          userAnswer={userAnswers[number]}
          checkAnswer={checkAnswer}
        />
      )}
      {
        !loading && !gameOver ? 
          userAnswers.length === number + 1 &&
        (
          <>
            <p className="info text-wrapper">
              {questions[number].info}
            </p>
            {
              number !== questions.length - 1 &&
                <button className='next' onClick={nextQuestion}>
                  Next Question
                </button>
              }
            {
              !gameOver && number === questions.length - 1 ? 
              <button 
                className='next'
                onClick={() => setGameOver(true)}
              >
                Finish
              </button> : null
            }
          </>
        ) : null
      }
    </>
  );
};

export default App;
