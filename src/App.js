import React, { useContext, useEffect, useRef } from 'react';

import GameContext from './contexts/GameContext';

import Game from './components/Game'
import Sound from './components/Sound';
import Player from './components/Player';
import Controls from './components/Controls';
import Map from './components/Map';
import Camera from './components/Camera';

import { isMobile } from './constants';

function App() {
  const { 
    state: {isLoading}, 
    setCamera, 
    setCanvas, 
    setCanvasContext, 
    setControls, 
    setIsLoading, 
    setMap, 
    setPlayer, 
    setSound 
  } = useContext(GameContext);
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const sound = Sound();
  const player = Player(10, 26, Math.PI * 1.9, 2.5);
  const controls = Controls();
  const map = Map(25);
  const camera = Camera(isMobile ? 256 : 512);
  Game();
  
  useEffect(() => {
    const canvasContext = canvas.getContext('2d');
    setSound(sound);
    setPlayer(player);
    setControls(controls);
		setCanvas(canvas);
		setCanvasContext(canvasContext);
    setMap(map);
    setCamera(camera);
    setIsLoading(false);
  }, [sound, player, controls, canvas, map, camera, setSound, setPlayer, setControls, setCanvas, setCanvasContext, setMap, setCamera, setIsLoading]);
    
  if (isLoading) return null;

  return (
      <canvas ref={canvasRef} />
  )
}

export default App;
