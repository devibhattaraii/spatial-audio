import React, { useRef, useEffect } from 'react';
import useMap from './useMap';
import usePlayer from './usePlayer';
import useCamera from './useCamera';

const Game = () => {
	const [lastTime, setLastTime] = useState(0)
	const map = useMap();
	const player = usePlayer();
	const camera = useCamera();
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

		// Continue the game loop.
		requestAnimationFrame(tick);

		// generates a new map
		map.setup();
	}, [])	


  return <canvas ref={canvasRef} />
};

export default Game;
