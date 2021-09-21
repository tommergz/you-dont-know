import React from 'react';
import './Card.css';

const Card = ({
  question,
  answers,
  checkAnswer,
  userAnswer,
  rightAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <>
    <p className="text-wrapper">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p className="text-wrapper">
      {question}
    </p>
    <div className="card">
      {answers.map((answer) => (
        <div key={answer}>
          <button
            className="card-button"
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={checkAnswer}
            style={{
              background:
                userAnswer ?
                  answer === rightAnswer ?
                    'green' :
                    'red'
                  :
                  ''
            }}
          >
            <span>
              {answer}
            </span>
          </button>
        </div>
      ))}
    </div>
  </>
);

export default Card;
