import { configureStore } from '@reduxjs/toolkit';
 import authReducer from './TokenSlice';

 export default configureStore({
   reducer: {
     auth: authReducer,
   }
 });