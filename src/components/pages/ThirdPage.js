import React, {useState, useEffect, useRef} from 'react'
import {Container, Form} from 'react-bootstrap';
import FlashCardList from '../quiz/FlashcardList';
import axios from '../../axios/axios';

function ThirdPage() {
    const [flashcards,
        setFlashcards] = useState([]);
    const [categories,
        setCategories] = useState([]);

    const categoryEl = useRef();
    const amountEl = useRef();
    const difficultEl = useRef();

    useEffect(() => {
        axios
            .get('https://opentdb.com/api_category.php')
            .then(res => {
                setCategories(res.data.trivia_categories);
            })
    }, [])

    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=10') //default api call
            .then(res => {
            setFlashcards(res.data.results.map((questionItem, index) => {
                const answer = decodeString(questionItem.correct_answer); //decodeString will change HTML code into readable text.
                const options = [
                    ...questionItem
                        .incorrect_answers
                        .map(ans => decodeString(ans)),
                    answer
                ]
                return {
                    id: `${index}-${Date.now()}`,
                    question: decodeString(questionItem.question),
                    answer: questionItem.correct_answer,
                    options: options.sort(() => Math.random() - .5),
                    difficulty: questionItem.difficulty
                }
            })) //Set Flashcard state as the returned Value (By calling setFlashcards to setState).
        })
    }, [])

    function decodeString(string) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = string;
        return textArea.value;
    } //Convert HTML code into readable code.

    let handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get('https://opentdb.com/api.php', {
            params: {
                amount: amountEl.current.value,
                category: categoryEl.current.value,
                difficulty: difficultEl.current.value
            }
        })
            .then(res => {
                setFlashcards(res.data.results.map((questionItem, index) => {
                    const answer = decodeString(questionItem.correct_answer);
                    const options = [
                        ...questionItem
                            .incorrect_answers
                            .map(ans => decodeString(ans)),
                        answer
                    ]
                    return {
                        id: `${index}-${Date.now()}`,
                        question: decodeString(questionItem.question),
                        answer: questionItem.correct_answer,
                        options: options.sort(() => Math.random() - .5),
                        difficulty: questionItem.difficulty
                    }
                }))
            })
    }

    return ( 
        <div className="quiz-page">
            <Form className="select-header mb-5" onSubmit={handleSubmit}>
                <div className="container selec-header-container">
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="category">
                            Category
                        </Form.Label>
                        <Form.Control id="category" ref={categoryEl} as="select" custom>
                            {categories.map(category => {
                                return <option value={category.id} key={category.id}>
                                    {category.name}
                                </option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="amount">
                            Number of Questions
                        </Form.Label>
                        <Form.Control
                            type="number"
                            id="amount"
                            min="1"
                            step="1"
                            defaultValue={10}
                            ref={amountEl}/>
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="difficulty">
                            Level of difficulty
                        </Form.Label>
                        <Form.Control id="difficulty" ref={difficultEl} as="select" custom>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="form-group">
                        <button className="btn-primary btn">Generate</button>
                    </div>
                </div>
            </Form>
            <Container className="quiz-container">
                <FlashCardList flashcards={flashcards}/>
            </Container>
        </div> 
    
    )
}



export default ThirdPage