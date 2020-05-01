import React, { Component } from 'react'
import{ Table,Container } from 'react-bootstrap'
import{ Card } from 'react-bootstrap'
import MybagItem from './MybagItem'
import Navbar from '../../components/Navbar'
import Payment from './Payment'
import{ Button } from 'react-bootstrap'


import {getUserId} from '../../service/function'
import {DisplayCart} from '../../service/function'
import {FindItem} from '../../service/function'
import {DeleteCartListItem} from '../../service/function'
import {QuantityIncrement} from '../../service/function'




export default class Mybag extends Component {

    constructor(props){
        super(props);

        this.changePaymentState = this.changePaymentState.bind(this);
        this.deleteCartItem = this.deleteCartItem.bind(this);
      

        this.state = {

            payment : false,
            userID:'',
            Items: [],
            Total:0,
            price:0

        };
    }

    componentDidMount(){
        
        this.state.userID = getUserId();
        console.log(this.state.userID);
        
        DisplayCart(this.state.userID)
        .then(res => {
            console.log(res.data.Cart)
            this.setState({
                Items: res.data.Cart
               
            })

        this.state.Items.forEach((item) => {
            FindItem(item.id)
            .then(response =>{
                this.setState({
                    Total : this.state.Total + (response.data.price*item.quantity)
                });
            })
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
            return <MybagItem cartItem={cartListItem} deleteItem={this.deleteCartItem} userId={this.state.userID}/>;
          })
    }


    deleteCartItem(userId,itemId,quantity){

        DeleteCartListItem(userId,itemId);

        this.setState({
            Items: this.state.Items.filter(item => item.id !== itemId)
          })

          QuantityIncrement(itemId,quantity)

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

                   {`Rs.${this.state.Total}`}

                <Button onClick={this.changePaymentState}>Proceed</Button>

                {this.state.payment ? <Payment/> : ""}
                   
                   </Container>


          </>
        )
    }
}

