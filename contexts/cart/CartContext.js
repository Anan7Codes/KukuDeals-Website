import { createContext, useContext, useReducer, useEffect } from 'react'
import {CartReducer} from './CartReducer'

const Cart = createContext()

const CartContext = ({ children }) => {
    let savedCart
    if (typeof window !== 'undefined') {
        savedCart = JSON.parse(localStorage.getItem("cart"));
    }
    const [ state, dispatch ] = useReducer(CartReducer, {
        cart: savedCart ? savedCart : [],
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }, [state]);

    return ( 
        <Cart.Provider value={{state, dispatch}}>
            {children}
        </Cart.Provider>
    )
}

export default CartContext

export const CartState = () => {
    return useContext(Cart)
}