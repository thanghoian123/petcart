import * as types from '../constances/constances';

var products = [];
var productFilter = [];

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () => {
    return s4() + s4() + s4() + s4();
}

var findID = (id, state) => {
    var result = -1;
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === id) {
            result = i;
            break;
        }
    }
    return result;
}

const myReducer = (state = { products, productFilter }, action) => {
    switch (action.type) {
        case types.GET_ALL: {
            state = { ...state, products: action.products }
            return state
        }
        case types.ADD_PRO: {
            var item = action.product;
            item.id = randomID()
            const newProducts = state.products.push(item);
            return { ...state, products: newProducts }
        }
        case types.DEL_PRO: {
            var index = findID(action.id, state.products);
            const newProducts = state.products.splice(index, 1);
            return { ...state, products: newProducts }
        }
        case types.FILTER_ITEM: {
            var filterS = (state.products || []).filter((element) => {
                if (element.categoryCode == action.typePro) {
                    return element
                }
            })
            // console.log({ ...state, productsFilter: filterS });
            return { ...state, productFilter: filterS }
        };
        default: return state;
    }
}

export default myReducer;