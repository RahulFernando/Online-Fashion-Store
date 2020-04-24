import React, { Component } from 'react'
import {Container,Form,Button, Image, Col} from 'react-bootstrap';
import {upload} from '../../service/FileUpload';

class AddItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
          img: null,
          file: null,
          mainCategory: '',
          subCategory: '',
          size: '',
          quantity: '',
          description: '',
          price: ''
        }

        this.onFileChange = this.onFileChange.bind(this);
        // this.onMainCategoryChange = this.onMainCategoryChange(this);
        // this.onSubCategoryChange = this.onSubCategoryChange(this);
        this.onSizeChange = this.onSizeChange(this);
        this.onQuantityChange = this.onQuantityChange(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        // this.onPriceChange = this.onPriceChange(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onFileChange = (e) => {
        let target = e.target;
        let value = target.files[0];

        this.setState({
          img: URL.createObjectURL(value),
          file: value
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
      let value = e.value;

      this.setState({
        subCategory: value
      })
    }

    onSizeChange = (e) => {
      let target = e.target;
      let value = e.value;

      this.setState({
        size: value
      })
    }

    onQuantityChange = (e) => {
      let target = e.target;
      let value = e.value;

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
        data.append('file', this.state.file);
        data.append('mainCategory', this.state.mainCategory);
        data.append('subCategory', this.state.subCategory);
        data.append('size', this.state.size);
        data.append('quantity', this.state.quantity);
        data.append('description', this.state.description);
        data.append('price', this.state.price);

        upload(data)
    }

    render() {

        return (
            <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <h2>Upload Item</h2>
            </div>
            <Container>
            <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <br/>
              <Form.Group controlId="formImagePreview">
                <Col xs={8} md={6}>
                <Image src={this.state.img} alt='' />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Control type="file" id="file" name="file" onChange={this.onFileChange} placeholder="Enter description" />
              </Form.Group>
              <Form.Group controlId="formMainCategory">
                <Form.Label>Main Category</Form.Label>
                  <Form.Control as="select" onChange={this.onMainCategoryChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="formSubCategory">
                <Form.Label>Sub Category</Form.Label>
                  <Form.Control as="select" onChange={this.onSubCategoryChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
              </Form.Group>
              {['checkbox'].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3" onChange={this.onSizeChange}>
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
                  <Form.Control type="number" onChange={this.onQuantityChange} placeholder="" />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows="3" onChange={this.onDescriptionChange}/>
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price(Rs)</Form.Label>
                  <Form.Control type="number" onChange={this.onPriceChange} placeholder="Rs.xxxx" />
              </Form.Group>
              <Button className="btn btn-primary btn-large centerButton" type="submit">Submit</Button>
          </Form>
          </Container>
        </div>
        )
    }
}

export default AddItem
