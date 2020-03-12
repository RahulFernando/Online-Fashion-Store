import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignUpForm extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
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
    axios.post("/admin/register", this.state)
      .then(res => { console.log(res) })
      .catch(err => { console.log(err) })
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

                <label className="FormField__Label" htmlFor="email">Email</label>

                <input type="email" id="email" className="FormField__Input" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>

              </div>

              <div className="FormField">

                <label className="FormField__Label" htmlFor="password">Password</label>

                <input type="password" id="password" className="FormField__Input" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}/>

              </div>

              <div className="FormField">

                <button className="FormField__Button mr-20">
                  Sign Up
                </button>

                <Link to="/sign-up" className="FormField__Link">Already have an account?</Link>

              </div>

            </form>

          </div>
        );
    }
}

export default SignUpForm;