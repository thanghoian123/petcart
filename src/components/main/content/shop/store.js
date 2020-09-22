import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TypeProduct from './typeproduct';
import * as actions from '../../../../redux/actions/actions';
import ListPro from './listproducts';
import callAPI from '../../../../CallApi';

Store.propTypes = {
    
};

function Store(props) {
    const {onGetProducts,onGetTypePro} = props
    useEffect(() => {
        callAPI('products', 'GET', null).then(res => {
            onGetProducts(res.data);
        })
        callAPI('categorys', 'GET', null).then(res => {
            onGetTypePro(res.data);
        })
    }, []);
    var { typeProducts } = props;
        if (typeProducts) {
            var typePros = (typeProducts).map((item, index) => {
                return (
                    <li id="item" key={index}>
                        <h4 data-atr="id1" onClick={() => this.onToggle(item)}>{item.name}<span className="caret" /></h4>
                        <div className="child-item-dropdown" id="id1">
                            <TypeProduct
                                child={item.child}
                                isToggle={item.isToggle === "true" ? true : false}
                            />
                        </div>
                    </li>
                )
            })
        }

    return (
        <div className="body-content">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 page-title">
                            <ol className="breadcrumb bg-none">
                                <li> <Link to="/">Trang chủ</Link></li>
                                <li className="active"><Link to="/shop">Cửa hàng</Link></li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className=" col-sm-3 list-product ">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Danh mục sản phẩm</h3>
                                </div>
                                <div className="panel-body">
                                    <ul>
                                        {typePros}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <ListPro/>
                    </div>
                </div>
            </div>
    );
}

const mapStatetoProps = (state) => {
    return {
        products: state.products.products,
        typeProducts: state.typeProducts,
        cart_Products: state.cart_Products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetProducts: (products) => {
            dispatch(actions.getAll(products))
        },
        onToggle: (item) => {
            dispatch(actions.toggle(item))
        },
        onAddToCart: (item, quantity) => {
            dispatch(actions.addToCart(item, quantity))
        },
        onFilter: (typePro) => {
            dispatch(actions.filterItem(typePro))
        },
        onGetTypePro: (typePro) => {
            dispatch(actions.getTypeProduct(typePro))
        },
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Store);