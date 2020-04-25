import React, { Component } from 'react'
import{ Table,Container } from 'react-bootstrap'
import{ Card } from 'react-bootstrap'
import MybagItem from './MybagItem'




export default class Mybag extends Component {
    render() {
        return (

        <Container>

                <Card border="primary"  header><center><h1>My Cart</h1></center></Card>

                <Table striped bordered hover size="sm">
                        <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                        </thead>
                                <tbody>
                                <MybagItem/>
                              </tbody>
                   </Table>

                   </Container>


          
        )
    }
}

