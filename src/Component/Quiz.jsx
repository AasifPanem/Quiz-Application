import React,{useEffect, useRef, useState} from "react";
import "./Quiz.css";
import {data} from '../assets/data.js'

function Quiz() {

    let [index,setIndex] = useState(0)
    let [questions,setQuestions] = useState([])
    let [question,setQuestion] = useState(null)
    let [lock,setLock] = useState(false)
    let [score, setScore] = useState(0)
    let [result,setResult] = useState(false)

    let opt1 = useRef(null)
    let opt2 = useRef(null)
    let opt3 = useRef(null)
    let opt4 = useRef(null)

    let option_array = [opt1,opt2,opt3,opt4]
    
    useEffect(() => {
        const loadQuestions = async () => {
            const quizData = await data();
            setQuestions(quizData);
            console.log(questions);
            
            if (quizData?.length > 0) setQuestion(quizData[0]);
        };
        loadQuestions();
    }, []);
    
    const checkAns = (e,ans) => {
        if(lock === false){
            if(question.ans === ans){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev+1)
            }else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
            }
        }
    }
    
    const next = () => {
        if(lock === true){
            
            if(index === questions.length-1){
                setResult(true)
                return 0;
            }
            setIndex(prevIndex => prevIndex + 1);
            setQuestion(questions[index + 1]);
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(questions[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }
    
    return (
      <div className="quiz-container">
            <h1 className="quiz-title">Quiz App</h1>
            <hr className="quiz-divider" />
            {result?<>
                <h2>You scored {score} out of {questions.length} questions</h2>
                <button className="quiz-button" onClick={reset}>Reset</button>
            </>:<>
            {question && <> <h2 className="quiz-question">{index+1}.{question.question}</h2> 
            <ul className="quiz-options">
                <li ref={opt1} onClick={(e) => {checkAns(e,1)}} className="quiz-option">{question.option1}</li>
                <li ref={opt2} onClick={(e) => {checkAns(e,2)}} className="quiz-option">{question.option2}</li>
                <li ref={opt3} onClick={(e) => {checkAns(e,3)}} className="quiz-option">{question.option3}</li>
                <li ref={opt4} onClick={(e) => {checkAns(e,4)}} className="quiz-option">{question.option4}</li>
            </ul> 
            <button className="quiz-button" onClick={next}>Next</button>
            <div className="quiz-index">{index+1} of {questions.length} questions</div></>}
            </>}
      </div>
    );
}

export default Quiz;
