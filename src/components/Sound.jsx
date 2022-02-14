import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectRainID,
  selectThunderID,
  selectMusicID,
  soundActions,
} from '../redux/slices/sound';

import { sound, mapGrid, mapSize } from '../constants';

const Sound = () => {
  const rainID = useSelector(selectRainID);
  const thunderID = useSelector(selectThunderID);
  const musicID = useSelector(selectMusicID);
  const dispatch = useDispatch();

  const playThunderTimely = useCallback(() => {
    setTimeout(() => {
      dispatch(soundActions.playThunder(sound));
      playThunderTimely();
    }, 5000 + Math.round(Math.random() * 15000));
  }, [dispatch]);

  useEffect(() => {
    dispatch(soundActions.playRain(sound));
    playThunderTimely();

    return () => {
      dispatch(soundActions.stopRain(sound, rainID));
      dispatch(soundActions.stopThunder(sound, thunderID));
    };
  }, [dispatch, playThunderTimely]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    for (let i = 0; i < mapGrid.length; i++) {
      if (mapGrid[i] === 2) {
        // Entry of 2 in grid corresponds to a speaker
        const y = Math.floor(i / mapSize);
        const x = i % mapSize;
        dispatch(soundActions.playMusic(sound, x, y));
      }
    }

    return () => {
      dispatch(soundActions.stopMusic(sound, musicID));
    };
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Sound;
