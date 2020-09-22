import { combineReducers } from "redux";
import products from './products';
import typeProducts from './typeproducts';
import posts from './posts';

const myReducer = combineReducers({
    products : products,
    posts:posts,
    typeProducts : typeProducts
})

export default myReducer;