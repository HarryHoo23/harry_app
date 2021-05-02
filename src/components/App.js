import React, { Component } from 'react';
import Signup from '../components/login&signup/Signup';
import Login from '../components/login&signup/Login';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from '../components/login&signup/ForgotPassword';
import Header from './header & footer/Header';
import HomePage from './pages/HomePage';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';
import 'react-toastify/dist/ReactToastify.css';
// import Footer from './header & footer/Footer';

class App extends Component {

    render() {
        return (
            <div>
                <BrowserRouter>
                    <AuthProvider>                                        
                    <Header />
                    <Switch>                                
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/secondPage" component={SecondPage} />
                        <Route exact path="/quizPage" component={ThirdPage} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />                            
                    </Switch>
                    </AuthProvider> 
                </BrowserRouter>
            </div>    
        )
    }
}

export default App;