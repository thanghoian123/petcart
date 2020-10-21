import React from 'react';
import PropTypes from 'prop-types';
import Store from './shop/store';
import MainHeader from  '../header/mainheader';

Shop.propTypes = {
    
};

function Shop(props) {
    return (
        <div>
            <MainHeader/>
            <Store/>
        </div>
    );
}

export default Shop;