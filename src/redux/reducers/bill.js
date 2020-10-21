import * as types from '../constances/constances';

const bills = [];
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

var myReducer = (state = bills, action) => {
    switch (action.type) {
        case types.GET_BILL: {
            state = action.bills;
            return [...state]
        }
        case types.ADD_BILL: {
            const newBill = action.bill;
            state.push(newBill);
            console.log('success');
            return [...state]
        }
        case types.DEL_BILL: {
            var index = findID(action.id, state);
            state.splice(index, 1);
            return [...state];
        }
        case types.UPD_STT: {
            const newI = action.item;
            var index = findID(newI.id, state);
            state[index] = newI
            
       
            
            return [ ...state ]
        }
        default: return state;
    }

}

export default myReducer;