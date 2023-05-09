import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] };

const addDecimals = (num) => {
    return (Math.round(num * 100 / 100)).toFixed(2);
}

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

            // Calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            
            // Calculate shipping price (If order is over $100 then free, else $10 shipping.)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            // Calculate tax price
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

            // Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

            // Save the cart to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;