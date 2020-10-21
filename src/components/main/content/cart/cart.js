import React, { useEffect,useState } from 'react';
import './cart.css'
import * as actions from '../../../../redux/actions/actions';
import { connect } from 'react-redux';
import CartItem from './cartitem';
import MainHeader from '../../header/mainheader';
import { Redirect,Link } from 'react-router-dom';

function Cart(props) {
    const { cart_Products } = props;
    const [isCheckedToken, setisCheckedToken] = useState(false);
    
    var token = JSON.parse(localStorage.getItem('token')) || null;
    const onTotal = () => {
        var total = 0;
        (cart_Products || []).forEach(element => {
            total += element.product.price * element.quantity
        });
        return total;
    }

    useEffect(() => {

    }, []);

    const onBuy = () => {
        const billDetail = (cart_Products || []).map(e => {
            return { idProduct: e.product.id,nameProduct: e.product.title , quantity: e.quantity ,price:e.product.price}
        });
        if (token) {
            const userName = token.username;
            const total = onTotal();
            const infBuyer = {
                billDetail: billDetail,
                userName: userName,
                total: total
            }
            localStorage.setItem('infBuyer',JSON.stringify(infBuyer));
            // onReciveInf(infBuyer);
        }else{
            setisCheckedToken(true);
        }
    }

    if(isCheckedToken){
        return(
            <Redirect to="/login"/>
        )
    }

    var elements = (cart_Products || []).map((item, index) => {
        return (
            <CartItem
                key={index}
                item={item}
            />
        )
    })
    const style = { 'min-height': '500px' }
    return (
        <>
            <MainHeader />
            <div className="container">
                <div className="heading">
                    <h1>
                        <span className="shopper">s</span> Shopping Cart
                </h1>
                    <a href="#" className="visibility-cart transition is-open">X</a>
                </div>
                <div className="cart transition is-open">
                    <a href="#" className="btn btn-update">Update cart</a>
                    <div className="table">
                        <div className="layout-inline row th">
                            <div className="col col-pro">Product</div>
                            <div className="col col-price align-center ">
                                Price
                        </div>
                            <div className="col col-qty align-center">QTY</div>
                            <div className="col">VAT</div>
                            <div className="col">Total</div>
                        </div>
                        {elements}


                        <div className="tf">
                            <div className="row layout-inline">
                                <div className="col">
                                    <p>VAT</p>
                                </div>
                                <div className="col" />
                            </div>
                            <div className="row layout-inline">
                                <div className="col">
                                    <p>Shipping</p>
                                </div>
                                <div className="col" />
                            </div>
                            <div className="row layout-inline">
                                <div className="col">
                                    <p>Total :<strong>{onTotal()}</strong></p>
                                </div>
                                <div className="col" />
                            </div>
                        </div>
                    </div>
                    <Link to="buy" className="btn btn-update" onClick={onBuy}>Buy</Link>
                </div>
            </div>
        </>

    );
}

const mapStateToProps = (state) => {
    return {
        cart_Products: state.cart_Products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddToCart: () => {
            dispatch(actions.cart_Product())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);