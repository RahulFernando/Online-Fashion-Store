import React, { Component } from 'react'

import { Button, Form, Card, InputGroup, FormControl, Alert } from 'react-bootstrap';

export default class MainCategoryInput extends Component {
    
    render() {
        // destructuring
        const { edit, mainCategoryName, handleChange, handleSubmit, mainCategoryErr } = this.props

        return (
            <Card bg="light" className="card-body my-3">
                <Form  onSubmit={handleSubmit}>

                    <Form.Group>

                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><i className="fas fa-shopping-basket"></i></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        placeholder="Enter Main Categroy Name"
                        id="mainCategoryName"
                        name="mainCategoryName"
                        value={mainCategoryName}
                        onChange={handleChange}
                        />
                    </InputGroup>

                    {mainCategoryErr ? <Alert variant="danger" className="text-center"> {mainCategoryErr}</Alert> : ''}
                        
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {edit ? 'Update': 'Create'}
                    </Button>
                    
                </Form>
            </Card>
        )
    }
}
