import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload); // Add the new food item
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
