import React, { Component } from 'react'
import{ Table,Container } from 'react-bootstrap'
import{ Card } from 'react-bootstrap'
import MybagItem from './MybagItem'
import Navbar from '../../components/Navbar'
import Payment from './Payment'
import{ Button } from 'react-bootstrap'
import {FaShoppingCart} from 'react-icons/fa'
import {FaCheckCircle} from 'react-icons/fa'


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
        this.bringBackToInitialState = this.bringBackToInitialState.bind(this);
      

        this.state = {

            payment : false,
            userID:'',
            Items: [],
            Total:0,
            price:0,
            paymentHaveNotDoneYet: true,
            paymentHaveCompleted:false

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
                    Total : this.state.Total + ((response.data.price*(100-response.data.discount)/100)*item.quantity)
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
            return <MybagItem cartItem={cartListItem} deleteItem={this.deleteCartItem} userId={this.state.userID} />;
          })
    }

    bringBackToInitialState() {

        this.setState({
            payment : false,
            Items:[],
            Total:0,
            paymentHaveNotDoneYet:false,
            paymentHaveCompleted:true

        })
    }

    deleteCartItem(userId,itemId,quantity){

        DeleteCartListItem(userId,itemId)
            .then(
                    FindItem(itemId)
                    .then(response =>{
                        this.setState({
                            Total : this.state.Total - ((response.data.price*(100-response.data.discount)/100)*quantity)
                        });
                    })
               
            )
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

                <Card border="primary"  header><center><h2>My Cart</h2></center></Card>

                <Table striped bordered hover size="sm">
                        <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Discount</th>
                                    <th>Discounted Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                        </thead>
                                <tbody>
                                {this.cartItemList()}
                              </tbody>
                   </Table>

                   
                   
                {this.state.Items.length ==  0 && this.state.paymentHaveNotDoneYet ? <h1 style={{textAlign: "center",color:"red"}}><b>Cart is empty ! <FaShoppingCart/> </b></h1>  : ""}

                {this.state.Items.length == 0 && this.state.paymentHaveCompleted ? <h1 style={{textAlign: "center",color:"green"}}><b>Payment has been Successfully Done! <FaCheckCircle/></b></h1>  : ""}

                {this.state.Items.length >0 ? `Total Price : Rs.${this.state.Total}` : ""}

                <br/>

                {this.state.Items.length >0 ? <Button onClick={this.changePaymentState}>Proceed</Button> : ""}

                {this.state.payment  && this.state.Items.length > 0 ? <Payment userId={this.state.userID} Items={this.state.Items} bringBackToInitialState={this.bringBackToInitialState}/> : ""}
                   
                   </Container>


          </>
        )
    }
}

