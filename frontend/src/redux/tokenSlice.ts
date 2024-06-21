import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [],
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.entities.push(action.payload);
    },
  },
  selectors: {
    selectToken: (state) => state.entities,
  },
});

export { tokenSlice };
export const { addToken } = tokenSlice.actions;

export default tokenSlice.reducer;
