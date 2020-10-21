import React, { useState, useEffect } from 'react';
import * as actions from './../../../../redux/actions/actions';
import CallAPI from '../../../../CallApi';
import Quantity from './quantity';
import MainHeader from '../../header/mainheader';
import { connect } from 'react-redux';

function ProductDetail(props) {
    const { products, onGetProducts, onAddToCart, } = props;
    const [currentQuantity, setcurrentQuantity] = useState(1);

    useEffect(() => {
        CallAPI('product/products', 'GET', null).then(res => {
            onGetProducts(res.data);
        })
    }, []);

    const AddToCart = (product, quantity) => {
        onAddToCart(product, quantity);
    }

    const onReciveValue = (value) => {
        if (!value) return;
        setcurrentQuantity(value)
    }

    const onRender = (elm) => {
        return (
            <>
                <MainHeader/>
                <div className="row mt-10">
                    <div className="col-sm-3">
                    </div>
                    <div className="col-sm-9 bl-bl">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <div className="img-product-detail">
                                    <div className="big-img">
                                        <img src={elm[0].imgUrl} alt="" />
                                    </div>
                                    <div className="small-img">
                                        <ul>
                                            <li><img src="http://dummyimage.com/90x90.bmp/dddddd/000000" alt="" /></li>
                                            <li><img src="http://dummyimage.com/90x90.jpg/dddddd/000000" alt="" /></li>
                                            <li><img src="http://dummyimage.com/90x90.bmp/ff4444/ffffff" alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <div className="product-detail">
                                    <h1>{elm[0].title}</h1>
                                    <p id="price-product">{elm[0].price}</p>
                                    <p id="desc">{elm[0].description}</p>
                                    <Quantity onReciveValue={onReciveValue} />
                                    <a id="btn-buy" onClick={() => AddToCart(elm[0], currentQuantity)}>Mua hàng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }



    var pro_id = props.match.params.id;
    var elm = products.filter((item) => {
        return item.id == pro_id;
    })
    if (products.length > 0) {
        return onRender(elm);
    } else {
        return (
            <div>none</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetProducts: (products) => {
            dispatch(actions.getAll(products))
        },
        onAddToCart: (product, quantity) => {
            dispatch(actions.addToCart(product, quantity))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);