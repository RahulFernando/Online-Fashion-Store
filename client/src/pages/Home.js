import React, { Component } from 'react'
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import Services from "../components/Services"
import Navbar from "../components/Navbar";
import Title from "../components/Title"
import {getItemDetails} from '../service/function'
import {getUserId} from '../service/function'
import {wishList} from '../service/function'
import {AddToCart} from '../service/function'
import {QuantityDecrement} from '../service/function'
import {isUserAuthenticated} from '../service/function'
import { Link } from 'react-router-dom';



export default class Home extends Component {

    constructor(props) {
        super(props)

        this.addToWishList = this.addToWishList.bind(this);
        this.addToCart = this.addToCart.bind(this);
    
        this.state = {
            img: [],
            items: []
        }
    }


    componentDidMount = () => {
        
        getItemDetails()
        .then(res => {
            this.setState({
                items: res.data.products,
            })
            this.getImage()
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

    getImage = () => {
        let arr = []
        for (let index = 0; index < this.state.items.length; index++) {
            var base64Flag = 'data:image/png;base64,';
            var imageStr = this.arrayBufferToBase64(this.state.items[index].image.data.data);
            arr.push(base64Flag + imageStr)

        }
        this.setState({
            img: arr
        })
    }

    arrayBufferToBase64 = (buffer) => {
        let binary = ''
        let bytes = [].slice.call(new Uint8Array(buffer))

        bytes.forEach(b => binary += String.fromCharCode(b))

        return window.btoa(binary)
    }

    render() {
        const useStyles = {
            background: {
                marginBottom:"1rem",
            },
            btn: {
                marginLeft:"1.5rem",
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

        <div className="container-fluid">
            <section className="popular-products">
                <Title title="Popular Products"/>
            <div className="row flex-row flex-rap">
                
                {this.state.items.map((product, index) => {
                    return <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
                    <div className="card card-block" style={useStyles.background}>
                        <div className="overflow">
                            
                            <img src={this.state.img[index]} alt="" className="card-img-top"/>
                        </div>
                        <div className="card-body text-dark">
                            <Link to={"/displayProduct/"+product._id}> <h5 className="card-title">{product.itemName}</h5> </Link>
                            <p className="card-text text-secondary">
                                {`Rs.${product.price}`}
                            </p> 
                            {isUserAuthenticated() ? <a href="#" onClick={() => { this.addToWishList(this.state.userID,product._id) }} className="btn btn-outline-success" role="button">Add to Wishlist</a> : " "}
                            {isUserAuthenticated() ? <a href="#" onClick={() => { this.addToCart(this.state.userID,product._id) }} className="btn btn-outline-success" role="button" style={useStyles.btn}>Add to Cart</a> : " "}
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










