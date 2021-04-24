import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import img from '../../assests/Harry_photo.png';

export default function HomePage() {
    
    return (
        <Container className="mt-5">
            <Row>
                <Col className="md-12">
                    <div style={{maxWidth:"600px", margin: "auto"}}>
                        <h2 className="home-title">Welcome to my page</h2>
                        <br/>                        
                        <Image className="responsive-img" src ={img} alt="img" />
                    </div>                    
                </Col>
            </Row>
            
        </Container>
    );
}