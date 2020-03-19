import React, { Component } from 'react';

import { Button, Form, Container,Table, Row, Col } from 'react-bootstrap';

class SubCategory extends Component {
    render() {
        return (
            <Container>
                
                <Row className="justify-content-md-center">
                    <Col md="auto"><h3>New Sub Category</h3></Col>
                </Row>

                <Form>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Category name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name for category" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
                <br/>
                <Table responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>

            </Container>
        )
    }
}

export default SubCategory;