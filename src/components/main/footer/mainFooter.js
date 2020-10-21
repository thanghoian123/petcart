import React from 'react';
import './footerStyle.css';
import url from './winner.png';

function MainFooter(props) {
    return (
        <div>
            <div className="container-fluid bg-footer pd-t">
                <div className="row ">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <h3 className="text-center">Contact</h3>
                        <ul id="contact">
                            <li><i className="fas fa-map-marker-alt" /> 91 Trần Quang Khải, Hội An, Quảng Nam,Việt Nam</li>
                            <li><i className="fas fa-phone-volume" /> T. +84.769144735</li>
                            <li><i className="fas fa-envelope-square" /> E. kuthang32@gmail.com</li>
                        </ul>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <h3 className="text-center">LOUNGE</h3>
                        <ul id="contact">
                            <li><span className="glyphicon glyphicon-heart" /> A Coffee with Max – Founder of The PhD Proofreaders</li>
                            <li><span className="glyphicon glyphicon-heart" /> Made with Love in Hoi An</li>
                            <li><span className="glyphicon glyphicon-heart" /> A Guide for Digital Nomads to move to Hoi An</li>
                            <li><span className="glyphicon glyphicon-heart" /> The Story of Hub Hoi An [2]</li>
                            <li><span className="glyphicon glyphicon-heart" /> Your 6-Step Morning Routine for 2018</li>
                        </ul>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <h3 className="text-center">OUR MEMBERS LOVE US! READ OUR REVIEWS.</h3>
                        <img src={url} alt />
                    </div>
                </div>
                <hr />
                <div className="row text-center">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="social-media">
                            <p id="fa"><i class="fa fa-facebook" aria-hidden="true"></i></p>
                            <p id="ins"><i class="fa fa-instagram" aria-hidden="true"></i></p>
                            <p id="G"><i class="fa fa-google" aria-hidden="true"></i></p>
                        </div>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p className="font-sm">Copyright 2017 HUB HOI AN COWORKING | All Rights Reserved | CONTACT US!</p>
                    </div>
                </div>
            </div>
            
        
        </div>

    );
}

export default MainFooter;