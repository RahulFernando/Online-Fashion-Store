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
        selected: [],
        requiredItem: '',
        addModalShow: false,
    }

    this.replaceModalItem = this.replaceModalItem.bind(this);
}

arrayBufferToBase64(buffer) {

  var base64Flag = 'data:image/jpeg;base64,';
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return base64Flag + window.btoa(binary);
};

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

  replaceModalItem = (index, type) => {
    if (type === 'men') {
        this.setState({
            addModalShow: true,
            selected: this.state.menItems[index]
        })
    } else if(type === 'women') {
        this.setState({
            addModalShow: true,
            selected: this.state.womenItems[index]
        })
    } else {
        this.setState({
            addModalShow: true,
            selected: this.state.kidsItems[index]
        })
    }

}


  addModalClose = () => {

    this.setState({
      addModalShow:false
    })

  }

  handleDelete = (_id) => {
    if (window.confirm("Do you need to remove this item?")) {
        deleteItemDetails(_id).then(res => {
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
      
        });
    }
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
            <th>Image</th>
            <th>Item Name</th>
            <th>Main Category</th>
            <th>Sub Category</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Description</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
        {this.state.menItems.map((men, index) => {
          return <tr key={index}>
            <td><Col xs={14} md={12}>
                <Image src={this.arrayBufferToBase64(men.image.data.data)} alt='' />
                </Col>
            </td>
            <td>{men.itemName}</td>
            <td>{men.mainCategory}</td>
            <td>{men.subCategory}</td>
            <td>{men.size}</td>
            <td>{men.qty}</td>
            <td>{men.description}</td>
            <td>{`Rs.${men.price}`}</td>
            <td>{`${men.discount}%`}</td>
            <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success" onClick={() => this.replaceModalItem(index, 'men')}>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  selected={this.state.selected}/>
                <Button onClick={() => this.handleDelete(men._id)} variant="danger"><i className="fas fa-trash"></i></Button>
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
            <th>Discount</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {this.state.womenItems.map((women, index) => {
          return <tr key={index}>
              <td><Col xs={14} md={12}>
                <Image src={this.arrayBufferToBase64(women.image.data.data)} alt='' />
                </Col>
              </td>
              <td>{women.itemName}</td>
              <td>{women.mainCategory}</td>
              <td>{women.subCategory}</td>
              <td>{women.size}</td>
              <td>{women.qty}</td>
              <td>{women.description}</td>
              <td>{`Rs.${women.price}`}</td>
              <td>{`${women.discount}%`}</td>
              <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success" onClick={() => this.replaceModalItem(index, 'women')}>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  selected={this.state.selected}/>
                <Button onClick={() => this.handleDelete(women._id)} variant="danger"><i className="fas fa-trash"></i></Button>
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
            <th>Discount</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {this.state.kidsItems.map((kids, index) => {
          return <tr key={index}>
              <td><Col xs={14} md={12}>
                <Image src={this.arrayBufferToBase64(kids.image.data.data)} alt='' />
                </Col>
              </td>
              <td>{kids.itemName}</td>
              <td>{kids.mainCategory}</td>
              <td>{kids.subCategory}</td>
              <td>{kids.size}</td>
              <td>{kids.qty}</td>
              <td>{kids.description}</td>
              <td>{`Rs.${kids.price}`}</td>
              <td>{`${kids.discount}%`}</td>
              <td><ButtonGroup aria-label="Basic example" size="sm">
                <Button variant="success" onClick={() => this.replaceModalItem(index, '')}>
                  <i className="fas fa-pen"></i>
                  </Button>
                  <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                  selected={this.state.selected}/>
                <Button onClick={() => this.handleDelete(kids._id)} variant="danger"><i className="fas fa-trash"></i></Button>
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
