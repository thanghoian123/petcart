import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import{connect} from 'react-redux';
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
import NewsDetail from '../content/news/newsDetail';
import Cart from '../content/cart/cart';
import MainHeader from '../header/mainheader';
import * as actions from './../../../redux/actions/actions';
import ProductDetail from '../content/shop/productdetail';

import Admin from '../../admin/wrapper/admin';
import Content from '../../admin/content/option/ShowTable';
import ChartP from '../../admin/content/chart/Chart';
import AddPro from '../../admin/content/option/productOption/addProduct';
import UpdPro from '../../admin/content/option/productOption/updProduct';
import AddPost from '../../admin/content/option/postOption/addPost';
import UpdPost from '../../admin/content/option/postOption/updPost';
import InfBuyer from '../content/cart/infBuyer';
import BillInf from '../content/cart/billInf';
import AddType from '../../admin/content/option/productOption/addType';

HomePage.propTypes = {
    
};

function HomePage(props) { 
    
    return (
        <div>           
            <Router>
                {/* <MainHeader/> */}
                <Switch>
                    <Route path="/" exact component={()=>(<HomeP/>)}/>
                    <Route path="/signup" exact component={SignUpForm}/>
                    <Route path="/login" exact component={LoginForm}/>
                    <Route path="/shop" exact component={Shop}/>
                    <Route path="/shop/:id" exact component={ProductDetail}/>
                    <Route path="/shop/type/:type" exact component={ShopFilterType}/>
                    <Route path="/news" exact component={News}/>
                    <Route path="/news/:id" exact component={NewsDetail}/>
                    <Route path="/cart" exact component={()=>(<Cart />)}/>
                    <Route path="/buy" exact component={()=>(<InfBuyer />)}/>
                    <Route path="/billinf" exact component={BillInf}/>
                    {/* <Route path="/admin" exact component={Admin}/> */}

                    <Route path="/admin" exact><Content /></Route>
                    <Route path="/addproduct" exact><AddPro/></Route>
                    <Route path="/updproduct" exact component={UpdPro}/>
                    <Route path="/updproduct/:id" exact component={UpdPro}/>
                    <Route path="/chart" exact component={ChartP}/>
                    
                    <Route path="/addtype" exact component={AddType}/>

                    <Route path="/addpost" exact component={AddPost}/>
                    <Route path="/updpost/:id" exact component={UpdPost}/>
                </Switch>
            </Router>
            
        </div>
    );
}



export default  HomePage;