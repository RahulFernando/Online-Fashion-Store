import React, { Component } from 'react'
import { Button, Row, Col, Form, Container, Image, Modal} from 'react-bootstrap'
import { getMainCategories, getSubCategories, updateItemDetails} from '../../service/function'


export default class EditItem extends Component {


    constructor(props) {
        super(props)
        this.state = {
            id: '',
            itemname: '',
            mainCategory: '',
            subCategory: '',
            size: '',
            qty: '',
            description: '',
            price: ''
          }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        id: nextProps.selected._id,
        itemname: nextProps.selected.itemName,
        mainCategory: nextProps.selected.mainCategory,
        subCategory: nextProps.selected.subCategory,
        size: nextProps.selected.size,
        qty: nextProps.selected.qty,
        description: nextProps.selected.description,
        price: nextProps.selected.price,        
      })
    }

    onChange = (e) =>{
      let target = e.target
      let name = e.name
      let value = e.value

      this.setState({
        [name]: value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const data = {
        itemname: this.state.itemname,
        mainCategory: this.state.mainCategory,
        subCategory: this.state.subCategory,
        size: this.state.size,
        qty: this.state.qty,
        description: this.state.description,
        price: this.state.price
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
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
                <Form.Control type="text" name="itemName" placeholder="Enter Item Name" defaultValue={this.state.itemname} onChange={this.onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Main Category</Form.Label>
                <Form.Control type="text" name="maincategory" placeholder="Enter Main Category" defaultValue={this.state.mainCategory} onChange={this.onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sub Category</Form.Label>
                <Form.Control type="text" name="subcategory" placeholder="Enter Sub Category" defaultValue={this.state.subCategory} onChange={this.onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Size</Form.Label>
                <Form.Control type="text" name="size" placeholder="Enter Size" defaultValue={this.state.size} onChange={this.onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" placeholder="Enter Quantity" defaultValue={this.state.qty} onChange={this.onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" placeholder="Enter Description" defaultValue={this.state.description} onChange={this.onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" placeholder="Enter Price" defaultValue={this.state.price} onChange={this.onChange} />
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
