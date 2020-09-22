import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../../../../redux/actions/actions';

function ListPro(props) {
    var { products, filter = false, productFilter } = props;
    console.log(filter);
    var element = (filter ? productFilter : products).map((item, index) => {
        return (
            <div className="col-sm-3" key={index}>
                <div className="product text-center">
                    <div className="img-product">
                        <Link to={`/shop/${item.id}`}><img src={item.imgUrl} alt="" /></Link>
                    </div>
                    {/* <img src={item.imgUrl}  alt=""/> */}
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <a id="btn-buy" onClick={() => onAddToCart(item, 1)}>mua hàng</a>
                </div>
            </div>

        )
    });

    const onAddToCart = (product, quantity) => {
        console.log(product, "---", quantity);
        this.props.onAddToCart(product, quantity);
    }
    return (
        <div className="col-sm-9 bg-pink">
            <div className="row">
                {element}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        productFilter: state.products.productFilter
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter: (typePro) => {
            dispatch(actions.filterItem(typePro))
        },
        onAddToCart: (product, quantity) => {
            dispatch(actions.addToCart(product, quantity))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPro);