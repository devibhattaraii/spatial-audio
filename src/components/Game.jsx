import React, { useCallback, useEffect, useRef } from 'react';

import useCamera from '../hooks/useCamera';
import useMap from '../hooks/useMap';
import usePlayer from '../hooks/usePlayer';
import Sound from './Sound';
import Player from './Player';
import Controls from './Controls';

const Game = () => {
  const gameRef = useRef();
  const lastTimeRef = useRef(0);
  const map = useMap();
  const camera = useCamera();
  const player = usePlayer();

  const tick = useCallback(
    (time) => {
      const ms = time - lastTimeRef.current;
      lastTimeRef.current = time;
      gameRef.current = requestAnimationFrame(tick);
      map.update(ms / 1000);
      player.update(ms / 1000);
      camera.render();
    },
    [camera, map, player]
  );

  useEffect(() => {
    gameRef.current = requestAnimationFrame(tick);

    return () => {
      gameRef.current && cancelAnimationFrame(gameRef.current);
    };
  }, [gameRef, tick]);

  return (
    <>
      <Sound />
      <Player />
      <Controls />
    </>
  );
};

export default Game;
