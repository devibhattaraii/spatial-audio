import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { mapActions, selectLight } from '../redux/slices/map';
import { soundActions } from '../redux/slices/sound';
import { selectPosition } from '../redux/slices/player';
import { sound, mapGrid, mapSize } from '../constants';

const useMap = () => {
  const dispatch = useDispatch();
  const light = useSelector(selectLight);
  const playerPosition = useSelector(selectPosition);

  const check = useCallback((x, y) => {
    x = Math.floor(x);
    y = Math.floor(y);

    if (x < 0 || x > mapSize - 1 || y < 0 || y > mapSize - 1) {
      return -1;
    }

    return mapGrid[y * mapSize + x];
  }, []);

  const inspect = useCallback(
    (sin, cos, step, shiftX, shiftY, dist, offset) => {
      const dx = cos < 0 ? shiftX : 0;
      const dy = sin < 0 ? shiftY : 0;

      step.type = check(step.x - dx, step.y - dy);
      step.height = step.type > 0 ? 1 : 0;
      step.dist = dist + Math.sqrt(step.len2);

      if (shiftX) {
        step.shading = cos < 0 ? 2 : 0;
      } else {
        step.shading = sin < 0 ? 2 : 1;
      }

      step.offset = offset - Math.floor(offset);

      return step;
    },
    [check]
  );

  const step = (rise, run, x, y, inverted) => {
    if (run === 0) {
      return { len2: Infinity };
    }

    const dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    const dy = dx * (rise / run);

    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      len2: dx * dx + dy * dy,
    };
  };

  const ray = function (sin, cos, range, origin) {
    const stepX = step(sin, cos, origin.x, origin.y, false);
    const stepY = step(cos, sin, origin.y, origin.x, true);

    const inspectX = [sin, cos, stepX, 1, 0, origin.dist, stepX.y];
    const inspectY = [sin, cos, stepY, 0, 1, origin.dist, stepY.x];
    const next = inspect.apply(
      this,
      stepX.len2 < stepY.len2 ? inspectX : inspectY
    );

    if (next.dist > range) {
      return [origin];
    }
    return [origin].concat(ray(sin, cos, range, next));
  };

  const cast = (angle, range) => {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return ray(sin, cos, range, {
      x: playerPosition.x,
      y: playerPosition.y,
      height: 0,
      dist: 0,
    });
  };

  const update = useCallback(
    (secs) => {
      if (light > 0) {
        dispatch(mapActions.setLight(Math.max(light - 10 * secs, 0)));
      } else if (Math.random() * 6 < secs) {
        dispatch(mapActions.setLight(2));
        // Play the lightning sound.
        dispatch(soundActions.playLightning(sound));
      }
    },
    [dispatch, light]
  );

  return { check, update, cast };
};

export default useMap;
