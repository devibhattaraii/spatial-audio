import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Howler } from 'howler';

import usePlayer from '../hooks/usePlayer';
import { selectDir, selectPosition } from '../redux/slices/player';

const Player = () => {
  const position = useSelector(selectPosition);
  const dir = useSelector(selectDir);
  const player = usePlayer();

  useEffect(() => {
    // Update position of audio listener
    Howler.pos(position.x, position.y, -0.5);
    player.rotate(dir);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Player;
