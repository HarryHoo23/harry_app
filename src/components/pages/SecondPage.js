import React, {Component} from 'react';
import { Button, CardColumns, Container } from 'react-bootstrap';
import Card from '../card/NewCard';
import UploadForm from '../uploadForm/UploadForm';
import trainImg from '../../assests/train.jpg';
import ImageGrid from '../imageGrid';
import axios from '../../axios/axios';

class SecondPage extends Component {
    state = {
        cards: {
            img: trainImg,
            title: 'Second Card'
        },
        card: [],
        fireabseCard: []
    }

    componentDidMount() {
        this.fetchCard();        
    }

    fetchCard() {
        axios.get('/ToDoListCard.json').then(res => {
            const fetchCard = [];
            for (let key in res.data) {
                fetchCard.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({fireabseCard: fetchCard})
        }).catch(error => {
            console.log(error);            
        })
    }

    addCard = () => {
        this.setState({
            card: [...this.state.card, this.state.fireabseCard.map(card => {
                    return (
                        <Card key={card.id} 
                        img={trainImg} 
                        title={card.title} 
                        content={card.content} />
                    )
                })
            ]
        })
    }

    render() {
        return (
            <Container fluid className="mt-5 board-container">
                <div className="cardboard-left">
                    <CardColumns>                                        
                        {this.state.fireabseCard.map(card => {
                            return (
                                <Card key={card.id} 
                                img={trainImg} 
                                title={card.title} 
                                content={card.content} />
                            )
                        })} 
                        {this.state.card}
                        <ImageGrid />
                    </CardColumns>                
                </div>
                    <div className="fixed-right">
                        <h2>Upload your card here:</h2>
                        <UploadForm />
                        <div className="add-box">
                            <Button className="add-btn" onClick={this.addCard}>Add more card</Button>
                        </div>
                    </div>    
                    
                
            </Container>
            
        );
    }
}

export default SecondPage;