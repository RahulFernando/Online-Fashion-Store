import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form, Container, Image} from 'react-bootstrap'
import { getMainCategories, getSubCategories, updateItemDetails } from '../../service/function'


export default class EditItem extends Component {


    constructor(props) {
        super(props)


        // this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            img: null,
            file: null,
            itemName: '',
            mainCategory: '',
            subCategory: '',
            size: false,
            quantity: '',
            description: '',
            price: '',
            mainCategories: [],
            subCategories: [],
          
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
  
      onSizeChange = () => {
        // let target = e.target;
        // let value = target.value;
  
        this.setState(prevState => ({
          // [e.target.label]: e.target.checked
          size: !prevState.size
        }))
      }
  
      onQuantityChange = (e) => {
        let target = e.target;
        let value = target.value;
        console.log(value)
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
          console.log(this.state.itemName)
          const data = new FormData();
          let arr = [];
          for (var key in this.state.size) {
            if(this.state.size[key] === true) {
              arr.push(key);
            }
          }
          size: arr.toString()
          // data.append('file', this.state.file);
          // data.append('itemName', this.props.itemName);
          // data.append('mainCategory', this.state.mainCategory);
          // data.append('subCategory', this.state.subCategory);
          // data.append('size', this.state.size);
          // data.append('qty', this.state.quantity);
          // data.append('description', this.state.description);
          // data.append('price', this.state.price);
          

          const d = {
            itemName: this.state.itemName,
            mainCategory: this.state.mainCategory,
            subCategory: this.state.subCategory,
            size: this.state.size,
            qty:this.state.quantity,
            description:this.state.description,
            price:this.state.price
          }

          updateItemDetails(this.props._id,d)
        
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
           <Form onSubmit={this.handleSubmit} encType="multipart/form-data" defaultValue={this.props._id}>
              <br/>
              <Form.Group controlId="formImagePreview">
                <Col xs={8} md={6}>
                <Image src={this.state.img} alt='' />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Control type="file" name="file" onChange={this.onFileChange}  placeholder="Enter description" />
              </Form.Group>
              <Form.Group controlId="formItemName">
                <Form.Label></Form.Label>
                  <Form.Control type="text" name="itemName" onChange={this.onItemNameChange} placeholder="Enter Item Name" defaultValue={this.props.itemname} />
              </Form.Group>
              <Form.Group controlId="formMainCategory">
                <Form.Label>Main Category</Form.Label>
                  <Form.Control as="select" onChange={this.onMainCategoryChange} defaultValue={this.props.maincategory}>
                    <option>Select Main Category</option>
                  {this.state.mainCategories.map(mainCategory => {
                            return <option key={mainCategory._id}>{mainCategory.mainCategoryName}</option>
                        })}
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="formSubCategory">
                <Form.Label>Sub Category</Form.Label>
                  <Form.Control as="select" onChange={this.onSubCategoryChange} defaultValue={this.props.subcategory}>
                    <option>Select Sub Category</option>
                  {this.state.subCategories.map(subCategory => {
                            return <option key={subCategory._id}>{subCategory.subCategoryName}</option>
                        })}
                  </Form.Control>
              </Form.Group>
              {['checkbox'].map((type) => (
                <div key={`custom-inline-${type}`} className="mb-3" checked={this.state.size} onChange={this.onSizeChange} defaultValue={this.props.size}>
                  <Form.Check
                    custom
                    inline
                    labe="XS"
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
                  <Form.Control type="number"  name="quantity" onChange={this.onQuantityChange} placeholder="" defaultValue={this.props.qty}/>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" rows="3" onChange={this.onDescriptionChange} defaultValue={this.props.description}/>
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price(Rs)</Form.Label>
                  <Form.Control type="number"  name="price" onChange={this.onPriceChange} placeholder="Rs.xxxx" defaultValue={this.props.price}/>
              </Form.Group>
              <Modal.Footer>
                <Button variant="success" type="submit">Save</Button>
                {/* <Button variant="danger" >Close</Button> */}
              </Modal.Footer>
          </Form>
          </Container>
      </Modal.Body>
    </Modal>
        )
    }
}
