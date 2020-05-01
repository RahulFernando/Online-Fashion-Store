import React, { Component } from 'react'
import {FindItem} from '../../service/function'

export default class MybagItem extends Component {

    constructor(props){
        super(props);

        this.getItemDetails = this.getItemDetails.bind(this);

        this.state ={
            name : "",
            unitPrice: 0
        }
    }

    getItemDetails(id) {
        FindItem(id)
        .then(response =>{
        this.setState({
              
            name: response.data.itemName,
            unitPrice:response.data.price
              
          })
        })
      .catch(function(error){
          console.log(error);
      })
    }

    render() {
        const {cartItem} = this.props
        return (
           
                <tr>
                    {this.getItemDetails(cartItem.id)}
                    <td></td>
                    <td>{this.state.name}</td>
                    <td>{this.state.unitPrice}</td>
                    <td>{cartItem.quantity}</td>
                    <td>{this.state.unitPrice * cartItem.quantity}</td>
                    <td><span className="mx-2 text-danger"><i className="fa fa-trash"></i></span></td>
                 </tr>
        )
           
        
    }
}
