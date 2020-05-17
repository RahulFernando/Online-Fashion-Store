import React, { Component } from 'react'
import { Container, Form, Button, Image, Col, Row } from 'react-bootstrap';
import { upload, getMainCategories, getSubCategories } from '../../service/function'


class AddItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      img: null,
      file: null,
      itemName: '',
      mainCategory: '',
      subCategory: '',
      size: 'S',
      quantity: '',
      description: '',
      price: '',
      mainCategories: [],
      subCategories: []
    }

    this.onFileChange = this.onFileChange.bind(this);
    this.onItemNameChange = this.onItemNameChange.bind(this);
    this.onMainCategoryChange = this.onMainCategoryChange.bind(this);
    this.onSubCategoryChange = this.onSubCategoryChange.bind(this);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.onQuantityChange = this.onQuantityChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
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

  onFileChange = (e) => {
    let target = e.target;
    let value = target.files[0];

    this.setState({
      img: URL.createObjectURL(value),
      file: value
    })
  }

  onItemNameChange = (e) => {
    let target = e.target;
    let value = target.value;

    this.setState({
      itemName: value
    })
  }

  onMainCategoryChange = (e) => {
    let target = e.target;
    let value = target.value;

    this.setState({
      mainCategory: value
    })
  }

  onSubCategoryChange = (e) => {
    let target = e.target;
    let value = target.value;

    this.setState({
      subCategory: value
    })
  }

  onSizeChange = (e) => {
    let target = e.target;
    let value = target.value;

    this.setState({
      size: value
    })
  }

  onQuantityChange = (e) => {
    let target = e.target;
    let value = target.value;

    this.setState({
      quantity: value
    })
  }

  onDescriptionChange = (e) => {
    let target = e.target;
    let value = target.value;

    this.setState({
      description: value
    })
  }

  onPriceChange = (e) => {
    let target = e.target;
    let value = target.value;


    this.setState({
      price: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData();
    let arr = [];
    for (var key in this.state.size) {
      if (this.state.size[key] === true) {
        arr.push(key);
      }
    }
    size: arr.toString()
    data.append('file', this.state.file);
    data.append('itemName', this.state.itemName);
    data.append('mainCategory', this.state.mainCategory);
    data.append('subCategory', this.state.subCategory);
    data.append('size', this.state.size);
    data.append('qty', this.state.quantity);
    data.append('description', this.state.description);
    data.append('price', this.state.price);

    upload(data)
  }

  render() {

    return (
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>Upload Item</h2>
        </div>
        <Container>
          <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <br />
            <Form.Group controlId="formImagePreview">
              <Col xs={8} md={6}>
                <Image src={this.state.img} alt='' />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Control type="file" id="file" name="file" onChange={this.onFileChange} placeholder="Enter description" />
            </Form.Group>
            <Form.Group controlId="formItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control type="text" id="itemName" name="itemName" onChange={this.onItemNameChange} placeholder="Enter Item Name" />
            </Form.Group>
            <Form.Group controlId="formMainCategory">
              <Form.Label>Main Category</Form.Label>
              <Form.Control as="select" onChange={this.onMainCategoryChange}>
                <option>Select Main Category</option>
                {this.state.mainCategories.map(mainCategory => {
                  return <option key={mainCategory._id}>{mainCategory.mainCategoryName}</option>
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSubCategory">
              <Form.Label>Sub Category</Form.Label>
              <Form.Control as="select" onChange={this.onSubCategoryChange}>
                <option>Select Sub Category</option>
                {this.state.subCategories.map(subCategory => {
                  return <option key={subCategory._id}>{subCategory.subCategoryName}</option>
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Size
                </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Small"
                  name="size"
                  id="size"
                  checked={this.state.size === 'S'}
                  value="S"
                  onChange={this.onSizeChange}
                />
                <Form.Check
                  type="radio"
                  label="Medium"
                  name="size"
                  id="size"
                  checked={this.state.size === 'M'}
                  value="M"
                  onChange={this.onSizeChange}
                />
                <Form.Check
                  type="radio"
                  label="Large"
                  name="size"
                  id="size"
                  checked={this.state.size === 'L'}
                  value="L"
                  onChange={this.onSizeChange}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" id="quantity" name="quantity" min="0" onChange={this.onQuantityChange} placeholder="" />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={this.onDescriptionChange} />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price(Rs)</Form.Label>
              <Form.Control type="number" id="price" name="price" min="0" onChange={this.onPriceChange} placeholder="Rs.xxxx" />
            </Form.Group>
            <Button className="btn btn-primary btn-large centerButton" type="submit">Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default AddItem
