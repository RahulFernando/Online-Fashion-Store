import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import PaymentRecieptItem from './PaymentRecieptItem'
import {DisplayReciept} from '../../service/function'
import {Table} from 'react-bootstrap'

export default class PaymentReciept extends Component {

    constructor(props){
        super(props);


        this.state = {

            PaymentId:'',
            PaymentMethod:'',
            Items: []

        };
    }

    componentDidMount() {

        DisplayReciept(this.props.match.params.id)
        .then(response => {
            this.setState({
                PaymentId: response.data._id,
                PaymentMethod: response.data.paymentMethod,
                Items: response.data.purchasedItems
        
            })
        })
        .catch(function(error){
            console.log(error);
        })
    }

    DisplayRecieptItems(){


        return this.state.Items.map(recieptItem => {
            return <PaymentRecieptItem recieptItem={recieptItem} />;
          })
                
    }
    

    render() {
        return (
            <>
            <Container>
            <Table striped bordered hover size="sm">
                        <thead>
                                <tr>
                                    <th>Item ID</th>
                                    <th>quantity</th>
                                </tr>
                        </thead>
                                <tbody>
                                {this.DisplayRecieptItems()}
                              </tbody>
                   </Table>

               
            </Container>
            </>
        )
    }
}
