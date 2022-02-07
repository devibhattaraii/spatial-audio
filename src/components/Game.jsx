import { useCallback, useState, useEffect, useContext } from 'react';

import GameContext from '../contexts/GameContext';

const useGame = () => {
	const [lastTime, setLastTime] = useState(0)
	const {state:{map, player, camera}} = useContext(GameContext)
	
	const tick = useCallback((time) => {
		const ms = time - lastTime;
		setLastTime(time);

		// Update the different components of the scene.
		map.update(ms / 1000);
		player.update(ms / 1000);
		camera.render(player, map);

		requestAnimationFrame(tick);
	}, [lastTime, map, player, camera]);

	useEffect(() => {
		// Continue the game loop.
		requestAnimationFrame(tick);

		// generates a new map
		map.setup();
	}, [map, tick])	


  return {tick};
};

export default useGame;
