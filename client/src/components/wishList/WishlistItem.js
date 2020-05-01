import React, { Component } from 'react'
import {FindItem} from '../../service/function'

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
        this.setState({
              
            name: response.data.itemName
              
          })
        })
      .catch(function(error){
          console.log(error);
      })
    }

    
    
    render() {
        const {wishedItem,deleteItem,userID} = this.props
        return (
            <tr>
             {this.getItemDetails(wishedItem.id)}
            <td></td>
            <td>{this.state.name}</td>
            <td><span className="mx-2 text-danger" onClick={() => {deleteItem(userID,wishedItem.id) }}><i className="fa fa-trash"></i></span></td>
         </tr>
        )
    }
}
