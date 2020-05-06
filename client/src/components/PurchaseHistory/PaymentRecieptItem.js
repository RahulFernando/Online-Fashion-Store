import React, { Component } from 'react'
import {Container} from 'react-bootstrap'

export default class PaymentRecieptItem extends Component {
    render() {

        const{recieptItem} = this.props
        return (
            <>
             <tr>
                   
                    <td>{recieptItem.itemname}</td>
                    <td>{recieptItem.price}</td>
                    <td>{recieptItem.quantity}</td>
                    <td>{recieptItem.quantity * recieptItem.price}</td>
                    
                 </tr>
            </>
        )
    }
}
