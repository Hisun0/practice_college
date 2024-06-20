import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axiosInstance.get("/api/product");
  return response.data;
});

const initialState = {
  entities: [],
  loadingStatus: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loadingStatus = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loadingStatus = "fulfilled";
        state.entities = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loadingStatus = "rejected";
        state.error = action.error;
      })
  },
});

export default productsSlice.reducer;
