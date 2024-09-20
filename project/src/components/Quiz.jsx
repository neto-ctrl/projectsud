import {useState, useCallback, useRef} from 'react';
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import Question from './Question';

export default function Quiz (){
    
   
    const [userAnswers, setUserAnswers] = useState([])
    
    const activeQuestion = userAnswers.length 
    const quizIsComplete = activeQuestion === QUESTIONS.length

    const handleSelectAnswer = useCallback( 
        function handleSelectAnswer(selectedAnswer ) {
        
        setUserAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        });
    },[])

    const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
            return <div id = "summary">
                <img src={quizCompleteImg} alt ='Trophy Icon'></img>
                <h2>Quiz Completed!!</h2>
            </div>
        }
 
    return ( 
        <div id ="quiz">
            <Question 
            key={activeQuestion}
            index={activeQuestion}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
         />
        </div>
    )
}


