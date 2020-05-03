import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form, Container, Image} from 'react-bootstrap'

export default class EditItem extends Component {

    constructor(props) {
        super(props)
    
        // this.handleSubmit = this.handleSubmit.bind(this);
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
          Edit Men
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              {['checkbox'].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3" checked={this.state.size} onChange={this.onSizeChange}>
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
                  <Form.Control type="number" id="quantity" name="quantity" onChange={this.onQuantityChange} placeholder="" />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows="3" onChange={this.onDescriptionChange}/>
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price(Rs)</Form.Label>
                  <Form.Control type="number" id="price" name="price" onChange={this.onPriceChange} placeholder="Rs.xxxx" />
              </Form.Group>
              <Button className="btn btn-primary btn-large centerButton" type="submit">Submit</Button>
          </Form>
          </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button >Close</Button>
      </Modal.Footer>
    </Modal>

        )
    }
}
