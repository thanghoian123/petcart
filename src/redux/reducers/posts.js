import * as types from '../constances/constances';

var posts=[];

var findID = (id,state)=>{
    var result = -1;
    for(let i=0;i<state.length ; i++){
        if(state[i].id===id){
            result= i;
            break;
        }
    }
    return result;
}

var myReducer=(state = posts,action)=>{
    switch(action.type){
        case types.GET_POSTS:{
            state= action.posts;
            return state;
        }
        case types.ADD_POST:{
            var item = action.post;
            state.push(item)
            return [...state]
        }
        case types.DEL_POST:{
            var index = findID(action.id,state);
            state.splice(index,1);
            return [...state];
        }
        default: return state;
    }
}

export default myReducer;