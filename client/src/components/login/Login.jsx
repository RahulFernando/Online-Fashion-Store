import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";

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
            <div>
                <Navbar/>
                <div className="App">
            
                    <div className="App__Aside">
                    
                    <div className="Main__Logo">
                        <img src={Fashion} alt="fashion"/>
                    </div>
            
                     </div>
            
                     <div className="App__Form">
            
                     <div className="PageSwitcher">
                    
                         <NavLink exact to="/user/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sing In</NavLink>
                         <NavLink to="/user/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                    
                     </div>
            
                     <div className="Form__Logo">
                         <img src={Login} alt="form_logo"/>
                     </div>
            
                     <Route path="/user/sign-in" component={SignInForm}>
                     </Route>
            
                     <Route path="/user/sign-up" component={SignUpForm}>
                     </Route>
                    
                     </div>
        
                 </div>
             </div>
         );
     }
 }

export default AdminLogin;