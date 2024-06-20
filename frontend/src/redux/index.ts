import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import tokenReducer from "./tokenSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    products: productsReducer,
    tokens: tokenReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
