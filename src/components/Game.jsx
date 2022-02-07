import React, { useRef, useState, useEffect, useContext } from 'react';

import GameContext from '../contexts/GameContext';

const Game = () => {
	const [lastTime, setLastTime] = useState(0)
	const {state:{map, player, camera}, setCanvasContext}= useContext(GameContext)
	const canvasRef = useRef(null)
	
	const tick = (time) => {
		const ms = time - lastTime;
		setLastTime(time);

		// Update the different components of the scene.
		map.update(ms / 1000);
		player.update(ms / 1000);
		camera.render(player, map);

		requestAnimationFrame(tick);

	}

	useEffect(() => {
		const canvas = canvasRef.current;
		const canvasContext = canvas.getContext('2d');
		setCanvasContext(canvasContext);

		// Continue the game loop.
		requestAnimationFrame(tick);

		// generates a new map
		map.setup();
	}, [])	


  return <canvas ref={canvasRef} />
};

export default Game;
