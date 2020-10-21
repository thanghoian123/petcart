import * as types from '../constances/constances';

export const getAll = (products) => {
    return {
        type: types.GET_ALL,
        products: products
    }
}


export const addPro = (product) => {
    return {
        type: types.ADD_PRO,
        product: product
    }
}

export const delPro = (id) =>{
    return{
        type: types.DEL_PRO,
        id: id
    }
}

// ------------------------------------- //
export const getPosts = (posts) => {
    return {
        type: types.GET_POSTS,
        posts: posts
    }
}


export const addPost = (post) => {
    return {
        type: types.ADD_POST,
        post: post
    }
}

export const delPost = (id) =>{
    return{
        type: types.DEL_POST,
        id: id
    }
}

//----------------shop-----------------------// 

export const toggle = (item)=>{
    return {
        type : types.TOGGLE_ITEM,
        item : item
    }
}

export const getTypeProduct = (typePro) =>{
    return {
        type : types.TYPE_PRODUCTS,
        typePro:typePro
    }
}

export const cart_Product = () =>{
    return {
        type : types.CART_PRODUCTS
    } 
}

export const addToCart = (product,quantity)=>{
    return {
        type: types.ADD_TOCART,
        product:product,
        quantity : quantity
    }
}

export const delCart = (id)=>{
    return {
        type:types.DEL_CART,
        id: id
    }
}

export const removeCartItem = (id)=>{
    return {
        type:types.REMOVE_CARTITEM,
        id: id
    }
}

export const filterItem = (typePro)=>{
    return {
        type: types.FILTER_ITEM,
        typePro : typePro
    }
}

// -----------------------------------------------//
export const getUsers = (user)=>{
    return {
        type: types.GET_USER,
        user: user
    }
}

export const logout = ()=>{
    return {
        type: types.LOGOUT
    }
}

// bill

export const getBill = (bills) =>{
    return {
        type : types.GET_BILL,
        bills : bills
    }
}

export const addBill = (bill)=>{
    return {
        type: types.ADD_BILL,
        bill:bill
    }
}

export const delBill = (id)=>{
    return {
        type: types.DEL_BILL,
        id:id
    }
}

export const updStt = (item) =>{
    return {
        type:types.UPD_STT,
        item:item
    }
}


