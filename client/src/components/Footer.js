import React, { Component } from 'react'
import './footer.css'

export default class Footer extends Component {
    render() {
        return (
            <footer class="mainfooter" role="contentinfo">
                <div class="footer-middle">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 col-sm-6">
                                <div class="footer-pad">
                                    <h5>ABOUT</h5>
                                    <p class="text-justify">At Urban Runes, We just don't add products to our site randomly.
                                    The products sold at our site have been carefully hand picked and checked for quality by
                                    industry experts. We can assure you that there are no stale products displayed at Urban Runes.
                                    Our team of experts are on the constant lookout for high quality products and innovation.
                                    We regularly update our product range keeping you informed of latest trends and fashion.
                                    At Urban Runes, we operate a very reliable delivery service. If you have an urgent order,
                                    we are committed to deliver on time and do everything within our power to fulfill your needs.
                                    Don’t forget to tag us in your favourite Urban Runes outfit and share it on your favorite social
                                    media platform.</p>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="footer-pad">
                                    <h5>QUICK LINKS</h5>
                                    <ul class="list-unstyled">
                                        <li><a href="#">Size Guide</a></li>
                                        {/* <li><a href="#">Public Works</a></li>
                                        <li><a href="#">Police Department</a></li>
                                        <li><a href="#">Fire</a></li>
                                        <li><a href="#">Mayor and City Council</a></li>
                                        <li>
                                            <a href="#"></a>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <h5>FOLLOW US</h5>
                                <ul class="social-network social-circle">
                                    <li><a href="#" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#" class="icoInstagram" title="Instagram"><i class="fa fa-instagram"></i></a></li>
                                    <li><a href="#" class="icoPinterest" title="Pinterest"><i class="fa fa-pinterest-p"></i></a></li>
                                    <li><a href="#" class="icoLinkedin" title="Linkedin"><i class="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <ul class="list-unstyled list-inline payment text-center ">
                                <li class="list-inline-item"><i class="fa fa-cc-mastercard"></i></li>
                                <li class="list-inline-item"><i class="fa fa-cc-visa"></i></li>
                                <li class="list-inline-item"><i class="fa fa-paypal"></i></li>
                            </ul>
                        </div>
                        <div class="row">
                            <div class="col-md-12 copy">
                                <p class="text-center">&copy; Copyright 2020 - Urban Runes.  All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
