import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../../../../redux/actions/actions';


function TypeProduct(props) {
    var { child, isToggle } = props;
    // console.log('child' , child)
    var ele = child.map((item, index) => {
        return (
            <Link key={index} to={`/shop/type/${item.code}`} >
                <li>
                    {item.name}
                </li>
            </Link>

        )
    })
    return (
        <ul className={isToggle ? "child-list-item" : "child-list-item toggle"}>
            {ele}
        </ul>
    )
}

var mapStateToProps = (state) => {
    return {
        // isToggle : state.typeProducts
        // typeProducts : state.typeProducts
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onGetTypePro: (typePro) => {
            dispatch(actions.getTypeProduct(typePro))
        },
        onToggle: (item) => {
            dispatch(actions.toggle(item))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeProduct);