import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lightningID: null,
  rainID: null,
  thunderID: null,
  musicID: null,
};

const sound = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    playRain: {
      reducer: (state, action) => {
        state.rainID = action.payload;
      },
      prepare: (sound) => {
        const id = sound.play('rain');
        sound.volume(0.2, id);
        return { payload: id };
      },
    },
    playThunder: {
      reducer: (state, action) => {
        state.thunderID = action.payload;
      },
      prepare: (sound) => {
        const x = Math.round(100 * (2 - Math.random() * 4)) / 100;
        const y = Math.round(100 * (2 - Math.random() * 4)) / 100;

        const id = sound.play('thunder');

        sound.pos(x, y, -0.5, id);
        sound.volume(1, id);
        return { payload: id };
      },
    },
    playLightning: {
      reducer: (state, action) => {
        state.lightningID = action.payload;
      },
      prepare: (sound) => {
        const x = Math.round(100 * (2.5 - Math.random() * 5)) / 100;
        const y = Math.round(100 * (2.5 - Math.random() * 5)) / 100;
        const rate = Math.round(100 * (0.4 + Math.random() * 1.25)) / 100;

        const id = sound.play('lightning');

        sound.pos(x, y, -0.5, id);
        sound.rate(rate, id);
        sound.volume(1, id);
        return { payload: id };
      },
    },
    playMusic: {
      reducer: (state, action) => {
        state.musicID = action.payload;
      },
      prepare: (sound, x, y) => {
        const id = sound.play('music');
        sound.once(
          'play',
          () => {
            sound.pos(x + 0.5, y + 0.5, -0.5, id);
            sound.volume(1, id);

            /*
    Panning-Model: spatialisation algorithm to use to position the audio in 3D space.
    ref-distance: A double value representing the reference distance 
                for reducing volume as the audio source moves further from the listener.
                For distances greater than this the volume will be reduced based on rolloffFactor and distanceModel.
    Rollerfactor: A double value describing how quickly the volume is reduced 
                as the source moves away from the listener. This value is used by all distance models.
    distanceModel: An enumerated value determining which algorithm to use 
                    to reduce the volume of the audio source as it moves away from the listener. 
                    Possible values are "linear", "inverse" and "exponential". The default value is "inverse".
    */

            sound.pannerAttr(
              {
                panningModel: 'HRTF',
                refDistance: 0.8,
                rolloffFactor: 2.5,
                distanceModel: 'exponential',
              },
              id
            );
          },
          id
        );
        return { payload: id };
      },
    },
    stopRain: {
      reducer: (state) => {
        state.rainID = null;
      },
      prepare: (sound, id) => {
        sound.stop(id);
        return {};
      },
    },
    stopThunder: {
      reducer: (state) => {
        state.thunderID = null;
      },
      prepare: (sound, id) => {
        sound.stop(id);
        return {};
      },
    },
    stopMusic: {
      reducer: (state) => {
        state.music = null;
      },
      prepare: (sound, id) => {
        sound.stop(id);
        return {};
      },
    },
  },
});

export const soundActions = sound.actions;
export const selectRainID = (state) => state.sound.rainID;
export const selectThunderID = (state) => state.sound.thunderID;
export const selectMusicID = (state) => state.sound.musicID;
export default sound.reducer;
