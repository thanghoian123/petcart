import React from 'react';
import NewsP from '../content/news/news'
import PropTypes from 'prop-types';
import MainHeader from '../header/mainheader';

News.propTypes = {
    
};

function News(props) {
    return (
        <div>
            <MainHeader/>
            <NewsP/> 
        </div>
    );
}

export default News;