import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import  {fieldset} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

export default class Payment extends Component {
    render() {
        return (
            <Card>
  <Card.Header>Payment Form</Card.Header>
  <Card.Body>
  <Form>
            <fieldset>
            <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                     Payment Methods
                </Form.Label>
                     <Col sm={10}>
                             <Form.Check
                                    type="radio"
                                    label="Pay By cash"
                                    name="formHorizontalRadios"
                                     id="formHorizontalRadios1"
                                     checked = "checked"
                             />
                            <Form.Check
                                     type="radio"
                                     label="Pay By card"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                            />
        
                             </Col>
                </Form.Group>
            </fieldset>
        </Form>
    <Button variant="success">Confirm Payment</Button>
  </Card.Body>
</Card>
           
        )
    }
}
