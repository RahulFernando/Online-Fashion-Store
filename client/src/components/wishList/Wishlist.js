import React, { Component } from 'react'
import{ Table,Container } from 'react-bootstrap'
import{ Card } from 'react-bootstrap'
import WishListItem from './WishlistItem';

export default class Wishlist extends Component {
    render() {
        return (
            <Container>

            <Card border="primary"  header><center><h1>Wish List</h1></center></Card>

            <Table striped bordered hover size="sm">
                    <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                    </thead>
                            <tbody>
                            <WishListItem/>
                          </tbody>
               </Table>

               </Container>
        )
    }
}
