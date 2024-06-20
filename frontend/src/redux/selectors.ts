import { productSlice } from './productSlice';
import { RootState } from './index';
import { tokenSlice } from './tokenSlice';

const state = productSlice.getInitialState();

export const selectAllProducts = () => productSlice.getSelectors().selectAllProducts(state);
export const selectLoadingStatus = () => productSlice.getSelectors().selectLoadingStatus(state);
export const selectProducts = (state: RootState) => state.products.entities;
