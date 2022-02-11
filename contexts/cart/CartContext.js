import { createContext, useContext, useReducer } from 'react'
import {CartReducer} from './CartReducer'

const Cart = createContext()

const CartContext = ({ children }) => {
    const [ state, dispatch ] = useReducer(CartReducer, {
        cart: [],
    })

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