import React, { Component } from 'react'
import { Container, Table, ButtonGroup, Button, Col, Image } from "react-bootstrap";
import {getMenDetails, getWomenDetails, getKidsDetails, deleteItemDetails} from '../../service/function'
import EditItem from './EditItem'

export default class StoreHome extends Component {

  constructor(props) {
    super(props)

    this.state = {
    
        menItems: [], 
        womenItems: [],
        kidsItems: [],
        addModalShow: false,
    }

    this.addModalClose = this.addModalClose.bind(this)
}

  componentDidMount = () => {
        
    getMenDetails()
    .then(res => {
      this.setState({
          menItems: res.data.men,
      })

    })
  .catch (() => {
      alert('Error retreving data')
  })

    getWomenDetails()
    .then(res => {
      this.setState({
          womenItems: res.data.women,
      })

    })
  .catch (() => {
      alert('Error retreving data')
  })

    getKidsDetails()
    .then(res => {
      this.setState({
          kidsItems: res.data.kids,
      })

    })
  .catch (() => {
      alert('Error retreving data')
  })

  }

  addModalClose = () => {

    this.setState({
      addModalShow:false
    })

  }

  render() {

    const {_id, itemname, maincategory, subcategory, size, qty, description, price} = this.state;

    return (
      <>
      {/* Men */}
      <Container>
      <h5 className="text-secondary">Men</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Main Category</th>
            <th>Sub Category</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Description</th>
            <th>Price</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
        {this.state.menItems.map(men => {
          return <tr key={men._id}>
            <td><Col xs={6} md={4}>
                <Image src={men.image} alt='' />
                </Col>
            </td>
            <td>{men.itemName}</td>
            <td>{men.mainCategory}</td>
            <td>{men.subCategory}</td>
            <td>{men.size}</td>
            <td>{men.qty}</td>
            <td>{men.description}</td>
            <td>{`Rs.${men.price}`}</td>
            <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success" onClick={() => this.setState({addModalShow: true, _id:men._id, itemname:men.itemName, 
                  maincategory:men.mainCategory, subcategory:men.subCategory, size:men.size, qty:men.qty, 
                  description:men.description, price:men.price}) }>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  _id = {_id}
                  itemname = {itemname}
                  maincategory = {maincategory}
                  subcategory = {subcategory}
                  size = {size}
                  qty = {qty}
                  description = {description}
                  price = {price}
                  />
                <Button onClick={() => deleteItemDetails(men._id)} variant="danger"><i className="fas fa-trash"></i></Button>
                </ButtonGroup>
            </td>
          </tr>
          })}
        </tbody>
      </Table>
      </Container>
      
      {/* Women */}
      <Container>
      <h5 className="text-secondary">Women</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Main Category</th>
            <th>Sub Category</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Description</th>
            <th>Price</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {this.state.womenItems.map(women => {
          return <tr key={women._id}>
              <td><Col xs={6} md={4}>
                <Image src={women.image} alt='' />
                </Col>
              </td>
              <td>{women.itemName}</td>
              <td>{women.mainCategory}</td>
              <td>{women.subCategory}</td>
              <td>{women.size}</td>
              <td>{women.qty}</td>
              <td>{women.description}</td>
              <td>{`Rs.${women.price}`}</td>
              <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success" onClick={() => this.setState({addModalShow: true, _id:women._id, itemname:women.itemName, 
                  maincategory:women.mainCategory, subcategory:women.subCategory, size:women.size, qty:women.qty, 
                  description:women.description, price:women.price}) }>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  _id = {_id}
                  itemname = {itemname}
                  maincategory = {maincategory}
                  subcategory = {subcategory}
                  size = {size}
                  qty = {qty}
                  description = {description}
                  price = {price}
                  />
                <Button onClick={() => deleteItemDetails(women._id)} variant="danger"><i className="fas fa-trash"></i></Button>
                </ButtonGroup>
            </td>
          </tr>
          })}
        </tbody>
      </Table>
      </Container>
      
      {/* Kids */}
      <Container>
      <h5 className="text-secondary">Kids</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Main Category</th>
            <th>Sub Category</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Description</th>
            <th>Price</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {this.state.kidsItems.map(kids => {
          return <tr key={kids._id}>
              <td><Col xs={6} md={4}>
                <Image src={kids.image} alt='' />
                </Col>
              </td>
              <td>{kids.itemName}</td>
              <td>{kids.mainCategory}</td>
              <td>{kids.subCategory}</td>
              <td>{kids.size}</td>
              <td>{kids.qty}</td>
              <td>{kids.description}</td>
              <td>{`Rs.${kids.price}`}</td>
              <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success" onClick={() => this.setState({addModalShow: true, _id:kids._id, itemname:kids.itemName, 
                  maincategory:kids.mainCategory, subcategory:kids.subCategory, size:kids.size, qty:kids.qty, 
                  description:kids.description, price:kids.price}) }>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  _id = {_id}
                  itemname = {itemname}
                  maincategory = {maincategory}
                  subcategory = {subcategory}
                  size = {size}
                  qty = {qty}
                  description = {description}
                  price = {price}
                  />
                <Button onClick={() => deleteItemDetails(kids._id)} variant="danger"><i className="fas fa-trash"></i></Button>
                </ButtonGroup>
            </td>
          </tr>
          })}
        </tbody>
      </Table>
      </Container>
    </>  
    )
  }
}
