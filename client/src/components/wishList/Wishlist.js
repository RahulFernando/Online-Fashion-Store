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
import {FindItem} from '../../service/function'

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

        FindItem(itemId)
        .then(res=>{

            if(res.data.qty == 0){

               

                alert( `${res.data.itemName} is out of stock`);
            }

            else{

                AddToCart(userId,itemId);
                QuantityDecrement(itemId,1);
                DeleteWishListItem(userId,itemId);
        
                this.setState({
                    Items: this.state.Items.filter(item => item.id !== itemId)
                  })

            }
           
        })
        

      

    }

    render() {
        return (

            <>
            <Navbar/>
            <Container>

            <Card border="primary"  header style={{"marginTop": 50}}><center><h2>Wish List</h2></center></Card>

            <Table striped bordered hover size="sm" style={{"marginTop": 10}}>
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

               {this.state.Items.length == 0 ? <h3 style={{textAlign: "center", color:"red"}}><b> Wish List is Empty! <FaHeartBroken/> </b></h3>  : ""}

               </Container>
               </>
        )
    }
}
