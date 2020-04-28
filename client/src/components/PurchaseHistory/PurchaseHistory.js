import React, { Component } from 'react'
import{ Table,Container } from 'react-bootstrap'
import{ Card } from 'react-bootstrap'
import PurchaseHistoryListItem from './PuchaseHistoryListItem'
import Navbar from '../../components/Navbar'

export default class PurchaseHistory extends Component {
    render() {
        return (
            <>
            <Navbar/>
            <Container>

            <Card border="primary"  header><center><h1>Payment History</h1></center></Card>

            <Table striped bordered hover size="sm">
                    <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                    </thead>
                            <tbody>
                            <PurchaseHistoryListItem/> 
                          </tbody>
               </Table>

               </Container>
               </>
        )
    }
}
