import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

// images
import Login from "./login.svg";
import Fashion from "./fashion.svg";

// components
import SignInForm from "./components/login/SignInForm";
import SignUpForm from "./components/login/SignUpForm";

function App() {
  return (
    <Router>
      <div className="App">
        
        <div className="App__Aside">
          
          <div className="Main__Logo">
            <img src={Fashion}/>
          </div>

        </div>

        <div className="App__Form">

          <div className="PageSwitcher">
          
            <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sing In</NavLink>
            <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
          
          </div>

          <div className="Form__Logo">
            <img src={Login}/>
          </div>

          <Route exact path="/" component={SignInForm}>
          </Route>

          <Route path="/sign-up" component={SignUpForm}>
          </Route>
        
        </div>

      </div>
    </Router>
  );
}

export default App;
