import React, { Component } from 'react'
import Hero from '../components/Hero'
import Navbar from "../components/Navbar";
import Banner from "../components/Banner"
import Title from "../components/Title"
import Footer from "../components/Footer"
import {getMenDetails} from '../service/function'
import {getUserId} from '../service/function'
import {wishList} from '../service/function'
import {AddToCart} from '../service/function'
import {QuantityDecrement} from '../service/function'
import {isUserAuthenticated} from '../service/function'
import { Link } from 'react-router-dom';
import {FindItem} from '../service/function'




export default class Men extends Component {

    constructor(props) {
        super(props)

        this.addToWishList = this.addToWishList.bind(this);
        this.addToCart = this.addToCart.bind(this);
    
        this.state = {
            
            menItems: [],
            userId:''
        }

      
    }


    arrayBufferToBase64(buffer) {

        var base64Flag = 'data:image/jpeg;base64,';
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return base64Flag + window.btoa(binary);
    };


    componentDidMount = () => {
        
        getMenDetails()
        .then(res => {

            this.setState({
                menItems: res.data.men,
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

        FindItem(itemId)
        .then(res=>{

            if(res.data.qty == 0){

               

                alert( `${res.data.itemName} is out of stock`);
            }

            else{

            AddToCart(userId,itemId);
            QuantityDecrement(itemId,1);

            }
           
        })
        
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
            <Hero hero="menHero">
                <Banner title="WELCOME TO MEN">
                </Banner>
            </Hero>

            <div className="container-fluid">
            <section className="popular-products">
                <Title title="Latest Arrivals"/>
            <div className="row flex-row flex-rap">
                
                {this.state.menItems.map(product => {
                    return <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
                    <div className="card card-block" style={useStyles.background}>
                        <div className="overflow">
                            <img src={this.arrayBufferToBase64(product.image.data.data)} alt="" className="card-img-top"/>
                        </div>
                        <div className="card-body text-dark">
                        <Link to={"/displayProduct/"+product._id}> <h5 className="card-title">{product.itemName}</h5> </Link>
                            <p className="card-text text-secondary">
                            {product.discount !==0 ?  <strike>{`Rs.${product.price.toFixed(2)}`}</strike> : product.price.toFixed(2)}
                            {" "}{" "}{" "}{" "}
                            {product.discount !==0 ?  `Rs.${(product.price*(100-product.discount)/100 ).toFixed(2)}` : " "}  
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
        <Footer/>
        </>
        )
    }
}



