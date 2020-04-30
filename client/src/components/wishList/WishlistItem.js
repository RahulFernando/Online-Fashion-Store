import React, { Component } from 'react'

export default class WishlistItem extends Component {

    constructor(props){
        super(props);

        this.getItemDetails = this.getItemDetails.bind(this);

        this.state ={
            name : "",
        }
    }

    getItemDetails(id) {

    }

    
    
    render() {
        const {wishedItem,deleteItem,userID} = this.props
        return (
            <tr>
             {this.getItemDetails(wishedItem.id)}
            <td>{wishedItem.id}</td>
            <td>Long Sleeve tshirt</td>
            <td><span className="mx-2 text-danger" onClick={() => {deleteItem(userID,wishedItem.id) }}><i className="fa fa-trash"></i></span></td>
         </tr>
        )
    }
}
