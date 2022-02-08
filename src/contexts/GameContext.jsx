import createDataContext from './createDataContext';

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
    case 'SET_CONTROLS':
      return { ...state, controls: action.payload };
    case 'SET_ISLOADING':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const setMap = (dispatch) => {
  return (map) => {
    dispatch({ type: 'SET_MAP', payload: map });
  };
};

const setSound = (dispatch) => (sound) => {
  dispatch({ type: 'SET_SOUND', payload: sound });
};

const setPlayer = (dispatch) => (player) => {
  dispatch({ type: 'SET_PLAYER', payload: player });
};

const setGame = (dispatch) => (game) => {
  dispatch({ type: 'SET_GAME', payload: game });
};

const setCamera = (dispatch) => (camera) => {
  dispatch({ type: 'SET_CAMERA', payload: camera });
};

const setCanvasContext = (dispatch) => (canvasContext) => {
  dispatch({ type: 'SET_CANVASCONTEXT', payload: canvasContext });
};

const setControls = (dispatch) => (controls) => {
  dispatch({ type: 'SET_CONTROLS', payload: controls });
};

const setIsLoading = (dispatch) => () => {
  dispatch({ type: 'SET_ISLOADING' });
};

export const { Context: GameContext, Provider: GameProvider } =
  createDataContext(
    gameReducer,
    {
      setMap,
      setSound,
      setPlayer,
      setGame,
      setCamera,
      setCanvasContext,
      setControls,
      setIsLoading,
    },
    {
      isLoading: true,
      map: null,
      sound: null,
      player: null,
      game: null,
      camera: null,
      canvasContext: null,
      controls: null,
    }
  );
