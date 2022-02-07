import { useState, useContext } from "react";

import { Howler } from 'howler';
import { circle } from '../constants'
import GameContext from "../contexts/GameContext";


const usePlayer = (x, y, direction, velocity) =>{ 
	const {state: {map} } = useContext(GameContext) 
	const [position, setPosition] = useState({
		x,
		y
	})

		const [dir, setDir] = useState(direction)

		const [speed, setSpeed] = useState(velocity || 3)

		const [steps, setSteps] = useState(0)


	const hand = new Texture('./assets/gun.png', 512, 360);

  // Update the position of the audio listener.
  Howler.pos(position.x, position.y, -0.5);

	const rotate = (angle) => {
    
		setDir((dir + angle + circle) % circle)
	
    // Calculate the rotation vector and update the orientation of the listener.
		setPosition({
			x: Math.cos(dir),
			y: 0
		})

    const z = Math.sin(dir);
    Howler.orientation(position.x, position.y, z, 0, 1, 0);
	}
	
	const walk = (dist) =>
	{
		const dx = Math.cos(dir) * dist;
		const dy = Math.sin(dir) * dist;

		// Move the player if they can walk here.
		setPosition({
			x: (map.check(position.x + dx, position.y) <= 0) ? dx : 0,
			y: (map.check(position.x, position.y + dy) <= 0) ? dy : 0
		});

		setSteps(steps+dist)

    // Update the position of the audio listener.
    Howler.pos(position.x, position.y, -0.5);
	}
	
	const update = (secs) => {
    if (states.left) rotate(-Math.PI * secs);
    if (states.right) rotate(Math.PI * secs);
    if (states.front) walk(speed * secs);
    if (states.back) walk(-speed * secs);
	}
	
  // Update the direction and orientation.
	rotate(dir);
  return ({
    rotate,
    walk,
    update
  })
};



export default usePlayer;

