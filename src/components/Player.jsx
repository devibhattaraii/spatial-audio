import { useState } from "react";
import { Howler } from 'howler';
import {circle} from '../constants'

const usePlayer = (x, y, direction, velocity) =>{  
	const [position, setPosition] = useState({
		x,
		y
	})

		const [dir, setDir] = useState(direction)

		const [speed, setSpeed] = useState(velocity || 3)

		const [steps, setSteps] = useState(0)


	const hand = new Texture('./assets/gun.png', 512, 360);

  // Update the position of the audio listener.
  Howler.pos(player.x, player.y, -0.5);

	const rotate = (angle) => {
    
		setDir((dir + angle + circle) % circle)
	
    // Calculate the rotation vector and update the orientation of the listener.
		setPosition({
			x: Math.cos(dir),
			y: 0
		})

    const z = Math.sin(dir);
    Howler.orientation(x, y, z, 0, 1, 0);
	}
	
	const walk = (dist) => {
    const dx = Math.cos(dir) * dist;
    const dy = Math.sin(dir) * dist;

    // Move the player if they can walk here.
    setPosition((game.map.check(x + dx, y) <= 0) ? dx : 0);
    setPosition(y=(game.map.check(x, y + dy) <= 0) ? dy : 0);

		setSteps(steps+dist)

    // Update the position of the audio listener.
    Howler.pos(x, y, -0.5);
	}
	
	const update = (secs) => {
    if (states.left) rotate(-Math.PI * secs);
    if (states.right) rotate(Math.PI * secs);
    if (states.front) walk(speed * secs);
    if (states.back) walk(-speed * secs);
	}
	
  // Update the direction and orientation.
  rotate(dir);
};



export default usePlayer;

