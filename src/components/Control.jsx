import {useState, useRef} from 'react'

const Control = (event) => {
    const [controls, setContrls] = useState(['false', 'false', 'false', 'false']);
    const [isPressed, setIsPressed] = useState('false');

    const state = null;
    event.preventDefault();
    const direction = [false, false, false, false]

    if (isPressed) {
        const state = event.target.value;
        if (ASCII(state) = 37) {
            
            return 'left';
        }
        if (ASCII(state) = 38) {
            return 'front';
        }
        if (ASCII(state) = 39) {
            return 'right';
        }
        if (ASCII(state) = 40) {
            return 'back';
        }
    }


    return;
}

export default Control