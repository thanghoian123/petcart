import React, { useEffect } from 'react';
import * as actions from '../../../../redux/actions/actions';

import {connect} from 'react-redux';
import { useState } from 'react';


function CartItem(props) {
    const {onDelCart,item,onAddToCart,onRemoveCartItem} = props;
    const [quantity, setquantity] = useState(0);
    const DelCart =(id)=>{
        if(!id) return;
        onDelCart(id);
    }

    const RemoveItem=(id)=>{
        if(!id) return;
        onRemoveCartItem(id);
    }
    useEffect(() => {
        if(!item) return;
        setquantity(item.quantity)
    }, []);

    const onMinus = (id)=>{        
        if(quantity>0){           
            const i = quantity-1;
            setquantity(i);
        }
        onDelCart(id);
    }

    const onPlus = (item,qtt)=>{        
        const i = quantity+1;
        setquantity(i);
        onAddToCart(item,qtt);
    }

    const onHandelChange = (e)=>{
        const value = e.target.value;
        setquantity(value);

    }

    return (
        <div className="layout-inline row row-bg2">
            <div className="col col-pro layout-inline">
                <img src={item.product.imgUrl} alt="kitten" />
                <p>{item.product.title}</p>
            </div>
            <div className="col col-price col-numeric align-center ">
                <p>£{item.product.price}</p>
            </div>
            <div className="col col-qty  layout-inline">
                <a href="#" className="qty qty-minus " onClick={()=>onMinus(item.product.id)}>-</a>
                <input type="numeric" value={quantity} onChange={onHandelChange}/>
                <a href="#" className="qty qty-plus" onClick={()=>onPlus(item.product,1)}>+</a>
            </div>
            <div className="col col-vat col-numeric">
                <p>£1.95</p>
            </div>
            <div className="col col-total col-numeric">
                <p>{quantity*item.product.price}</p>
                <i className="fa fa-times" aria-hidden="true" onClick={()=>RemoveItem(item.product.id)}></i>
            </div>
        </div>
    );
}

var mapStateToProps= (state)=>{
    return {

    }
}

var mapDispatchToProps= (dispatch,props)=>{
    return {
        onDelCart:(id)=>{
            dispatch(actions.delCart(id))
        },
        onAddToCart: (product, quantity) => {
            dispatch(actions.addToCart(product, quantity))
        },
        onRemoveCartItem:(id)=>{
            dispatch(actions.removeCartItem(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartItem)