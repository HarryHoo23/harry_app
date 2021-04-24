import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class NewCard extends Component {
    
    render() { 
        return ( 
            <>
                <Card className="info-card" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.img} />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>{this.props.content}</Card.Text>
                    </Card.Body>                        
                </Card>                               
            </>
            
        );
    }
}
 
export default NewCard;