export const CartReducer = ( state, action ) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {...state, cart: [...state.cart, { ...action.payload, qty: 1, donate: "true" }]};
        case "REMOVE_FROM_CART":
            return {
                ...state, 
                cart: state.cart.filter( c => c.id !== action.payload.id ),
            };
        case 'ADD_QTY':
            return {
                ...state,
                cart: state.cart.filter( c => c.id === action.payload.id ? c.qty += 1 : c.qty )
            };
        case 'REDUCE_QTY':
            return {
                ...state,
                cart: state.cart.filter( c => c.id === action.payload.id ? c.qty -= 1 : c.qty )
            };
        case 'DONATE':
            return {
                ...state,
                cart: state.cart.filter( c => c.id === action.payload.id ? c.donate = "true" : c.donate )
            };
        case 'DONT_DONATE':
            return {
                ...state,
                cart: state.cart.filter( c => c.id === action.payload.id ? c.donate = "false" : c.donate )
            };
        case 'EMPTY_CART':
            return {
                ...state,
                cart: []
            };
        default:
            return state;
    }
}   