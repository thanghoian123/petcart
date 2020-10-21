import React, { useEffect, } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TypeProduct from './typeproduct';
import * as actions from '../../../../redux/actions/actions';
import ListPro from './listproducts';
import callAPI from '../../../../CallApi';
import MainHeader from '../../header/mainheader';

function ShopFilterType(props) {
    const { typeProducts, match, onGetProducts, onGetTypePro, onFilter ,onToggle } = props
    useEffect(() => {
        callAPI('product/products', 'GET', null).then(res => {
            onGetProducts((res.data || []).map(item => ({ ...item })));
            onFilter(match.params.type)
        })
        callAPI('category/categorys', 'GET', null).then(res => {
            onGetTypePro(res.data);
        })
    }, [])

    useEffect(() => {
        onFilter(match.params.type)
    }, [match])

    const onToggleItem = (e) => {
        if(!e) return ;
        onToggle(e);       
    }


    return (
        <>
            <MainHeader/>
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
                                        {(typeProducts || []).map((item, index) => (
                                            <li id="item" key={index}>
                                                <h4 data-atr="id1" onClick={() => onToggleItem(item)}>{item.name}<span className="caret" /></h4>
                                                <div className="child-item-dropdown" id="id1">
                                                    <TypeProduct
                                                        child={item.child}
                                                        isToggle={(item.isToggle === "true" || item.isToggle === "True") ? true : false}
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <ListPro filter={true} />
                    </div>
                </div>
            </div>
        </>


    );
}

const mapStatetoProps = (state) => {
    return {
        products: state.products.productFilter,
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

export default connect(mapStatetoProps, mapDispatchToProps)(ShopFilterType);