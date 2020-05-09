import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import { Container, Card, ListGroup } from 'react-bootstrap'
import { FindItem } from '../service/function'
import './product.css'
import RatingComponent from '../components/rating/ratingMain';
import {getUserId} from '../service/function'
import {wishList} from '../service/function'
import {AddToCart} from '../service/function'
import {QuantityDecrement} from '../service/function'
import {isUserAuthenticated} from '../service/function'

export default class DisplayProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {

            itemName: '',
            mainCategory: '',
            subCategory: '',
            qty: 0,
            description: '',
            price: 0



        };
    }

    componentDidMount() {

        FindItem(this.props.match.params.id)
            .then(response => {
                this.setState({

                    itemName: response.data.itemName,
                    mainCategory: response.data.mainCategory,
                    subCategory: response.data.subCategory,
                    qty: response.data.qty,
                    description: response.data.description,
                    price: response.data.price

                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

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
                                        <div class="tab-pane active" id="pic-1"><img src="http://placekitten.com/400/252" /></div>
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
                                    <h4 class="price">price: <span> {`Rs.${this.state.price}`}</span></h4>
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
                                        <button class="add-to-cart btn btn-default" type="button">add to cart</button>
                                        <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="ratingContainer" className="container-fliud">
                    <RatingComponent productId = {this.props.match.params.id} userId = {this.state.userId}/>
                </div>
            </>
        )
    }
}
