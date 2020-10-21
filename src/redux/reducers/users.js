import * as types from '../constances/constances';

const data = JSON.parse(localStorage.getItem('token'))
const initialState = {};

var myReducer=(state=initialState,action)=>{
    switch (action.type){
        case types.GET_USER:{
            state = action.user;
            return state;
        }
        case types.LOGOUT:{
            state ={};
            return state;
        }
        default: return state;
    }
} 

export default myReducer;