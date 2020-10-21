import React from 'react';
import Home from '../content/home/home'
import PropTypes from 'prop-types';
import MainHeader from  '../header/mainheader'
import MainFooter from '../footer/mainFooter';



function HomeP(props) {
    return (
        <div>
            <MainHeader/>
            <Home/>
            <MainFooter/>
        </div>
    );
}

export default HomeP;