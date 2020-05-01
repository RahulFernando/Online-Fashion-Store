import React, { Component } from 'react'
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import Services from "../components/Services"
import Navbar from "../components/Navbar";
import Title from "../components/Title"
import CardImage from '../images/cardimage1.jpg'
import Axios from 'axios';
import {getItemDetails} from '../service/function'
import {getUserId} from '../service/function'
import {wishList} from '../service/function'
import {AddToCart} from '../service/function'
import {QuantityDecrement} from '../service/function'



export default class Home extends Component {

    constructor(props) {
        super(props)

        this.addToWishList = this.addToWishList.bind(this);
        this.addToCart = this.addToCart.bind(this);
    
        this.state = {
        
            items: [],
            userId:''
        }
    }


    componentDidMount = () => {
        
        getItemDetails()
        .then(res => {
            this.setState({
                items: res.data.products,
            })

        })
        .catch (() => {
            alert('Error retreving data')
        })

        this.state.userID = getUserId();
        console.log(this.state.userID);
    }

    addToWishList(userId,itemId){

        console.log(userId);
        console.log(itemId);

        wishList(userId,itemId);

    }

    addToCart(userId,itemId){

        console.log(userId);
        console.log(itemId);

        AddToCart(userId,itemId);
        QuantityDecrement(itemId,1);
        
    }

    render() {

        const useStyles = {
            background: {
                marginBottom:"1rem",
            },
            btn: {
                marginLeft:"1rem",
            }
        };

        return (

        <>
        <Navbar/>
        <Hero>
            <Banner title="WELCOME TO URBAN RUNES" 
                subtitle="Enhance Your Beauty">
            </Banner>
        </Hero>
        <Services/>

        <div class="container-fluid">
            <section className="popular-products">
                <Title title="Popular Products"/>
            <div class="row flex-row flex-rap">
                
                {this.state.items.map(product => {
                    return <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="card card-block" style={useStyles.background}>
                        <div className="overflow">
                            <img src={`http://localhost:3000/${product.image}`} alt="" className="card-img-top"/>
                        </div>
                        <div className="card-body text-dark">
                            <h5 className="card-title">{product.itemName}</h5>
                            <p className="card-text text-secondary">
                                {`Rs.${product.price}`}
                            </p> 
                            <a href="#" onClick={() => { this.addToWishList(this.state.userID,product._id) }} className="btn btn-outline-success" role="button">Add to Wishlist</a>
                            <a href="#" onClick={() => { this.addToCart(this.state.userID,product._id) }} className="btn btn-outline-success" role="button" style={useStyles.btn}>Add to Cart</a>
                        </div>
                    </div>
                </div>
                })} 
                
            </div>
            </section>
        </div>

        </>

        )
    }
}










