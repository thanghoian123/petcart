import React from 'react';
import PropTypes from 'prop-types';
import MainHeader from '../header/mainheader';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import HomeP from '../content/homeP';
import Shop from '../content/shop';
import SignUpForm from '../content/login/signupform';
import LoginForm from '../content/login/loginform';
import ShopFilterType from '../content/shop/shopfiltertype';
import News from '../content/news';
import newsDetail from '../content/news/newsDetail';

HomePage.propTypes = {
    
};

function HomePage(props) {
    return (
        <div>
           
            <Router>
                <MainHeader/>
                <Switch>
                    <Route path="/" exact component={HomeP}/>
                    <Route path="/signup" exact component={SignUpForm}/>
                    <Route path="/login" exact component={LoginForm}/>
                    <Route path="/shop" exact component={Shop}/>
                    <Route path="/shop/type/:type" exact component={ShopFilterType}/>
                    <Route path="/news" exact component={News}/>
                    <Route path="/news/:id" exact component={newsDetail}/>
                </Switch>
            </Router>
            
        </div>
    );
}

export default HomePage;