import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // The item to be added to the cart
            const item = action.payload

            // Check if the item is already in the cart 
            const existItem = state.cartItems.find((x)=>{
                return x._id === item._id;
            })

            if(existItem){
                // If exists, update quantity
                state.cartItems = state.cartItems.map((x)=>{
                    return x._id === existItem._id ? item : x
                });
            } else {
                // If not exists, add new item to cartItems
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x)=> x._id != action.payload );
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
    },
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;