import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './sneakersProductsSlice';
import cartReducer from './basketSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
