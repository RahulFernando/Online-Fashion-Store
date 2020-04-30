import React, { Component } from 'react'
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import Services from "../components/Services"
import Navbar from "../components/Navbar";
import Title from "../components/Title"
import CardImage from '../images/cardimage1.jpg'
import Axios from 'axios';
import {getItemDetails} from '../service/function'



export default class Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            img: '',
            items: []
        }
    }


    componentDidMount = () => {
        
        getItemDetails()
        .then(res => {
            console.log(res.data.products[0].image)
            var base64Flag = 'data:image/png;base64,';
            var imageStr = this.arrayBufferToBase64(res.data.products[0].image.data.data);
            this.setState({
                items: res.data.products,
                img: base64Flag + imageStr
            })

        })
        .catch (() => {
            alert('Error retreving data')
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
                            
                            <img src={this.state.img} alt="" className="card-img-top"/>
                        </div>
                        <div className="card-body text-dark">
                            <h5 className="card-title">{product.itemName}</h5>
                            <p className="card-text text-secondary">
                                {`Rs.${product.price}`}
                            </p> 
                            <a href="" className="btn btn-outline-success" role="button">Add to Wishlist</a>
                            <a href="" className="btn btn-outline-success" role="button" style={useStyles.btn}>Add to Cart</a>
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










