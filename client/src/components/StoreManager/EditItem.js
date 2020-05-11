import React, { Component } from 'react'
import { Button, Row, Col, Form, Container, Image, Modal } from 'react-bootstrap'
import { getMainCategories, getSubCategories, updateItemDetails } from '../../service/function'

export default class EditItem extends Component {


  constructor(props) {
    super(props)

    this.state = {
      id: '',
      itemname: '',
      itemName: '',
      mainCategory: '',
      subCategory: '',
      size: false,
      quantity: '',
      description: '',
      price: '',
      discount: '',
      mainCategories: [],
      subCategories: []
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    getMainCategories().then(res => {
      this.setState({
        mainCategories: res.data
      })
    })
    getSubCategories().then(res => {
      this.setState({
        subCategories: res.data
      })
    })

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.selected._id,
      itemName: nextProps.selected.itemName,
      mainCategory: nextProps.selected.mainCategory,
      subCategory: nextProps.selected.subCategory,
      size: nextProps.selected.size,
      quantity: nextProps.selected.qty,
      description: nextProps.selected.description,
      price: nextProps.selected.price,
      discount: nextProps.selected.discount,    
    })
  }


  onChange = (e) =>{
    let target = e.target
    let name = target.name
    let value = target.value

    this.setState({
      [name]: value
    })
  }



  handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData()

    data.append("itemName", this.state.itemName)
    data.append("mainCategory", this.state.mainCategory)
    data.append("subCategory", this.state.subCategory)
    data.append("size", this.state.size)
    data.append("qty", this.state.quantity)
    data.append("description", this.state.description)
    data.append("price", this.state.price)
    data.append("discount", this.state.discount)

    updateItemDetails(this.state.id, data)

  }

  render() {
    return (

      <Modal
        {...this.props}
        style={{maxHeight:"100%"}}
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
              <br />
              <Form.Group controlId="formItemName">
                <Form.Label></Form.Label>
                <Form.Control type="text"  name="itemName" placeholder="Enter Item Name" defaultValue={this.state.itemName} onChange={this.onChange} />
              </Form.Group>
              <Form.Group controlId="formMainCategory">
                <Form.Label>Main Category</Form.Label>
                <Form.Control as="select" name="mainCategory" defaultValue={this.state.mainCategory} onChange={this.onChange}>
                  <option>Select Main Category</option>
                  {this.state.mainCategories.map(mainCategory => {
                    return <option key={mainCategory._id}>{mainCategory.mainCategoryName}</option>
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formSubCategory">
                <Form.Label>Sub Category</Form.Label>
                <Form.Control as="select" name="subCategory" defaultValue={this.state.subCategory} onChange={this.onChange}>
                  <option>Select Sub Category</option>
                  {this.state.subCategories.map(subCategory => {
                    return <option key={subCategory._id}>{subCategory.subCategoryName}</option>
                  })}
                </Form.Control>
              </Form.Group>
              {['checkbox'].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3" onChange={this.onChange}>
                  <Form.Check
                    custom
                    inline
                    label="XS"
                    type={type}
                    id={`custom-inline-${type}-1`}
                    defaultChecked={this.state.size}
                  />
                </div>
              ))}
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number"  name="quantity" defaultValue={this.state.quantity} onChange={this.onChange} />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" rows="3" defaultValue={this.state.description} onChange={this.onChange} />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price(Rs)</Form.Label>
                <Form.Control type="number"  name="price" defaultValue={this.state.price} onChange={this.onChange} />
              </Form.Group>
              <Form.Group controlId="formDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="number"  name="discount" defaultValue={this.state.discount} onChange={this.onChange} />
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
