import * as types from '../constances/constances'
var data = JSON.parse(localStorage.getItem('cart'))
var cart = data ? data : []

var onFindItem = (id,cart) =>{
    var index =-1;
    for(let i =0;i<cart.length;i++){
        if(cart[i].product.id== id){
            index = i; break;
        }
    }
    return index;
}

var onFindProInCart = (cart,pro)=>{
    let index = -1;
    cart.forEach((item,i) => {
        if(item.product.id==pro.product.id){
            index = i;
            return index;
        }
    });
    return index;
}

var myReducer = (state = cart,action)=>{
    
    switch(action.type){
        case types.CART_PRODUCTS: {
            return[...state]
        }
        case types.ADD_TOCART:{
            var newItem = {
                product: action.product,
                quantity:action.quantity
            }
            let i = onFindProInCart(state,newItem);
            if(i==-1){
                state.push(newItem);               
            }else{              
                state[i].quantity++;
            }
            localStorage.setItem('cart',JSON.stringify(state));
            return [...state]
        }
        case types.DEL_CART:{
            var i = onFindItem(action.id,state);
            if(i!=-1 && state[i].quantity>1){
                state[i].quantity--;               
            }else{              
                state.splice(i,1);
            }
            
            localStorage.setItem('cart',JSON.stringify(state));
            return [...state]
        }
        case types.REMOVE_CARTITEM:{
            var i = onFindItem(action.id,state);
            if(i!=-1){
                state.splice(i,1);             
            }           
            localStorage.setItem('cart',JSON.stringify(state));
            return [...state]
        }
        default: return [...state]
    }
}


export default myReducer;