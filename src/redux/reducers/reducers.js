import { combineReducers } from "redux";
import products from './products';
import typeProducts from './typeproducts';
import posts from './posts';
import cart_Products from './cart';
import bills from './bill';
import users from './users';
const myReducer = combineReducers({
    products : products,
    posts:posts,
    typeProducts : typeProducts,
    users :users,
    cart_Products: cart_Products,
    bills: bills
})

export default myReducer;