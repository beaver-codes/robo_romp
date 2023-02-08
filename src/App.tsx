import { Canvas } from '@react-three/fiber';
import "./App.css"
import { Environment, OrbitControls } from '@react-three/drei'
import Floor from './components/Floor';
import Lights from './Lights';
import { GameStateProvider, useGameState } from './contexts/GameStateContext';
import Robot from './components/Robot';
import Indicator from './components/Indicator';
import HUD from './components/HUD';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useEffect } from 'react';
import { playSound } from './utils/sounds';


const App = () => {
  const { gameState } = useGameState();
  const maxX = gameState.level.maxX;

  useEffect(() => {
    const startMusic = () => {
      playSound('ambient', { loop: true, volume: 0.03 });
      document.getElementById('root')?.removeEventListener('click', startMusic);
    }
    document.getElementById('root')?.addEventListener('click', startMusic);
  }, [])

  const xCenter = maxX / 2;
  return (
    <GameStateProvider>

      <Canvas camera={{ position: [xCenter, 5, 5], }} shadows>
        <Environment preset="studio" background />

        <Lights />
        <Robot />
        <Floor />
        <Indicator location={{ x: 0, z: gameState.level.maxZ + 2 }} />

        <OrbitControls target={[xCenter, 0, 0]} />
        {/* <DevHelpers /> */}
      </Canvas>
      <HUD />
    </GameStateProvider>
  );
};

export default App;