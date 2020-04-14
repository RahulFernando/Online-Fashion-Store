import React, { Component } from 'react'

// bootstrap 
import { Button, Form, Card, InputGroup, FormControl, Alert } from 'react-bootstrap';

export default class StoreManagerInput extends Component {
    render() {
        const { username, email, password, usernameErr, emailErr, passwordErr, edit, handleChange, handleSubmit } = this.props
        return (
            <Card bg="light" className="card-body my-3">
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-user-plus"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                placeholder="Enter user name"
                                name="username"
                                id="username"
                                value={username}
                                onChange={handleChange}
                            >
                            </FormControl>
                        </InputGroup>
                        {usernameErr ? <Alert variant="danger" className="text-center"> {usernameErr}</Alert> : ''}

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-envelope-open-text"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="email"
                                placeholder="Enter email address"
                                name="email"
                                id="email"
                                value={email}
                                onChange={handleChange}
                            >
                            </FormControl>
                        </InputGroup>
                        {emailErr ? <Alert variant="danger" className="text-center"> {emailErr}</Alert> : ''}


                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={handleChange}
                            >
                            </FormControl>
                        </InputGroup>
                        {passwordErr ? <Alert variant="danger" className="text-center"> {passwordErr}</Alert> : ''}

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {edit ? 'Update': 'Create'}
                    </Button>
                </Form>
            </Card>
        )
    }
}
