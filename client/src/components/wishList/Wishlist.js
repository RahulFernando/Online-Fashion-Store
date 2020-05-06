import React, { Component } from 'react'
import{ Table,Container } from 'react-bootstrap'
import{ Card } from 'react-bootstrap'
import WishListItem from './WishlistItem';
import Navbar from '../../components/Navbar'
import {getUserId} from '../../service/function'
import {displayWishList} from '../../service/function'
import {DeleteWishListItem} from '../../service/function'
import {AddToCart,QuantityDecrement} from '../../service/function'
import {FaHeartBroken} from 'react-icons/fa'

export default class Wishlist extends Component {

    constructor(props){
        super(props);

        this.deleteWishedItem = this.deleteWishedItem.bind(this);
        this.addToCart = this.addToCart.bind(this);


        this.state = {

            userID:'',
            Items: []

        };
    }

    componentDidMount(){
        
        this.state.userID = getUserId();
        console.log(this.state.userID);

        displayWishList(this.state.userID)
        .then(res => {
            this.setState({
                Items: res.data.WishList
               
            })

            
           
        })
        .catch(function(error){
           
            console.log(error);
        })

        
    }
    

    wishItemList() {

        return this.state.Items.map(wishListItem => {
            return <WishListItem wishedItem={wishListItem} deleteItem={this.deleteWishedItem} userID = {this.state.userID} addToCart={this.addToCart}/>;
          })
    }

    deleteWishedItem(userid,itemid) {

        DeleteWishListItem(userid,itemid);

        this.setState({
            Items: this.state.Items.filter(item => item.id !== itemid)
          })
    }

    addToCart(userId,itemId){

        AddToCart(userId,itemId);
        QuantityDecrement(itemId,1);
        DeleteWishListItem(userId,itemId);

        this.setState({
            Items: this.state.Items.filter(item => item.id !== itemId)
          })

    }

    render() {
        return (

            <>
            <Navbar/>
            <Container>

            <Card border="primary"  header><center><h1>Wish List</h1></center></Card>

            <Table striped bordered hover size="sm">
                    <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th></th>
                                <th></th>
                            </tr>
                    </thead>
                            <tbody>
                            {this.wishItemList()}
                          </tbody>
               </Table>

               {this.state.Items.length == 0 ? <h1 style={{textAlign: "center", color:"red"}}><b> Wish List is Empty! <FaHeartBroken/> </b></h1>  : ""}

               </Container>
               </>
        )
    }
}
