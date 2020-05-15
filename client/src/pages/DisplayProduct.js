import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { FindItem } from '../service/function'
import './product.css'
import { getUserId } from '../service/function'
import { wishList } from '../service/function'
import { AddToCart } from '../service/function'
import { QuantityDecrement } from '../service/function'
import { isUserAuthenticated } from '../service/function'
import RatingComponent from '../components/rating/ratingMain';
import axios from "axios";

export default class DisplayProduct extends Component {

    constructor(props) {
        super(props);

        this.addToWishList = this.addToWishList.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.state = {

            itemName: '',
            mainCategory: '',
            subCategory: '',
            qty: 0,
            description: '',
            price: 0,
            discount: 0,
            img: '',
            userId: '',
            ratingAvarage : 0,
            noOfReviews : 0

        };

        this.findAverageOfRatings(this.props.match.params.id);
    }

    componentDidMount() {

        FindItem(this.props.match.params.id)
            .then(response => {

                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = this.arrayBufferToBase64(response.data.image.data.data);

                this.setState({

                    itemName: response.data.itemName,
                    mainCategory: response.data.mainCategory,
                    subCategory: response.data.subCategory,
                    qty: response.data.qty,
                    description: response.data.description,
                    price: response.data.price,
                    discount: response.data.discount,
                    img: base64Flag + imageStr

                })
            })
            .catch(function (error) {
                console.log(error);
            })

        this.state.userId = getUserId();
        console.log(this.state.userId);

    }

    addToWishList(userId, itemId) {

        console.log(userId);
        console.log(itemId);

        wishList(userId, itemId);

    }

    addToCart(userId, itemId) {

        console.log(userId);
        console.log(itemId);

        FindItem(itemId)
            .then(res => {

                if (res.data.qty == 0) {


                    alert(`${res.data.itemName} is out of stock`);
                }

                else {

                    AddToCart(userId, itemId);
                    QuantityDecrement(itemId, 1);

                    this.setState({
                        qty:this.state.qty - 1
                    })
                    

                }

            })

    }



    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    findAverageOfRatings = (productId) => {

        axios.get('http://localhost:4000/api/users/rating/find?productId=' + productId)
            .then(res => {

                let ratinglist = res.data;
                var stars = 0;
                var count = 0;
                ratinglist.map(rate => {

                    stars += rate.numberOfStars;
                    count++;

                    //set the final average
                    if(count === ratinglist.length)
                    {
                        const avg = stars / count;
                        this.setState({ratingAvarage : avg,noOfReviews : count});
                    }
                });

            })
            .catch(error => {
                console.log("Error while getting ratings " + error);
            });

    };


    render() {

        //calculating number of checked stars and unchecked starts in the average
        var arr =[1.0,2.0,3.0,4.0,5.0];
        var elements = [];
        arr.map(i => {

            if(this.state.ratingAvarage >= i)
            {
                elements.push(<span className="fa fa-star checked"  onClick={() => this.onStarClicked(i)}/>);
            }
            else
            {
                elements.push(<span className="fa fa-star"  onClick={() => this.onStarClicked(i)}/>);
            }
        });

        return (

            <>
                <Navbar />
                <div class="container">
                    <div class="cardProduct">
                        <div class="container-fliud">
                            <div class="wrapper row">
                                <div class="preview col-md-6">
                                    <div class="preview-pic tab-content">
                                        <div class="tab-pane active" id="pic-1"><img src={this.state.img} /></div>
                                    </div>
                                </div>
                                <div class="details col-md-6">
                                    <h3 class="product-title">{this.state.itemName}</h3>




                                    <div class="rating">
                                        <div class="stars">
                                            {/*<span class="fa fa-star checked"></span>*/}
                                            {/*<span class="fa fa-star checked"></span>*/}
                                            {/*<span class="fa fa-star checked"></span>*/}
                                            {/*<span class="fa fa-star"></span>*/}
                                            {/*<span class="fa fa-star"></span>*/}
                                            {elements}
                                        </div>
                                        <span class="review-no">{this.state.noOfReviews} reviews</span>
                                    </div>


                                    <p class="product-description">{this.state.description}</p>
                                    {this.state.discount !== 0 ? <strike><h4 class="price">Old price: <span> {`Rs.${this.state.price}`}</span></h4></strike> : <h4 class="price">Unit Price: <span> {`Rs.${this.state.price}`}</span></h4>}
                                    {this.state.discount !== 0 ? <h4 class="price">Discounted New price: <span> {`Rs.${this.state.price * (100 - this.state.discount) / 100}`}</span></h4> : " "}
                                    <h4 class="discount">discount: <span> {`${this.state.discount}%`}</span></h4>
                                    <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                                    <h5 class="sizes">sizes:
                                        <span class="size" data-toggle="tooltip" title="medium">m</span>
                                    </h5>
                                    <h5 class="qtys">quantity:
                                        <span class="qty">{this.state.qty}</span>
                                    </h5>
                                    <div class="action">
                                        {isUserAuthenticated() ? <button class="add-to-cart btn btn-default" type="button" onClick={() => { this.addToCart(this.state.userId, this.props.match.params.id) }} >add to cart</button> : " "}
                                        {isUserAuthenticated() ? <button class="like btn btn-default" type="button" onClick={() => { this.addToWishList(this.state.userId, this.props.match.params.id) }}><span class="fa fa-heart"></span></button> : " "}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="ratingContainer" className="container-fliud">
                            <RatingComponent productId={this.props.match.params.id} userId={this.state.userId} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
