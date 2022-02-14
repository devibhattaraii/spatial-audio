import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  light: 0,
};

const map = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setLight: (state, action) => {
      state.light = action.payload;
    },
  },
});

export const mapActions = map.actions;
export const selectLight = (state) => state.map.light;
export default map.reducer;
