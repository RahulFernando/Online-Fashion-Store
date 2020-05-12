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
                    <td>{`${recieptItem.discount}%`}</td>
                    <td>{recieptItem.price*(100-recieptItem.discount)/100}</td>
                    <td>{recieptItem.quantity}</td>
                    <td>{recieptItem.quantity * (recieptItem.price*(100-recieptItem.discount)/100)}</td>
                    
                 </tr>
            </>
        )
    }
}
