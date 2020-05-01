import React, { Component } from 'react'
import Hero from '../components/Hero'
import Navbar from "../components/Navbar";
import Banner from "../components/Banner"
import Title from "../components/Title"
import {getWomenDetails} from '../service/function'



export default class Women extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
        
            womenItems: [],
        }
    }

    componentDidMount = () => {
        
        getWomenDetails()
        .then(res => {
            this.setState({
                womenItems: res.data.women,
            })

        })
        .catch (() => {
            alert('Error retreving data')
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
            <Hero hero="womenHero">
                <Banner title="WELCOME TO WOMEN"/>
            </Hero>

            <div className="container-fluid">
            <section className="popular-products">
                <Title title="Latest Arrivals"/>
            <div className="row flex-row flex-rap">
                
                {this.state.womenItems.map(product => {
                    return <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card card-block" style={useStyles.background}>
                        <div className="overflow">
                            <img src={null} alt="" className="card-img-top"/>
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



