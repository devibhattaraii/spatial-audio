import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { controlsActions } from '../redux/slices/controls';

const controlCodes = {
  // WASD
  a: 'left',
  d: 'right',
  w: 'front',
  s: 'back',

  // Arrows
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'front',
  ArrowDown: 'back',
};

const Controls = () => {
  const dispatch = useDispatch();

  const key = useCallback(
    (pressed, event) => {
      const state = controlCodes[event.key];
      if (!state) return;
      dispatch(controlsActions.changeState(state, pressed));
      event.preventDefault && event.preventDefault();
      event.stopPropagation && event.stopPropagation();
    },
    [dispatch]
  );

  const keyDownHandler = useCallback(
    (event) => {
      key(true, event);
    },
    [key]
  );

  const keyUpHandler = useCallback(
    (event) => {
      key(false, event);
    },
    [key]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    return () => {
      document.removeEventListener('keydown', keyDownHandler, false);
      document.removeEventListener('keyup', keyUpHandler, false);
    };
  }, [keyDownHandler, keyUpHandler]);

  return null;
};

export default Controls;
