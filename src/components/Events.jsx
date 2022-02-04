/** @format */
import {useState, useRef} from 'react'


const Events = ({sound}) => {
    // Clear listener after first call.
    // const [soundId, setSoundId] = useState(null)
    // Play returns a unique Sound ID that can be passed
    // into any method on Howl to control that specific sound.

    // soundId = sound.play()

    sound.play('laser');


    // Fires when the sound finishes playing.
    console.log("Finished!");
    return null;
};

export default Events;

