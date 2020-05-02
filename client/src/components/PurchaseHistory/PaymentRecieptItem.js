import React, { Component } from 'react'
import {Container} from 'react-bootstrap'

export default class PaymentRecieptItem extends Component {
    render() {

        const{recieptItem} = this.props
        return (
            <>
             <tr>
                   
                    <td>{recieptItem.id}</td>
                    <td>{recieptItem.quantity}</td>
                    
                 </tr>
            </>
        )
    }
}
