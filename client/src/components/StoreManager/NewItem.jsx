import React, { Component } from 'react'
import {Container, Form, Button} from 'react-bootstrap'

import { upload } from '../../service/FileUpload'

export default class NewItem extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           file: null,
           description: ''
        }
    
        this.onFileChange = this.onFileChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    onFileChange = (e) => {
        let target = e.target;
        let value = target.files[0];
    
        this.setState({
          file: value
        })
    }
    
    onDescriptionChange = (e) => {
        let target = e.target;
        let value = target.value;
    
        this.setState({
          description: value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('file', this.state.file);
        data.append('description', this.state.description);
    
        upload(data)
    }
    render() {
        return (
          <Container>
            <Form onSubmit={this.handleSubmit} enctype="multipart/form-data">
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="file" id="file" name="file" onChange={this.onFileChange} placeholder="Enter description" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" id="description" name="description" onChange={this.onDescriptionChange} placeholder="Enter description" />
              </Form.Group>
    
               <Button type="submit" variant="primary">SUBMIT</Button>
            </Form>
          </Container>
        )
      }
}
