import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { Container, Card, ListGroup } from 'react-bootstrap'
import { FindItem } from '../service/function'
import './product.css'
import {getUserId} from '../service/function'
import {wishList} from '../service/function'
import {AddToCart} from '../service/function'
import {QuantityDecrement} from '../service/function'
import {isUserAuthenticated} from '../service/function'
import RatingComponent from '../components/rating/ratingMain';

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
            img:'',
            userId:''



        };
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



    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };


    render() {
        return (

            <>
                <Navbar />
                {/* <Container fluid="md">

                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Item Information </Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><b> Name </b> : {this.state.itemName}</ListGroup.Item>
                            <ListGroup.Item><b> Main Category </b> : {this.state.mainCategory}</ListGroup.Item>
                            <ListGroup.Item><b> Sub Category </b> : {this.state.subCategory}</ListGroup.Item>
                            <ListGroup.Item><b> Available Quantity </b> : {this.state.qty}</ListGroup.Item>
                            <ListGroup.Item><b> Description </b> : {this.state.description}</ListGroup.Item>
                            <ListGroup.Item><b> Price </b> : {this.state.price}</ListGroup.Item>
                        </ListGroup>
                    </Card>

                </Container> */}

                <div class="container">
                    <div class="cardProduct">
                        <div class="container-fliud">
                            <div class="wrapper row">
                                <div class="preview col-md-6">
                                    <div class="preview-pic tab-content">
                                        <div class="tab-pane active" id="pic-1"><img src={this.state.img} /></div>
                                        {/* <div class="tab-pane" id="pic-2"><img src="http://placekitten.com/400/252" /></div>
						  <div class="tab-pane" id="pic-3"><img src="http://placekitten.com/400/252" /></div>
						  <div class="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
						  <div class="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div> */}
                                    </div>
                                    {/* <ul class="preview-thumbnail nav nav-tabs">
						  <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						</ul> */}

                                </div>
                                <div class="details col-md-6">
                                    <h3 class="product-title">{this.state.itemName}</h3>
                                    <div class="rating">
                                        <div class="stars">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                        </div>
                                        <span class="review-no">41 reviews</span>
                                    </div>
                                    <p class="product-description">{this.state.description}</p>
                                    {this.state.discount !== 0 ? <strike><h4 class="price">Old price: <span> {`Rs.${this.state.price}`}</span></h4></strike>  : <h4 class="price">Unit Price: <span> {`Rs.${this.state.price}`}</span></h4>}
                                    {/* <h4 class="price">original price: <span> {`Rs.${this.state.price + (this.state.discount/100)}`}</span></h4> */}
                                    {this.state.discount !== 0 ? <h4 class="price">Discounted New price: <span> {`Rs.${this.state.price *(100-this.state.discount)/100}`}</span></h4> : " "}
                                    <h4 class="discount">discount: <span> {`${this.state.discount}%`}</span></h4>
                                    <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                                    <h5 class="sizes">sizes:
							{/* <span class="size" data-toggle="tooltip" title="small">s</span> */}
                                        <span class="size" data-toggle="tooltip" title="medium">m</span>
                                        {/* <span class="size" data-toggle="tooltip" title="large">l</span>
                                        <span class="size" data-toggle="tooltip" title="xtra large">xl</span> */}
                                    </h5>
                                    <h5 class="colors">quantity:
							<span class="color">{this.state.qty}</span>
                                    </h5>
                                    <div class="action">
                                    {isUserAuthenticated() ?  <button class="add-to-cart btn btn-default" type="button" onClick={() => { this.addToCart(this.state.userId,this.props.match.params.id) }} >add to cart</button> : " "}
                                    {isUserAuthenticated() ? <button class="like btn btn-default" type="button" onClick={() => { this.addToWishList(this.state.userId,this.props.match.params.id) }}><span class="fa fa-heart"></span></button> : " "}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="ratingContainer" className="container-fliud">
                            <RatingComponent productId = {this.props.match.params.id} userId = {this.state.userId}/>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
