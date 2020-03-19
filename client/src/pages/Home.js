import React from 'react'
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import Services from "../components/Services"
import Navbar from "../components/Navbar";

export default function Home() {
    return (
    <>
        <Navbar/>
        <Hero>
            <Banner title="WELCOME TO URBAN RUNES" 
            subtitle="Enhance Your Beauty">
            </Banner>
        </Hero>
        <Services/>
    </>
    )
}

