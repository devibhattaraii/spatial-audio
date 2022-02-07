import { useState, useEffect } from 'react'

import { codes } from '../constants'

const useControls = () => {
  // Define our control key codes and states.
  const [states, setStates] = useState({left: false, right: false, front: false, back: false});

  const key = (pressed, event) => {
    const state = codes[event.keyCode];
    
    if (!state) {
      return;
    }
    
    setStates({...states, [state]: pressed});
    event.preventDefault && event.preventDefault();
    event.stopPropagation && event.stopPropagation();
  }

  const touch = (event) => {
    const touches = event.touches[0];
    
    // Reset the states.
    touchEnd(event);
    
    // Determine which key to simulate.
    if (touches.pageY < window.innerHeight * 0.3) {
      key(true, {keyCode: 38});
    } else if (touches.pageY > window.innerHeight * 0.7) {
      key(true, {keyCode: 40});
    } else if (touches.pageX < window.innerWidth * 0.5) {
      key(true, {keyCode: 37});
    } else if (touches.pageX > window.innerWidth * 0.5) {
      key(true, {keyCode: 39});
    }
  }

  const touchEnd = (event) => {
    setStates({left: false, right: false, front: false, back: false});
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Setup the DOM listeners.
 useEffect(() => { 
    document.addEventListener('keydown', key(true), false);
    document.addEventListener('keyup', key(false), false);
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchmove', touch, false);
    document.addEventListener('touchend', touchEnd, false);
  })

  return {states, key, touch, touchEnd};
};

export default useControls;