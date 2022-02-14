import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Howler } from 'howler';

import useMap from './useMap';
import { selectControlStates } from '../redux/slices/controls';
import {
  playerActions,
  selectDir,
  selectPosition,
} from '../redux/slices/player';
import { circle } from '../constants';

const speed = 2.5;

const usePlayer = () => {
  const controlStates = useSelector(selectControlStates);
  const dir = useSelector(selectDir);
  const playerPosition = useSelector(selectPosition);
  const dispatch = useDispatch();
  const map = useMap();

  const rotate = useCallback(
    (angle) => {
      dispatch(playerActions.changeDir((dir + angle + circle) % circle));
      const x = Math.cos(dir);
      const y = 0;
      const z = Math.sin(dir);
      Howler.orientation(x, y, z, 0, 1, 0);
    },
    [dispatch, dir]
  );

  const walk = useCallback(
    (dist) => {
      const dx = Math.cos(dir) * dist;
      const dy = Math.sin(dir) * dist;
      const xChange =
        map.check(playerPosition.x + dx, playerPosition.y) <= 0 ? dx : 0;
      const yChange =
        map.check(playerPosition.x, playerPosition.y + dy) <= 0 ? dy : 0;
      dispatch(playerActions.walk(xChange, yChange));
      dispatch(playerActions.addSteps(dist));
      Howler.pos(playerPosition.x + xChange, playerPosition.y + yChange, -0.5);
    },
    [dispatch, map, dir, playerPosition]
  );

  const update = useCallback(
    (secs) => {
      if (controlStates.left) {
        rotate(-Math.PI * secs);
      }
      if (controlStates.right) {
        rotate(Math.PI * secs);
      }
      if (controlStates.front) {
        walk(speed * secs);
      }
      if (controlStates.back) {
        walk(-speed * secs);
      }
    },
    [
      controlStates.front,
      controlStates.back,
      controlStates.left,
      controlStates.right,
      rotate,
      walk,
    ]
  );

  return { rotate, update };
};

export default usePlayer;
