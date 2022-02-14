import { configureStore } from '@reduxjs/toolkit';

import soundReducer from './slices/sound';
import playerReducer from './slices/player';
import controlsReducer from './slices/controls';
import mapReducer from './slices/map';

const store = configureStore({
  reducer: {
    sound: soundReducer,
    player: playerReducer,
    controls: controlsReducer,
    map: mapReducer,
  },
});

export default store;
