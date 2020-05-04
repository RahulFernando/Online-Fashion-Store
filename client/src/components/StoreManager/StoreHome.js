import React, { Component } from 'react'
import { Container, Table, ButtonGroup, Button, Col, Image } from "react-bootstrap";
import {getMenDetails, getWomenDetails, getKidsDetails} from '../../service/function'
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

    const {_id1, itemName1, mainCategory1, subCategory1, size1, qty1, description1, price1} = this.state;

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
                <Button variant="success" onClick={() => this.setState({addModalShow: true, _id1:men._id, itemName1:men.itemName, 
                  mainCategory1:men.mainCategory, subCategory1:men.subCategory, size1:men.size, qty1:men.qty, 
                  description1:men.description, price1:men.price}) }>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  _id1 = {_id1}
                  itemName1 = {itemName1}
                  mainCategory1 = {mainCategory1}
                  subCategory1 = {subCategory1}
                  size1 = {size1}
                  qty1 = {qty1}
                  description1 = {description1}
                  price1 = {price1}
                  />
                <Button variant="danger"><i className="fas fa-trash"></i></Button>
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
                <Button variant="success" onClick={() => this.setState({addModalShow: true, _id1:women._id, itemName1:women.itemName, 
                  mainCategory1:women.mainCategory, subCategory1:women.subCategory, size1:women.size, qty1:women.qty, 
                  description1:women.description, price1:women.price}) }>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  _id1 = {_id1}
                  itemName1 = {itemName1}
                  mainCategory1 = {mainCategory1}
                  subCategory1 = {subCategory1}
                  size1 = {size1}
                  qty1 = {qty1}
                  description1 = {description1}
                  price1 = {price1}
                  />
                <Button variant="danger"><i className="fas fa-trash"></i></Button>
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
                <Button variant="success" onClick={() => this.setState({addModalShow: true, _id1:kids._id, itemName1:kids.itemName, 
                  mainCategory1:kids.mainCategory, subCategory1:kids.subCategory, size1:kids.size, qty1:kids.qty, 
                  description1:kids.description, price1:kids.price}) }>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  _id1 = {_id1}
                  itemName1 = {itemName1}
                  mainCategory1 = {mainCategory1}
                  subCategory1 = {subCategory1}
                  size1 = {size1}
                  qty1 = {qty1}
                  description1 = {description1}
                  price1 = {price1}
                  />
                <Button variant="danger"><i className="fas fa-trash"></i></Button>
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
