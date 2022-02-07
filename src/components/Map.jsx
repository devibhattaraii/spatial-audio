import { useContext, useState } from "react";
import GameContext from "../contexts/GameContext";

import Texture from './Texture';
import skyboxImage from '../assets/skybox.jpg';
import wallImage from '../assets/wall.jpg';
import speakerImage from '../assets/speaker.jpg';

const useMap = (argSize) => {
  // Define the pre-defined map template on a 25x25 grid.
  const [grid, ] = useState([1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1]);
  const [size, ] = useState(argSize);
  const [light, setLight] = useState(0);
  
  const { state: { sound } } = useContext(GameContext);
  const skybox = new Texture(skyboxImage, 4096, 1024);
  const wall = new Texture(wallImage, 1024, 1024);
  const speaker = new Texture(speakerImage, 1024, 1024);

  const setup = () => {
    // Loop through the tiles and setup the audio listeners.
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === 2) {
        const y = Math.floor(i / size);
        const x = i % size;
        sound.speaker(x, y);
      }
    }
	}
	
	const check = (x, y) => {
    x = Math.floor(x);
    y = Math.floor(y);

    if (x < 0 || x > size - 1 || y < 0 || y > size - 1) {
      return -1;
    }

    return grid[y * size + x];
	}
	

	const step = (rise, run, x, y, inverted) => {
    if (run === 0) {
      return {len2: Infinity};
    }

    const dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    const dy = dx * (rise / run);

    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      len2: dx * dx + dy * dy
    };
	}


	const inspect = (sin, cos, step, shiftX, shiftY, dist, offset) => {
    const dx = (cos < 0) ? shiftX : 0;
    const dy = (sin < 0) ? shiftY : 0;

    step.type = check(step.x - dx, step.y - dy);
    step.height = (step.type) > 0 ? 1 : 0;
    step.dist = dist + Math.sqrt(step.len2);

    if (shiftX) {
      step.shading = (cos < 0) ? 2 : 0;
    } else {
      step.shading = (sin < 0) ? 2 : 1;
    }

    step.offset = offset - Math.floor(offset);

    return step;
  }
	
	const ray = (sin, cos, range, origin) => {
    const stepX = step(sin, cos, origin.x, origin.y, false);
    const stepY = step(cos, sin, origin.y, origin.x, true);
    
    const inspectX = [sin, cos, stepX, 1, 0, origin.dist, stepX.y];
    const inspectY = [sin, cos, stepY, 0, 1, origin.dist, stepY.x];
    const next = inspect.apply((stepX.len2 < stepY.len2) ? inspectX : inspectY);

    if (next.dist > range) {
      return [origin];
    }

    return [origin].concat(ray(sin, cos, range, next));
	}
	
	const cast = (point, angle, range) => {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return ray(sin, cos, range, {
      x: point.x,
      y: point.y,
      height: 0,
      dist: 0
    });
	}

	const update = (secs) => {
    if (light > 0) {
      setLight(Math.max(light - 10 * secs, 0));
    } else if (Math.random() * 6 < secs) {
      setLight(2);

      // Play the lightning sound.
      sound.lightning();
    }
  }
	
  
  return ({
    skybox, 
    wall,
    speaker,
    setup,
    check,
    step,
    inspect,
    ray,
    cast,
    update
  })
};

export default useMap;
