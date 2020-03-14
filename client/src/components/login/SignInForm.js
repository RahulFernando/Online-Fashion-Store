import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { loginUser } from '../../service/function';

class SignInForm extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
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

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    loginUser(user).then(res => {})

  }

    render() {
        return (
            <div className="FormCenter">

            <form className="FormFields" onSubmit={this.handleSubmit}>

              <div className="FormField">

                <label className="FormField__Label" htmlFor="username">Username</label>

                <input type="text" id="username" className="FormField__Input" placeholder="Enter username" name="username" value={this.state.username} onChange={this.handleChange}/>

              </div>

              <div className="FormField">

                <label className="FormField__Label" htmlFor="password">Password</label>

                <input type="password" id="password" className="FormField__Input" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}/>

              </div>

              <div className="FormField">

                <button className="FormField__Button mr-20">
                  Sign In
                </button>

                <Link to="/sign-up" className="FormField__Link">Don't have an account?</Link>

              </div>

            </form>

          </div>
        );
    }
}

export default SignInForm;