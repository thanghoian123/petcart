import * as types from '../constances/constances';
// import { cssHooks } from 'jquery';
// import typeProduct from '../components/typeProduct';

// var data = JSON.parse(localStorage.getItem('typeProducts'));
// var typeProducts= data? data : []
var typeProducts = []
   
var onFindItem = (id,typeProducts) =>{
    var index =-1;
    for(let i =0 ; i<typeProducts.length;i++){
        if(typeProducts[i].id==id){
            index = i; break;
        }
    }
    return index;
}

var myReducer = (state = typeProducts,action)=>{
    switch(action.type){
        case types.TYPE_PRODUCTS:{
            state = action.typePro;
            return state;
        }
        case types.TOGGLE_ITEM:{
            var index = onFindItem(action.item.id,state);
            var isToggle = state[index].isToggle ==="true" ? "false" : "true";
            state[index]={
                ...state[index],
                isToggle: isToggle
            }
           
            return [...state];
        }
        default: return state;
    }
}

export default myReducer;