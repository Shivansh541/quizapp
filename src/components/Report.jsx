import React from 'react'
import './styles/Report.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { decode } from 'he'
const Report = () => {
    const location = useLocation()
    const { attempted, questions } = location.state || {};
    // Optional check
const navigate = useNavigate();

if (!attempted || Object.keys(attempted).length === 0 || !questions || questions.length === 0) {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>You have not attempted any questions.</h2>
      <p>Please start the quiz and attempt at least one question to see the report.</p>
      <button 
        className='home-btn'
        onClick={() => {navigate('/');localStorage.removeItem('quizEmail')}} 
      >
        Go to Home Page
      </button>
    </div>
  );
}
    const total = questions.length
    const correctCount = questions.reduce((acc, q, i) => {
        const selected = attempted[i];
        if (selected === q.correct_answer) return acc + 1;
        return acc;
    }, 0);
    return (
        <section className='report'>
            <div className="report-left">
                <h2>Quiz Report</h2>
                <p>Total Questions: <span>{questions.length}</span></p>
                <p>Questions Attempted: <span>{Object.keys(attempted).length}</span></p>
                <p>Correct Answers: <span>{correctCount}</span></p>
                <div>
                    <p className='score'>{correctCount*4}/{total*4}<span>Score</span></p>
                    <p className='score'>{((correctCount / total) * 100).toFixed(2)}%<span>Percentage</span></p>
                </div>
                      <button 
        className='home-btn'
        onClick={() => {navigate('/');localStorage.removeItem('quizEmail')}} 
      >
        Go to Home Page
      </button>
            </div>
            <div className="report-right">
                <h2>Answer Review</h2>
                {questions.map((q, i) => (
                    <div className={`question-box ${attempted.hasOwnProperty(i)?attempted[i] === q.correct_answer ? "correct" : "wrong":""}`} key={i}>
                        <p className="question">
                            <strong>Q{i + 1}.</strong> {decode(q.question)}
                        </p>
                        <div className="options">
                            {q.options.map((option, index) => {
                                const userAnswer = attempted[i];
                                const correctAnswer = q.correct_answer;

                                // Determine class based on user selection
                                let className = "option";
                                if (userAnswer === option && option === correctAnswer) {
                                    className += " correct"; // selected & correct
                                } else if (userAnswer === option && option !== correctAnswer) {
                                    className += " wrong"; // selected & wrong
                                } else if (option === correctAnswer) {
                                    className += " correct"; // correct but not selected
                                }

                                return (
                                    <button className={className} key={index}>
                                        <strong>{String.fromCharCode(65 + index)}. {decode(option)}</strong>
                                    </button>
                                );
                            })}
                        </div>
                        {attempted.hasOwnProperty(i) ? (
                            attempted[i] === q.correct_answer ? (
                                <p className="feedback">{'\u2705'} Correct Answer</p>
                            ) : (
                                <p className="feedback">
                                    {'\u274C'} Wrong Answer. The correct answer is <strong>{decode(q.correct_answer)}</strong>.
                                </p>
                            )
                        ) : (
                            <p className="feedback">
                                {'\u26A0'} Not Attempted. The correct answer is <strong>{decode(q.correct_answer)}</strong>.
                            </p>
                        )}

                    </div>
                ))}
            </div>
        </section>
    )
}

export default Report
