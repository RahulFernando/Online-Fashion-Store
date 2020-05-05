import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import PaymentRecieptItem from './PaymentRecieptItem'
import {DisplayReciept} from '../../service/function'
import {Table,Card} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default class PaymentReciept extends Component {

    constructor(props){
        super(props);


        this.state = {

            PaymentId:'',
            PaymentMethod:'',
            Items: [],
            Total:0,

        };
    }

    componentDidMount() {

        DisplayReciept(this.props.match.params.id)
        .then(response => {
            this.setState({
                PaymentId: response.data._id,
                PaymentMethod: response.data.paymentMethod,
                Items: response.data.purchasedItems,
        
            })
            this.state.Items.forEach((item) => {
                
                    this.setState({
                        Total : this.state.Total + (item.price*item.quantity)
                    })
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
            
            <Card border="primary"  header><center><h2>Reciept</h2></center></Card>

                <ul>
                        <li><b>Payment ID :-</b> {this.state.PaymentId}</li>
                        <li><b>Payment Method :-</b>{this.state.PaymentMethod}</li>
                </ul>  

            <Table striped bordered hover size="sm">
                        <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                        </thead>
                                <tbody>
                                {this.DisplayRecieptItems()}
                              </tbody>
                   </Table>
                    { `Total Price : Rs.${this.state.Total}` }
                    <br/>
                   <Link to={"/purchasehistory"}> <Button > Go back </Button></Link>
               
     
            </Container>
            </>
        )
    }
}