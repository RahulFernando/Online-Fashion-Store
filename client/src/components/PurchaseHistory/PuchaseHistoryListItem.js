import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class PuchaseHistoryListItem extends Component {
    render() {
        const {HistoryDetail} = this.props
        return (
            <tr>
            <td>{HistoryDetail._id}</td>
            <td>{HistoryDetail.paymentMethod}</td>
            <td>{new Date(HistoryDetail.date).toDateString()}</td>
            <td> <Link to={"/displayReciept/"+HistoryDetail._id}> Display Receipt</Link> </td>
            </tr>
            
        )
    }
}
