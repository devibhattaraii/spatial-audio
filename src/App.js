import logo from './logo.svg';
import './App.css';

import { GameProvider } from './contexts/GameContext';

import SpatialAudio from './components/SpatialAudio.jsx'


function App() {
  return (
    <GameProvider>
      < Game />
    </GameProvider>
  )


}

export default App;
