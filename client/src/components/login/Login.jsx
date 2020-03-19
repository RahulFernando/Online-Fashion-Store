import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import "./style.css"

// components
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Navbar from '../Navbar';

// images
import Login from "../../images/login.svg";
import Fashion from "../../images/fashion.svg";

class AdminLogin extends Component {
    render() {
        return (
            <Router>
                <Navbar/>
                
                <div className="App">
            
                    <div className="App__Aside">
                    
                    <div className="Main__Logo">
                        <img src={Fashion} alt="fashion"/>
                    </div>
            
                    </div>
            
                    <div className="App__Form">
            
                    <div className="PageSwitcher">
                    
                        <NavLink to="/user" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sing In</NavLink>
                        <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                    
                    </div>
            
                    <div className="Form__Logo">
                        <img src={Login}/>
                    </div>
            
                    <Route path="/user" component={SignInForm}>
                    </Route>
            
                    <Route path="/sign-up" component={SignUpForm}>
                    </Route>
                    
                    </div>
        
                </div>
            </Router>
        );
    }
}

export default AdminLogin;