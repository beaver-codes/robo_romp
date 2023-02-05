import { Canvas } from '@react-three/fiber';
import "./App.css"
import { Environment, OrbitControls } from '@react-three/drei'
import Floor from './components/Floor';
import Lights from './Lights';
import DevHelpers from './DevHelpers';
import { useGameState } from './contexts/GameStateContext';



const App = () => {
  const { gameState } = useGameState();
  const maxX = gameState.maxX;

  const xCenter = maxX / 2;
  return (
    <Canvas camera={{ position: [xCenter, 5, 5], }}>
      <Environment preset="studio" background />

      <Lights />

      <Floor />

      <OrbitControls target={[xCenter, 0, 0]} />
      <DevHelpers />
    </Canvas>
  );
};

export default App;