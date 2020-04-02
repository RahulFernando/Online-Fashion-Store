import React, { Component } from 'react'

// bootstrap
import { Button, Form, Card, InputGroup, FormControl, Alert } from 'react-bootstrap';


export default class SubCategoryInput extends Component {
    render() {
        const { subCategoryName, subCategoryErr, selectedmainCategory, mainCategories, main_category_id, edit, handleChange,handleSubmit } = this.props
        return (
            <Card bg="light" className="card-body my-3">
                <Form onSubmit={handleSubmit}>

                    <Form.Group>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><i className="fas fa-shopping-basket"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            placeholder="Enter Sub Categroy Name"
                            id="subCategoryName"
                            name="subCategoryName"
                            value={subCategoryName}
                            onChange={handleChange}
                            />
                        </InputGroup>

                        
                        {subCategoryErr ? <Alert variant="danger" className="text-center"> {subCategoryErr}</Alert> : ''}
                        
                    </Form.Group>

                        <Form.Group>
                                <Form.Control as="select" size="sm" name="main_category_id" id="main_category_id"  onChange={handleChange}>
                                    <option>{selectedmainCategory ? selectedmainCategory : 'Select Main Category'}</option>
                                {mainCategories.map(mainCategory => {
                                    return <option key={mainCategory._id} value={main_category_id ? main_category_id : mainCategory._id}>{mainCategory.mainCategoryName}</option>
                                })}
                                
                            </Form.Control>
                        </Form.Group>

                    <Button variant="primary" type="submit">
                        {edit ? 'Update': 'Create'}
                    </Button>
                    
                </Form>
            </Card>
        )
    }
}
