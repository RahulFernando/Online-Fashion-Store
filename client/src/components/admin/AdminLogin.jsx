import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import "./style.css";

// service
import { loginAdmin } from '../../service/function';

class Login extends Component {
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
    const admin = {
      username: this.state.username,
      password: this.state.password
    }
   
    if (isValid) {
      loginAdmin(admin).then(res => {
        this.props.history.push('/dash');
      })
    }

  }

  render() {
    return (
      <div className="Login">
        
        <Form className="FormFields" onSubmit={this.handleSubmit}>
          
          <FormGroup>

            <FormLabel>Username</FormLabel>

            <FormControl type="text" id="username" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange}/>

            <div>{this.state.usernameErr ? (
              <span className="ErrorMessage">{this.state.usernameErr}</span>
            ): null}</div>

          </FormGroup>
          
          <FormGroup>

            <FormLabel>Password</FormLabel>

            <FormControl type="password" id="password" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}/>

            <div>{this.state.usernameErr ? (
              <span className="ErrorMessage">{this.state.usernameErr}</span>
            ): null}</div>

          </FormGroup>
          
          <Button block type="submit">
            Login
          </Button>
        
        </Form>
      
      </div>
    );
  }
}

export default Login