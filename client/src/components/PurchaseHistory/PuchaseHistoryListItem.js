import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class PuchaseHistoryListItem extends Component {
    render() {
        return (
            <tr>
            <td>506894984</td>
            <td>Pay by Cash</td>
            <td>2019/08/23</td>
            <td> <Link to={"/"}> Display Reciept</Link> </td>
         </tr>
        )
    }
}
