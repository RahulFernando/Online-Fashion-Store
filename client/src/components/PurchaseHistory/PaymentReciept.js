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
            date: '',
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
                date:response.data.date,
                Items: response.data.purchasedItems,
        
            })
            this.state.Items.forEach((item) => {
                
                    this.setState({
                        Total : this.state.Total + ((item.price*(100-item.discount)/100)*item.quantity)
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
            
            <Card border="primary" style={{"marginTop": 60}}>
                
            <Card.Header><center><h2><u>Receipt</u></h2></center></Card.Header>


            <Card.Body>
                <ul style={{listStyleType:"none"}}>
                        <li><b>Payment ID :-</b> {this.state.PaymentId}</li>
                        <li><b>Payment Method :-</b>{this.state.PaymentMethod}</li>
                        <li><b>Payment Date :-</b>{new Date(this.state.date).toDateString()}</li>
                        
                </ul>  

            <Table bordered hover >
                        <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Unit Price</th>
                                    <th>Discount</th>
                                    <th>Discounted Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                        </thead>
                                <tbody>
                                {this.DisplayRecieptItems()}
                              </tbody>
                   </Table>

                   </Card.Body>

                   <Card.Footer> <b> { `Total Price : Rs.${this.state.Total.toFixed(2)}` }</b></Card.Footer>
                  
                   
                    </Card>
                    <br/>
                   <Link to={"/purchasehistory"}> <Button > Go back </Button></Link>
               
     
            </Container>
            </>
        )
    }
}
