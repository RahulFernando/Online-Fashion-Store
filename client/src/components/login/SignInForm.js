import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { loginUser } from '../../service/function';

import { Button, Form, Container } from 'react-bootstrap';


class SignInForm extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      usernameErr: '',
      passwordErr: ''
    };

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
    let passwordErr = '';

    if (!this.state.username ) {
      usernameErr = "username cannot be empty!"
    } else  if (!this.state.password) {
      passwordErr = 'password cannot be empty!';
    }

    if (usernameErr) {
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
    const user = {
      username: this.state.username,
      password: this.state.password
    }
   
    if (isValid) {
      loginUser(user).then(res => { 
        if (localStorage.getItem('usertoken')) {
          this.props.history.push('/men');
        }
      })
    }

  }

    render() {
        return (
            <Container>

              <Form className="FormFields" onSubmit={this.handleSubmit}>

                <Form.Group className="FormField" controlId="formBasicEmail">

                  <Form.Label className="FormField__Label">Username</Form.Label>

                  <input type="text" id="username" className="FormField__Input" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange}/>

                  <div>{this.state.usernameErr ? (
                    <span className="ErrorMessage">{this.state.usernameErr}</span>
                  ): null}</div>

                </Form.Group>

                <Form.Group className="FormField" controlId="formBasicEmail">

                <Form.Label className="FormField__Label">Password</Form.Label>

                  <input type="password" id="password" className="FormField__Input" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}/>

                  <div>{this.state.passwordErr ? (
                    <span className="ErrorMessage">{this.state.passwordErr}</span>
                  ): null}</div>

                </Form.Group>

                <Form.Group className="FormField" controlId="formBasicEmail">

                  <Button type="submit" className="Form__Button mr-20">Sign In</Button> &nbsp;

                  <Link to="/sign-up" style={{ textDecoration: 'none' }} className="FormField__Link">Don't have an account?</Link>

                </Form.Group>

              </Form>
            </Container>
        );
    }
}

export default SignInForm;