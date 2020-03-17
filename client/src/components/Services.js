import React, { Component } from 'react'
import {FaPlane,FaMoneyCheckAlt,FaCreditCard,FaHeadset} from
'react-icons/fa'

export default class Services extends Component {
    state={
        services:[
            {
                icon:<FaPlane/>,
                title:"World Wide Shipping"
            },
            {
                icon:<FaMoneyCheckAlt/>,
                title:"100% Money Back Guarantee "
            },
            {
                icon:<FaCreditCard/>,
                title:"Many Payment Gateways"
            },
            {
                icon:<FaHeadset/>,
                title:"24/7 Online Support"
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <div className="services-center">
                    {this.state.services.map((item,index) => {
                        return (
                            <article key={index} className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                            </article>
                        );
                    })}
                </div>
            </section>
        );
    }
}
