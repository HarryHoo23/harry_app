import React, { useState, useEffect, useRef } from 'react'

function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false); //set state as false
    const [height, setHeight] = useState('initial');
    const frontEl = useRef(); //useref can get the value
    const backEl = useRef();

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height; // get the current Hight of the Front side
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100)); //Either get frontHeight, or 100, return the larget value
        //Also set the height as the larger BoundingClientRect(); So that we can pass it to the style.
    }

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight); // this function will detect when the window size is changing.
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

    return (
        <div 
            className={`card quiz-card ${flip ? 'flip' : '' }`}
            style={{height: height}}
            onClick={() => setFlip(!flip)}>
            <div className="front" ref={frontEl}>
                <p className="question-text">{ flashcard.question }</p>
                <p className="difficulty-level">{`Difficulty: ${flashcard.difficulty}`}</p>
                <div className="flashcard-options">
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option" key={option}> {option} </div>
                    })}
                </div>
            </div>
            <div className="back" ref={backEl}>{flashcard.answer}</div>
        </div>
    )
}

export default Flashcard
