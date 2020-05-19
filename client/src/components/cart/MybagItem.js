import React, { Component } from 'react'
import {FindItem} from '../../service/function'
import {Button} from 'react-bootstrap'

export default class MybagItem extends Component {

    constructor(props){
        super(props);

        this.getItemDetails = this.getItemDetails.bind(this);

        this.state ={
            name : "",
            unitPrice: 0,
            img: '',
            id:'',
            discount:0
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
            unitPrice:response.data.price,
            id:response.data._id,
            img: base64Flag + imageStr,
            discount:response.data.discount
              
          })
        })
      .catch(function(error){
          console.log(error);
    })
    }

    render() {
        const {cartItem,deleteItem,userId,decreaseCartQty} = this.props
        return (
           
                <tr>
                    {this.getItemDetails(cartItem.id)}
                    <td>

                    <img src={this.state.img} style={{width:50 ,height :50}} />
                   
                    </td>
                    <td>{this.state.name}</td>
                    <td>{this.state.unitPrice.toFixed(2)}</td>
                    <td>{`${this.state.discount}%`}</td>
                    <td>{(this.state.unitPrice*(100-this.state.discount)/100).toFixed(2)}</td>
                    <td>{cartItem.quantity} <span  style={{"marginLeft": 5}} className="mx-2 text-primary" onClick={() => {decreaseCartQty(userId,cartItem.id,cartItem.quantity) }}><i className="fa fa-arrow-down"></i></span></td>
                    <td>{((this.state.unitPrice*(100-this.state.discount)/100)* cartItem.quantity).toFixed(2)}</td>
                    <td><span  className="mx-2 text-danger" onClick={() => {deleteItem(userId,cartItem.id,cartItem.quantity) }}><i className="fa fa-trash"></i></span></td>
                 </tr>

        )
           
        
    }
}
