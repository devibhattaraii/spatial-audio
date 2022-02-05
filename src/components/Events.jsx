/** @format */
import {useState, useRef} from 'react'


const Events = ({sound}) => {
    // Clear listener after first call.
    // const [soundId, setSoundId] = useState(null)
    // Play returns a unique Sound ID that can be passed
    // into any method on Howl to control that specific sound.

const soundId = sound.play('laser')
sound.pos(x + 0.5, y + 0.5, -0.5, soundId)
sound.volume(1, soundId);
sound.pannerAttr({
    panningModel: 'HRTF',
    refDistance: 0.8,
    rolloffFactor: 2.5,
    distanceModel: 'exponential'
}, soundId);





    // Fires when the sound finishes playing.
    console.log("Finished!");
    return null;
};

export default Events;

