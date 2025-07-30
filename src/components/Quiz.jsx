import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import data from '../data.json'
import './styles/Quiz.css'
import { decode } from 'he'
const Quiz = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visited, setVisited] = useState(new Set([0]));
  const [attempted, setAttempted] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState({})
  const [email, setEmail] = useState('')
  const attemptedRef = useRef(attempted);
const questionsRef = useRef(questions);
useEffect(() => {
  attemptedRef.current = attempted;
}, [attempted]);

useEffect(() => {
  questionsRef.current = questions;
}, [questions]);

useEffect(() => {
  if (!loading) {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            navigate('/report', {
              state: {
                attempted: attemptedRef.current,
                questions: questionsRef.current
              }
            });
          }, 0);
          localStorage.removeItem('quizEmail')
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }
}, [loading, navigate]);

  // useEffect(() => {
  //   const formatted = data.map((q) => {
  //     const options = shuffle([...q.incorrect_answers, q.correct_answer])
  //     return {
  //       ...q,
  //       options,
  //     }
  //   })
  //   setQuestions(formatted)
  //   setLoading(false)
  // }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  // Shuffle options
  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
useEffect(() => {
  const savedEmail = localStorage.getItem('quizEmail');

  if (!savedEmail) {
    navigate('/');
  } else {
    setEmail(savedEmail);
  }
}, [navigate]);
  useEffect(() => {
    const navigationFlag = sessionStorage.getItem('quiz_started');

    if (!navigationFlag) {
      sessionStorage.setItem('quiz_started', 'true');
    } else {
      // delay navigation until after render
      setTimeout(() => {
        navigate('/');
        localStorage.removeItem('quizEmail')
      }, 0);
    }

    return () => {
      sessionStorage.removeItem('quiz_started');
    };
  }, [navigate]);


  // Fetch questions
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=15')
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map((q) => {
          const options = shuffle([...q.incorrect_answers, q.correct_answer]);
          return {
            ...q,
            options,
          };
        });

        setQuestions(formatted);
        setLoading(false);
      })
  }, []);
  const handleNext = () => {
    const nextQ = currentQ + 1 < questions.length ? currentQ + 1 : 0;
    setSelected({});
    setCurrentQ(nextQ);
    setVisited(prev => new Set(prev).add(nextQ));
  };

  const handlePrev = () => {
    const prevQ = currentQ - 1 >= 0 ? currentQ - 1 : questions.length - 1;
    setSelected({});
    setCurrentQ(prevQ);
    setVisited(prev => new Set(prev).add(prevQ));
  };

  const handleSubmit = () => {
    if (selected[currentQ]) {
      setAttempted(prev => ({ ...prev, [currentQ]: selected[currentQ] }));
      setSelected({});
      console.log(attempted)
    }
  };
  const handleFinish = () => {
    navigate('/report', {
      state: {
        attempted,
        questions
      }
    });
    localStorage.removeItem('quizEmail')
  }
  if (loading) return <div>Loading...</div>;

  return (
    <section className="quiz">
      <div className='quiz-top'>
        <div>
          Questions Attempted: {Object.keys(attempted).length}/{questions.length}
        </div>
        <div>
          Time Left: {formatTime(timeLeft)}
        </div>
        <button onClick={handleFinish}>Finish Quiz</button>
      </div>
      <div className="quiz-box">

        <div className="quiz-left">
          <h3>Email: {email}</h3>
          <div className="warning">
            <ol>
              <li>Please attempt <strong>all 15 questions</strong> before submitting.</li>
              <li><strong>Do not reload</strong> or close the tab during the quiz.</li>
              <li>Reloading the page will redirect you to the home page and your progress will be <strong>lost</strong>.</li>
            </ol>
          </div>

          <div className="legend">
            <div className="notvisited mark">
              <span></span>
              Not Visited
            </div>
            <div className="visited mark">
              <span></span>
              Visited
            </div>
            <div className="attempted mark">
              <span></span>
              Attempted
            </div>
          </div>
          <div className="question-numbers">
            {Array.from({ length: 15 }, (_, i) => {
              const isAttempted = attempted.hasOwnProperty(i);
              const isVisited = visited.has(i);
              const className = isAttempted
                ? "number attempted"
                : isVisited
                  ? "number visited"
                  : "";

              return (
                <span
                  onClick={() => {
                    setCurrentQ(i);
                    setVisited(prev => new Set(prev).add(i));
                  }
                  }
                  key={i}
                  className={`number ${currentQ === i ? "active" : className}`}
                >
                  {i + 1}
                </span>
              )
            })}
          </div>
        </div>
        <div className="quiz-right">
          <div>
            <p className='question'><strong>Q{currentQ + 1}</strong>: {decode(questions[currentQ].question)}</p>
            <div className="options">
              {questions[currentQ].options.map((option, index) => (
                <button
                  onClick={() => { setSelected({ [currentQ]: option }) }}
                  key={index}
                  className={`option ${attempted[currentQ] === option ? "attempted" : ""} ${selected[currentQ] === option ? 'selected' : ""}`}
                ><strong>{String.fromCharCode(65 + index)}.</strong> {decode(option)}
                </button>
              ))}
            </div>
          </div>
          <div className="buttons">
            <button onClick={handlePrev}>&lt; Prev</button>
            <button onClick={handleNext}>Next &gt;</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Quiz;
