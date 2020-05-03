import React, { Component } from 'react'
import { Container, Table, ButtonGroup, Button } from "react-bootstrap";
import {getMenDetails, getWomenDetails, getKidsDetails} from '../../service/function'

export default class StoreHome extends Component {

  constructor(props) {
    super(props)

    this.state = {
    
        menItems: [],
        womenItems: [],
        kidsItems: [],
    }
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

  render() {
    return (
      <>
      {/* Men */}
      <Container>
      <h5 className="text-secondary">Men</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>Image</th> */}
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
            {/* <td>{men.image}</td> */}
            <td>{men.itemName}</td>
            <td>{men.mainCategory}</td>
            <td>{men.subCategory}</td>
            <td>{men.size}</td>
            <td>{men.qty}</td>
            <td>{men.description}</td>
            <td>{`Rs.${men.price}`}</td>
            <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success"><i className="fas fa-edit"></i></Button>
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
            {/* <th>Image</th> */}
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
            {/* <td>{women.image}</td> */}
              <td>{women.itemName}</td>
              <td>{women.mainCategory}</td>
              <td>{women.subCategory}</td>
              <td>{women.size}</td>
              <td>{women.qty}</td>
              <td>{women.description}</td>
              <td>{`Rs.${women.price}`}</td>
              <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success">Edit</Button>
                <Button variant="danger">Delete</Button>
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
            {/* <th>Image</th> */}
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
            {/* <td>{kids.image}</td> */}
              <td>{kids.itemName}</td>
              <td>{kids.mainCategory}</td>
              <td>{kids.subCategory}</td>
              <td>{kids.size}</td>
              <td>{kids.qty}</td>
              <td>{kids.description}</td>
              <td>{`Rs.${kids.price}`}</td>
              <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success">Edit</Button>
                <Button variant="danger">Delete</Button>
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
