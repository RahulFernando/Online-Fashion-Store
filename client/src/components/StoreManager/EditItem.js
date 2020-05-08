import React, { Component } from 'react'
import { Button, Row, Col, Form, Container, Image, Modal} from 'react-bootstrap'
import { getMainCategories, getSubCategories, updateItemDetails} from '../../service/function'


export default class EditItem extends Component {


    constructor(props) {
        super(props)
        this.state = {
            id: '',
            itemName: ''
          }

        this.onItemNameChange = this.onItemNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        id: nextProps.id,
        itemName: nextProps.itemName
      })
    }

    onItemNameChange = (e) =>{
      this.setState({
        itemName: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const data = {
        itemName: this.state.itemName
      }
      updateItemDetails(this.state.id, data)
    }
        
  
      render() {
        return (
          <Modal
    {...this.props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Edit Item
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Container>
         <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <br/>
            <Form.Group controlId="formItemName">
              <Form.Label></Form.Label>
                <Form.Control type="text" name="itemName" placeholder="Enter Item Name" defaultValue={this.state.itemName} onChange={this.onItemNameChange} />
            </Form.Group>
            <Modal.Footer>
              <Button variant="success" type="submit">Save</Button>
            </Modal.Footer>
        </Form>
        </Container>
    </Modal.Body>
  </Modal>
      )
    }
}
