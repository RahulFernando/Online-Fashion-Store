import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import PaymentRecieptItem from './PaymentRecieptItem'
import {DisplayReciept} from '../../service/function'
import {Table,Card} from 'react-bootstrap'


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
                
            <Card border="primary"  header><center><h1>Reciept</h1></center></Card>

                <ul>
                        <li><b>Payment ID :-</b> {this.state.PaymentId}</li>
                        <li><b>Payment Method :-</b>{this.state.PaymentMethod}</li>
                </ul>  

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
