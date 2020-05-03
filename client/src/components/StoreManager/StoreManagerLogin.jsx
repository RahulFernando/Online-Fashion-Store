import React, { Component } from 'react'

// react-bootstrap
import { Card, Container, Button, Form, FormGroup, Alert } from 'react-bootstrap'
import './style.css'

// function
import { loginStoreManager, isStoreManagerAuthenticated } from '../../service/function'
import { FaThinkPeaks } from 'react-icons/fa'

export default class StoreManagerLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username: '',
             password: '',
             usernameErr: '',
             passwordErr: '',
             serverErr: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    // handle changes
    handleChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        })
    }

    // valudate
    validate = () => {
        let usernameErr = ''
        let passwordErr = ''
        let valid = true

        if (!this.state.username) {
            usernameErr = "Username is empty!"
        } else if (!this.state.password) {
            passwordErr = "Password is empty"
        }

        if (usernameErr) {
            this.setState({usernameErr})
            valid = false
        } else if (passwordErr) {
            this.setState({passwordErr})
            valid = false
        }

        return valid
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let errors = this.state.errors
        if (this.validate()) {
            const manager = {
                username: this.state.username,
                password: this.state.password
            }

            loginStoreManager(manager).then(res => {
                const auth = isStoreManagerAuthenticated();
                if (auth) {
                    this.props.history.push('/store');
                } else {
                    this.setState({
                        serverErr: 'Username or Password Invalid!'
                    })
                    setTimeout(() => {
                        this.setState({
                            serverErr: ''
                        })
                    }, 3000);
                }
            })
        }
    }
    
    render() {
        return (
            <div className="login">
                <Card className="custom">
                    <Card.Body>
                        <Container>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="username" onChange={this.handleChange} placeholder="Enter username"></Form.Control>
                                    </FormGroup>
                                    <div>{this.state.usernameErr ? (
                                        <span className="ErrorMessage">{this.state.usernameErr}</span>
                                    ): null}</div>
                                    <FormGroup>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Enter password"></Form.Control>
                                    </FormGroup>
                                    <div>{this.state.passwordErr ? (
                                        <span className="ErrorMessage">{this.state.passwordErr}</span>
                                    ): null}</div>
                                    <Button type="submit">Login</Button>
                                    <div>{this.state.serverErr ? (
                                        <span className="ErrorMessage">{this.state.serverErr}</span>
                                    ): null}</div>
                                </Form>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
