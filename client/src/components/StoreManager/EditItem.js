import React, { Component } from 'react'
import { Button, Row, Col, Form, Container, Image, Modal } from 'react-bootstrap'
import { getMainCategories, getSubCategories, updateItemDetails } from '../../service/function'


export default class EditItem extends Component {


  constructor(props) {
    super(props)

    this.state = {
      // img: null,
      // file: null,
      id: '',
      itemname: '',
      mainCategory: '',
      subCategory: '',
      size: false,
      quantity: '',
      description: '',
      price: '',
      mainCategories: [],
      subCategories: []
    }

    // this.onFileChange = this.onFileChange.bind(this);
    // this.onItemNameChange = this.onItemNameChange.bind(this);
    // this.onMainCategoryChange = this.onMainCategoryChange.bind(this);
    // this.onSubCategoryChange = this.onSubCategoryChange.bind(this);
    // this.onSizeChange = this.onSizeChange.bind(this);
    // this.onQuantityChange = this.onQuantityChange.bind(this);
    // this.onDescriptionChange = this.onDescriptionChange.bind(this);
    // this.onPriceChange = this.onPriceChange.bind(this);
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
    console.log(nextProps)
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

  // onFileChange = (e) => {
  //     let target = e.target;
  //     let value = target.files[0];

  //     this.setState({
  //       img: URL.createObjectURL(value),
  //       file: e.target.value
  //     })
  // }

  onChange = (e) => {

    let target = e.target
      let name = e.name
      let value = e.value

    this.setState({
      [name]: value
    })
  }

  // onMainCategoryChange = (e) => {

  //   this.setState({
  //     mainCategory: e.target.value
  //   })
  // }

  // onSubCategoryChange = (e) => {

  //   this.setState({
  //     subCategory: e.target.value
  //   })
  // }

  // onSizeChange = (e) => {
  //   // let target = e.target;
  //   // let value = target.value;

  //   this.setState(prevState => ({
  //     // [e.target.label]: e.target.checked
  //     size: !prevState.size
  //   }))
  // }

  // onQuantityChange = (e) => {

  //   this.setState({
  //     quantity: e.target.value
  //   })
  // }

  // onDescriptionChange = (e) => {

  //   this.setState({
  //     description: e.target.value
  //   })
  // }

  // onPriceChange = (e) => {

  //   this.setState({
  //     price: e.target.value
  //   })
  // }

  handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      itemName: this.state.itemname,
      mainCategory: this.state.mainCategory,
      subCategory: this.state.subCategory,
      size: this.state.size,
      qty: this.state.quantity,
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
              <br />
              <Form.Group controlId="formItemName">
                <Form.Label></Form.Label>
                <Form.Control type="text"  name="itemName" placeholder="Enter Item Name" defaultValue={this.state.itemName} onChange={this.onChange} />
              </Form.Group>
              <Form.Group controlId="formMainCategory">
                <Form.Label>Main Category</Form.Label>
                <Form.Control as="select" defaultValue={this.state.mainCategory} onChange={this.onChange}>
                  <option>Select Main Category</option>
                  {this.state.mainCategories.map(mainCategory => {
                    return <option key={mainCategory._id}>{mainCategory.mainCategoryName}</option>
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formSubCategory">
                <Form.Label>Sub Category</Form.Label>
                <Form.Control as="select" defaultValue={this.state.subCategory} onChange={this.onChange}>
                  <option>Select Sub Category</option>
                  {this.state.subCategories.map(subCategory => {
                    return <option key={subCategory._id}>{subCategory.subCategoryName}</option>
                  })}
                </Form.Control>
              </Form.Group>
              {['checkbox'].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3" checked={this.state.size} defaultValue={this.state.size} onChange={this.onChange}>
                  <Form.Check
                    custom
                    inline
                    label="XS"
                    type={type}
                    id={`custom-inline-${type}-1`}
                  />
                  {/* <Form.Check
                    custom
                    inline
                    label="S"
                    type={type}
                    id={`custom-inline-${type}-2`}
                  />
                  <Form.Check
                    custom
                    inline
                    label="M"
                    type={type}
                    id={`custom-inline-${type}-3`}
                  />
                  <Form.Check
                    custom
                    inline
                    label="L"
                    type={type}
                    id={`custom-inline-${type}-4`}
                  />
                  <Form.Check
                    custom
                    inline
                    label="XL"
                    type={type}
                    id={`custom-inline-${type}-5`}
                  /> */}
                </div>
              ))}
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number"  name="quantity" defaultValue={this.state.quantity} onChange={this.onChange} />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue={this.state.description} onChange={this.onChange} />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price(Rs)</Form.Label>
                <Form.Control type="number"  name="price" defaultValue={this.state.price} onChange={this.onChange} />
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
