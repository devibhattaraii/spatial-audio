import React, { useReducer } from 'react';

const GameContext = React.createContext(); 

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MAP':
            return { ...state, map: action.payload };
        case 'SET_SOUND':
            return { ...state, sound: action.payload };
        case 'SET_PLAYER':
            return { ...state, player: action.payload };
        case 'SET_GAME':
            return { ...state, game: action.payload };
        case 'SET_CAMERA':
            return { ...state, camera: action.payload };
         case 'SET_CANVASCONTEXT':
            return { ...state, canvasContext: action.payload };
        case 'SET_CANVAS':
            return { ...state, canvas: action.payload };    
        case 'SET_CONTROLS':
            return { ...state, controls: action.payload };  
        case 'SET_ISLOADING':
            return { ...state, isLoading: false };  
        default:
            return state;
    }
}

export const GameProvider = ({ children }) =>
{
    const [state, dispatch] = useReducer(gameReducer, {
        isLoading: true,
        map: null,
        sound: null,
        player: null,
        game: null,
        camera: null,
        canvasContext: null,
        canvas: null,
        controls: null
    })

    const setMap = (map) => {
        dispatch({ type: 'SET_MAP', payload: map });
    }

    const setSound = (sound) => {
        dispatch({ type: 'SET_SOUND', payload: sound });
    }

    const setPlayer= (player) => {
        dispatch({ type: 'SET_PLAYER', payload: player });
    }

    const setGame = (game) => {
        dispatch({ type: 'SET_GAME', payload: game});
    }

    const setCamera = (camera) => {
        dispatch({ type: 'SET_CAMERA', payload: camera});
    }

    const setCanvasContext = (canvasContext) => {
        dispatch({ type: 'SET_CANVASCONTEXT', payload: canvasContext});
    }

    const setCanvas = (canvas) => {
        dispatch({ type: 'SET_CANVAS', payload: canvas});
    }

    const setControls = (controls) => {
        dispatch({ type: 'SET_CONTROLS', payload: controls});
    }

    const setIsLoading = () => {
        dispatch({type: 'SET_ISLOADING'});
    }
    return (
        <GameContext.Provider value={{
            state,
            setMap,
            setSound,
            setPlayer,
            setGame,
            setCamera,
            setCanvasContext,
            setCanvas,
            setControls,
            setIsLoading,
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext;