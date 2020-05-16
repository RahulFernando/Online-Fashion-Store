import React, { Component } from 'react'
import {Container} from 'react-bootstrap'

export default class PaymentRecieptItem extends Component {
    render() {

        const{recieptItem} = this.props
        return (
            <>
             <tr>
                   
                    <td>{recieptItem.itemname}</td>
                    <td>{recieptItem.price.toFixed(2)}</td>
                    <td>{`${recieptItem.discount}%`}</td>
                    <td>{(recieptItem.price*(100-recieptItem.discount)/100).toFixed(2)}</td>
                    <td>{recieptItem.quantity}</td>
                    <td>{(recieptItem.quantity * (recieptItem.price*(100-recieptItem.discount)/100)).toFixed(2)}</td>
                    
                 </tr>
            </>
        )
    }
}
