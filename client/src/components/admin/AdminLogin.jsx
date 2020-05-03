import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import "./style.css";

// service
import { loginAdmin, isAdminAuthenticated } from '../../service/function';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      usernameErr: '',
      passwordErr: '',
      serverError: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handle changes in input
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name] : value
    })
  }

  // validate form
  validate = () => {
    let usernameErr = '';
    let passwordErr = '';

    if (!this.state.username ) {
      usernameErr = "username cannot be empty!"
    } else if (!this.state.password) {
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

  // handle form submit
  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    const admin = {
      username: this.state.username,
      password: this.state.password
    }
   
    if (isValid) {
      loginAdmin(admin).then(res => {
        const auth = isAdminAuthenticated()
        if (auth) {
          this.props.history.push('/dash');
        } else {
          this.setState({
            serverError: 'Username or Password Invalid!'
          })
          setTimeout(() => {
            this.setState({
              serverError: ''
            })
          }, 3000);
        }
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

            <div>{this.state.passwordErr ? (
              <span className="ErrorMessage">{this.state.passwordErr}</span>
            ): null}</div>

          </FormGroup>
          
          <Button block type="submit">
            Login
          </Button>
        
          <div className="text-center">
            {this.state.serverError ? (
                <span className="ErrorMessage">{this.state.serverError}</span>
              ): null}
          </div>

        </Form>
      
      </div>
    );
  }
}

export default Login
