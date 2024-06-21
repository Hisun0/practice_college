import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import axiosInstance from "../../axiosInstance.js";
import routes from "./routes";
import ProductInterface from '../interface/product.interface';
import LoadingStatus from '../enum/LoadingStatus';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (arg, thunkAPI) => {
    try {
      const response = await axiosInstance.get(routes.productsPath());

      if (!response.data && response.data.length <= 0) {
        throw new Error(response.data.message);
      }

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data: ProductInterface) => {
    const response = await axiosInstance.post(routes.productsPath(), data);
    return response.data;
  },
);

interface State {
  entities: ProductInterface[];
  loadingStatus: LoadingStatus;
  error: null | SerializedError;
}

const initialState = {
  entities: [],
  loadingStatus: LoadingStatus.PENDING,
  error: null,
} as State;

const productSlice = createSlice({
  reducerPath: undefined,
  name: "products",
  initialState,
  reducers: {
    addProduct(state, { payload }) {
      state.entities.push(payload);
    }
  },
  selectors: {
    selectAllProducts: (state): ProductInterface[] => state.entities,
    selectLoadingStatus: state => state.loadingStatus,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loadingStatus = LoadingStatus.PENDING;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingStatus = LoadingStatus.FULFILLED;
        state.error = null;
        state.entities = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.REJECTED;
        state.error = action.error;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.entities.push(payload);
      })
  }
});

export { productSlice };

export default productSlice.reducer;
