import React, { Component } from 'react'
import {FindItem} from '../../service/function'
import {Row,Col,Image} from 'react-bootstrap'

export default class MybagItem extends Component {

    constructor(props){
        super(props);

        this.getItemDetails = this.getItemDetails.bind(this);

        this.state ={
            name : "",
            unitPrice: 0,
            img: '',
            id:''
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
            img: base64Flag + imageStr
              
          })
        })
      .catch(function(error){
          console.log(error);
    })
    }

    render() {
        const {cartItem,deleteItem,userId} = this.props
        return (
           
                <tr>
                    {this.getItemDetails(cartItem.id)}
                    <td>

                    <img src={this.state.img} style={{width:50 ,height :50}} />
                   
                    </td>
                    <td>{this.state.name}</td>
                    <td>{this.state.unitPrice}</td>
                    <td>{cartItem.quantity}</td>
                    <td>{this.state.unitPrice * cartItem.quantity}</td>
                    <td><span  className="mx-2 text-danger" onClick={() => {deleteItem(userId,cartItem.id,cartItem.quantity) }}><i className="fa fa-trash"></i></span></td>
                 </tr>

        )
           
        
    }
}
