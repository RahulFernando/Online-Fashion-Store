import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { registerUser } from '../../service/function'; // import function

const initailState = {
  username: '',
  email: '',
  password: '',
  usernameErr: '',
  emailErr: '',
  passwordErr: '',
  serverErr: ''
}

class SignUpForm extends Component {

  constructor() {
    super();
    this.state = initailState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name] : value
    })
  }

  validate = () => {
    let usernameErr = '';
    let emailErr = '';
    let passwordErr = '';

    if (!this.state.username ) {
      usernameErr = "username cannot be empty!"
    } else if (!this.state.email.includes('@')) {
      emailErr = 'invalid email!';
    } else  if (!this.state.password) {
      passwordErr = 'password cannot be empty!';
    }

    if (emailErr) {
      this.setState({emailErr});
      return false;
    }else if (usernameErr) {
      this.setState({usernameErr});
      return false;
    }else if (passwordErr) {
      this.setState({passwordErr});
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    let serverErr = '';

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    if (isValid) {
      registerUser(newUser).then(res => {
        if (!res.data.status) {
              serverErr = res.data.message;
              this.setState({serverErr});
            }
      })
      
      // reset form
      this.setState(initailState);
    }
  }

    render() {
        return (
            <div className="FormCenter">

            <form className="FormFields" onSubmit={this.handleSubmit}>

              <div className="FormField">

                <label className="FormField__Label" htmlFor="username">Username</label>

                <input type="text" id="username" className="FormField__Input" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange}/>
                
                <div>{this.state.usernameErr ? (
                  <span className="ErrorMessage">{this.state.usernameErr}</span>
                ): null}</div>
              
              </div>

              <div className="FormField">

                <label className="FormField__Label" htmlFor="email">Email</label>

                <input type="email" id="email" className="FormField__Input" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
                
                <div>{this.state.emailErr ? (
                  <span className="ErrorMessage">{this.state.emailErr}</span>
                ): null}</div>
              
              </div>

              <div className="FormField">

                <label className="FormField__Label" htmlFor="password">Password</label>

                <input type="password" id="password" className="FormField__Input" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}/>

                <div>{this.state.passwordErr ? (
                  <span className="ErrorMessage">{this.state.passwordErr}</span>
                ): null}</div>

              </div>

              <div className="FormField">

                <button className="FormField__Button mr-20">
                  Sign Up
                </button>

                <Link to="/sign-up" className="FormField__Link">Already have an account?</Link>

              </div>

              <div>{this.state.serverErr ? (
                  <span className="ErrorMessage">{this.state.serverErr}</span>
                ): null}</div> 
                
            </form>

          </div>
        );
    }
}

export default SignUpForm;