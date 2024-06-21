import { productSlice } from './productSlice';
import { RootState } from './index';
import { tokenSlice } from './tokenSlice';

const productState = productSlice.getInitialState();
const tokenState = tokenSlice.getInitialState();

export const selectAllProducts = (state: RootState) => state.products.entities;
export const selectLoadingStatus = (state: RootState) => state.products.loadingStatus;
export const selectProducts = (state: RootState) => state.products.entities;
export const selectToken = () => tokenSlice.getSelectors().selectToken(tokenState);
export const selectProductById = (state: RootState, id: string) => state.products.entities.find((entity) => parseInt(entity.id) === parseInt(id));
