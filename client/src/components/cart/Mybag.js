import React, { Component } from 'react'
import{ Table,Container } from 'react-bootstrap'
import{ Card } from 'react-bootstrap'
import MybagItem from './MybagItem'
import Navbar from '../../components/Navbar'
import Payment from './Payment'
import{ Button } from 'react-bootstrap'


import {getUserId} from '../../service/function'
import {DisplayCart} from '../../service/function'




export default class Mybag extends Component {

    constructor(props){
        super(props);

        this.changePaymentState = this.changePaymentState.bind(this);

        this.state = {

            payment : false,
            userID:'',
            Items: []

        };
    }

    componentDidMount(){
        
        this.state.userID = getUserId();
        console.log(this.state.userID);
        
        DisplayCart(this.state.userID)
        .then(res => {
            this.setState({
                Items: res.data.Cart
               
            })
        })
            .catch(function(error){
           
                console.log(error);
            })
    
        
   
}

    changePaymentState(){

        this.setState({
            payment: true
        });
    }

    cartItemList() {

        return this.state.Items.map(cartListItem => {
            return <MybagItem cartItem={cartListItem} />;
          })
    }

    render() {
        return (

            <>
            <Navbar/>

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
                                {this.cartItemList()}
                              </tbody>
                   </Table>

                <Button onClick={this.changePaymentState}>Proceed</Button>

                {this.state.payment ? <Payment/> : ""}
                   
                   </Container>


          </>
        )
    }
}

