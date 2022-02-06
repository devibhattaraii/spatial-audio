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
        
        default:
            return state;
    }
        
}

export const GameProvider = ({ children }) =>
{
    const [state, dispatch] = useReducer(gameReducer, {
        map: null,
        sound: null,
        player: null,
        game: null,
        camera: null,
        canvasContext: null
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



    return (
        <GameContext.Provider value={{
            state,
            setMap,
            setSound,
            setPlayer,
            setGame,
            setCamera,
            setCanvasContext
        }}>
            {children}
        </GameContext.Provider>
    )
}

export default GameContext;