import React from 'react'
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import Services from "../components/Services"

export default function Home() {
    return (
    <>
        <Hero>
            <Banner title="WELCOME TO URBAN RUNES" 
            subtitle="Enhance Your Beauty">
            </Banner>
        </Hero>
        <Services/>
    </>
    )
}

