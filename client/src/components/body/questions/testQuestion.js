import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Inicio from './cuestionarios/Inicio'
import Quiz from './cuestionarios/Quiz'
import Final from './cuestionarios/Final'
import Modal from './cuestionarios/Modal'
let interval = ''
function TestQuestion() {

    const [currentQuestion, setCurrentQuestion] = useState('')
    const [step, setStep] = useState(1);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [time, setTime] = useState(0);
  
    useEffect(() => {
      if(step === 3) {
        clearInterval(interval);
      }
    }, [step])

    const quizStartHandler = () => {
        setStep(2);
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 1000)
      }

    useEffect(()=>{
        const getQuiz = async () => {
            const response = await axios.get('https://mocki.io/v1/49d71894-641a-4df2-b2c9-02ff2174678f')
            .then(response => {
                setCurrentQuestion(response.data.data)
                console.log(response.data);
            })
        }
        getQuiz()
        } ,[])
    const resetClickHandler = () => {
        setActiveQuestion(0);
        setAnswer([]);
        setStep(2);
        setTime(0);
        interval = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 1000)
    
      }
    return (
        <div>
            {step === 1 && <Inicio onStart={quizStartHandler}/>}
            {step === 2 && <Quiz
      current = {currentQuestion[activeQuestion]}
      onAnswerUpdate={setAnswer}
      numberOfQuestions={currentQuestion.length}
      activeQuestion={activeQuestion}
      onSetActiveQuestion={setActiveQuestion}
      onSetStep={setStep}
     />}
    {step === 3 && <Final 
      results = {answer}
      data={currentQuestion}
      onReset={resetClickHandler}
      onAnswersCheck={() => setShowModal(true)}
      time={time}
     />}

    {showModal && <Modal 
      onClose={() => setShowModal(false)}
      results={answer}
      data={currentQuestion}
     />}
        </div>
    )
}

export default TestQuestion
