import React, { Component } from 'react'
import {getWomenDetails, getMenDetails, getKidsDetails} from '../../service/function'
import { Container, Table, ButtonGroup, Button } from 'react-bootstrap'
import EditItem from './EditItem'

export default class List extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            women: [],
            men: [],
            kids: [],
            selected: [],
            requiredItem: '',
            addModalShow: false,
            itemname: ''
        }
        
        this.replaceModalItem = this.replaceModalItem.bind(this);
    }

    componentDidMount() {
        getWomenDetails().then(res => {
            this.setState({
                women: res.data.women
            })
        })
        getMenDetails().then(res => {
            this.setState({
                men: res.data.men
            })
        })
        getKidsDetails().then(res => {
            this.setState({
                kids: res.data.kids
            })
        })
    }

    replaceModalItem = (index, type) => {
        if (type === 'women') {
            this.setState({
                addModalShow: true,
                selected: this.state.women[index]
            })
        } else if(type === 'men') {
            this.setState({
                addModalShow: true,
                selected: this.state.men[index]
            })
        } else {
            this.setState({
                addModalShow: true,
                selected: this.state.kids[index]
            })
        }

    }

    addModalClose = () => {

        this.setState({
          addModalShow:false
        })
    
      }
    
    render() {    
        return (
            <Container>
                <h5 className="text-secondary">Women</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Item Name</th>
                        <th>Main Category</th>
                        <th>Sub Category</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Description</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.women.map((item, index) => {
                           return <tr key={index}> 
                                <td>{item.itemName}</td>
                                <td>{item.mainCategory}</td>
                                <td>{item.subCategory}</td>
                                <td>{item.size}</td>
                                <td>{item.qty}</td>
                                <td>{item.description}</td>
                                <td>{`Rs.${item.price}`}</td>
                                <td><ButtonGroup aria-label="Basic example" size="sm">
                                <Button variant="success" onClick={() => this.replaceModalItem(index, 'women')} >
                                <i className="fas fa-pen"></i>
                                </Button></ButtonGroup></td>
                                <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                                    selected={this.state.selected}
                                />
                           </tr>
                        })}
                    </tbody>
                </Table>

                <h5 className="text-secondary">Men</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Item Name</th>
                        <th>Main Category</th>
                        <th>Sub Category</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Description</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.men.map((item, index) => {
                           return <tr key={index}> 
                                <td>{item.itemName}</td>
                                <td>{item.mainCategory}</td>
                                <td>{item.subCategory}</td>
                                <td>{item.size}</td>
                                <td>{item.qty}</td>
                                <td>{item.description}</td>
                                <td>{`Rs.${item.price}`}</td>
                                <td><ButtonGroup aria-label="Basic example" size="sm">
                                <Button variant="success" onClick={() => this.replaceModalItem(index, 'men')} >
                                <i className="fas fa-pen"></i>
                                </Button></ButtonGroup></td>
                                <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                                    selected={this.state.selected}
                                />
                           </tr>
                        })}
                    </tbody>
                </Table>

                <h5 className="text-secondary">Kid</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Item Name</th>
                        <th>Main Category</th>
                        <th>Sub Category</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Description</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.kids.map((item, index) => {
                           return <tr key={index}> 
                                <td>{item.itemName}</td>
                                <td>{item.mainCategory}</td>
                                <td>{item.subCategory}</td>
                                <td>{item.size}</td>
                                <td>{item.qty}</td>
                                <td>{item.description}</td>
                                <td>{`Rs.${item.price}`}</td>
                                <td><ButtonGroup aria-label="Basic example" size="sm">
                                <Button variant="success" onClick={() => this.replaceModalItem(index, 'men')} >
                                <i className="fas fa-pen"></i>
                                </Button></ButtonGroup></td>
                                <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                                    selected={this.state.selected}
                                />
                           </tr>
                        })}
                    </tbody>
                </Table>
            </Container>      
        )
    }    
}
