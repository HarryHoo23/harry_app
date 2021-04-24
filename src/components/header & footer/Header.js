import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav} from 'react-bootstrap';
import logo from '../../assests/e.svg';
import InfoLogout from './InfoLogout';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
    const { currentUser }  = useAuth();

        return (
            <>
            {currentUser &&  <header>
                <Navbar>
                    <Navbar.Brand>
                        <LinkContainer to="/">
                            <Nav.Link className="menu-logo">
                                <img src={logo} alt="logo-img" />
                            </Nav.Link>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <LinkContainer to="/">
                            <Nav.Link className="menu-item">
                                Home
                            </Nav.Link>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <LinkContainer to="/secondPage">
                            <Nav.Link className="menu-item">
                                DashBoard
                            </Nav.Link>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <LinkContainer to="/quizPage">
                            <Nav.Link className="menu-item">
                                Quiz
                            </Nav.Link>
                        </LinkContainer>
                    </Navbar.Brand>

                    <Navbar.Brand className="logout-box">                       
                        <InfoLogout />
                    </Navbar.Brand>
                </Navbar>
            </header> }
        </>
    )
};