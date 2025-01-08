import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Import the reducer

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
