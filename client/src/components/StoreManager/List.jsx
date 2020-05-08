import React, { Component } from 'react'
import {getWomenDetails} from '../../service/function'
import { Container, Table, ButtonGroup, Button } from 'react-bootstrap'
import EditItem from './EditItem'

export default class List extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            women: [],
            requiredItem: '',
            addModalShow: false,
        }
        
        this.replaceModalItem = this.replaceModalItem.bind(this);
    }

    componentDidMount() {
        getWomenDetails().then(res => {
            console.log(res)
            this.setState({
                women: res.data.women
            })
        })
    }

    replaceModalItem = () => {
        this.setState({
            addModalShow: true
        })
    }

    addModalClose = () => {

        this.setState({
          addModalShow:false
        })
    
      }
    
    render() {    
        return (
            <Container>
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
                                <Button variant="success" onClick={() => this.setState({addModalShow: true})} >
                                <i className="fas fa-pen"></i>
                                </Button></ButtonGroup></td>
                                <EditItem show={this.state.addModalShow} onHide={this.addModalClose}
                                    id={item._id}
                                    itemName={item.itemName}
                                />
                           </tr>
                        })}
                    </tbody>
                </Table>
            </Container>      
        )
    }    
}
