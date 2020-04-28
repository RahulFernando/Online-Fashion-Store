import React, { Component } from 'react'
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import Services from "../components/Services"
import Navbar from "../components/Navbar";
import Title from "../components/Title"
import CardImage from '../images/cardimage1.jpg'


export default function Home() {

    const useStyles = {
        background: {
            marginBottom:"1rem",
        },
        btn: {
            marginLeft:"0.5rem",
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
                <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div class="card card-block" style={useStyles.background}>
                        <div className="overflow">
                            <img src={CardImage} alt="" className="card-img-top"/>
                        </div>
                        <div className="card-body text-dark">
                            <h5 className="card-title">CardTitle</h5>
                            <p className="card-text text-secondary">
                                Price
                            </p> 
                            <a href="" className="btn btn-outline-success" role="button">Add to wishlist</a>
                            <a href="" className="btn btn-outline-success" role="button" style={useStyles.btn}>Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>

        </>

    )
}




