import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  position: {
    x: 10,
    y: 26,
  },
  dir: Math.PI * 1.9,
  steps: 0,
};

const player = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeDir: (state, action) => {
      state.dir = action.payload;
    },
    walk: {
      reducer: (state, action) => {
        state.position.x += action.payload.x;
        state.position.y += action.payload.y;
      },
      prepare: (x, y) => {
        return { payload: { x, y } };
      },
    },
    addSteps: (state, action) => {
      state.steps += action.payload;
    },
  },
});

export const playerActions = player.actions;
export const selectPosition = (state) => state.player.position;
export const selectDir = (state) => state.player.dir;
export const selectSteps = (state) => state.player.steps;
export default player.reducer;
