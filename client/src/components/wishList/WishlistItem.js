import React, { Component } from 'react'
import {FindItem} from '../../service/function'
import {FaShoppingBag} from 'react-icons/fa'

export default class WishlistItem extends Component {

    constructor(props){
        super(props);

        this.getItemDetails = this.getItemDetails.bind(this);

        this.state ={
            name : "",
        }
    }

    getItemDetails(id) {
        FindItem(id)
        .then(response =>{
            if(this.state.name){
                return;
            }
        this.setState({
              
            name: response.data.itemName
              
          })
        })
      .catch(function(error){
          console.log(error);
      })
    }

    
    
    render() {
        const {wishedItem,deleteItem,userID,addToCart} = this.props
        return (
            <tr>
             {this.getItemDetails(wishedItem.id)}
            <td></td>
            <td>{this.state.name}</td>
            <td><span className="mx-2 text-danger" onClick={() => {deleteItem(userID,wishedItem.id) }}><i className="fa fa-trash"></i></span></td>
            <td>
            <center>
            <button type="button" className="btn-success" onClick={() => {addToCart(userID,wishedItem.id) }}>
                   Add to Cart <FaShoppingBag/>
            </button>
            </center>
            </td>
         </tr>
        )
    }
}
