import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Home.css'
const Home = () => {
  const [email,setEmail] = useState('')
  const navigate = useNavigate()
  const handleStartQuiz = (e)=>{
    e.preventDefault()
    localStorage.setItem('quizEmail', email)
    navigate('/quizapp/quiz')
  }
  return (
    <section className='home'>
      <div className="left-home">
        <h1>Welcome to the Quiz</h1>
        <h3>Read this Before You Begin</h3>
        <ol>
          <li>This quiz contains <strong>15 questions</strong>.</li>
          <li>You’ll get <strong>4 mark</strong> for each correct answer.</li>
          <li><strong>No negative marking</strong> for wrong answers.</li>
          <li>Questions are either <strong>Multiple Choice</strong> or <strong>True/False</strong>.</li>
          <li>You’ll have a total of <strong>30 minutes</strong> to complete the quiz.</li>
          <li>Make sure you have a stable internet connection before starting.</li>
          <li>Your <strong>final score</strong> will be shown after submission.</li>
          <li><strong>Do not reload</strong> the page once the quiz has started, as it may interrupt the session and cause issues loading questions.</li>

        </ol>
      </div>
      <div className="right-home">
        <h2>Enter Your Email to Start</h2>
        <form onSubmit={handleStartQuiz}>
          <input type="email" placeholder='xyz@example.com' value = {email} onChange={(e)=>setEmail(e.target.value)} required/>
          <button type='submit'>Start Quiz</button>
        </form>
      </div>
    </section>
  )
}

export default Home
