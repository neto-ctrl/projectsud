import {useState, useCallback, useRef} from 'react';
import questions from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

export default function Quiz (){
    
    const [ answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([])
    
    


    const activeQuestion = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete =  activeQuestion === questions.length

    const handleSelectAnswer = useCallback( function handleSelectAnswer(
        selectedAnswer
    ) {
        setAnswerState('answered')
        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        });

        setTimeout(() => {
            if(selectedAnswer === questions[activeQuestion].answers[0]) {
                setAnswerState('correct')

            } else {
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('')
            }), 2000;
        },1000)
    },[activeQuestion])

    const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null), [])

    if (quizIsComplete) {
            return <div id = "summary">
                <img src={quizCompleteImg} alt ='Trophy Icon'></img>
                <h2>Quiz Completed!!</h2>
            </div>
        }
 
    return ( 
    <div id="question">
        <div id ="quiz">
            <div id="question">
                <QuestionTimer 
                key={activeQuestion}
                timeout={10000} 
                onTimeout={handleSkipAnswer}
                />
                <h2>{questions[activeQuestion].text}</h2>
                <Answers 
                key={activeQuestion}
                answers={questions[activeQuestion].answers} 
                selectedAnswear={userAnswers[userAnswers.length - 1]} 
                answerState={answerState}
                onSelect={handleSelectAnswer}
                />
            </div>
        
        </div>
      
    </div>
    )
}


