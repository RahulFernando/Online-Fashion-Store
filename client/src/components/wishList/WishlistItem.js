import React, { Component } from 'react'
import {FindItem} from '../../service/function'
import {FaShoppingBag} from 'react-icons/fa'

export default class WishlistItem extends Component {

    constructor(props){
        super(props);

        this.getItemDetails = this.getItemDetails.bind(this);

        this.state ={
            name : "",
            id:""
        }
    }


    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };


    getItemDetails(id) {
        FindItem(id)
        .then(response =>{

            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(response.data.image.data.data);

            if(this.state.id === id){
                return;
            }
        this.setState({
              
            name: response.data.itemName,
            id:response.data._id,
            img: base64Flag + imageStr
              
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
            <td> <img src={this.state.img} style={{width:50 ,height :50}} /></td>
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
