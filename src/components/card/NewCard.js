import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import DeleteStoreButton from '../../hooks/DeleteStoreButton';

class NewCard extends Component {
    
    render() { 
        return ( 
            <>
                <Card className="info-card" style={{ width: '18rem' }}>
                    <Card.Text className="timestamp"><span>{this.props.month}</span><br/>{this.props.date}</Card.Text>
                    <Card.Img variant="top" src={this.props.img} />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Subtitle>{this.props.time}</Card.Subtitle>
                        <Card.Text>{this.props.content}</Card.Text>
                    </Card.Body>           
                    <DeleteStoreButton id={this.props.id} />             
                </Card>                               
            </>
            
        );
    }
}
 
export default NewCard;