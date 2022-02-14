import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  left: false,
  right: false,
  front: false,
  back: false,
};

const controls = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    changeState: {
      reducer: (state, action) => {
        state[action.payload.state] = action.payload.pressed;
      },
      prepare: (state, pressed) => {
        return { payload: { state, pressed } };
      },
    },
  },
});

export const controlsActions = controls.actions;
export const selectControlStates = (state) => state.controls;
export default controls.reducer;
