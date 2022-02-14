import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';

import CanvasContext from './contexts/CanvasContext';
import Game from './components/Game';
import store from './redux/store';

const App = () => {
  const [canvasContext, setCanvasContext] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setCanvasContext(canvas.getContext('2d'));
    }
  }, []);

  return (
    <Provider store={store}>
      <CanvasContext.Provider value={canvasContext}>
        <canvas ref={canvasRef} width="1" height="1" id="canvas" />
        <Game />
      </CanvasContext.Provider>
    </Provider>
  );
};

export default App;
