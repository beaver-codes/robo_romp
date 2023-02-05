import { Canvas } from '@react-three/fiber';
import "./App.css"
import { Environment } from '@react-three/drei'
import Floor from './components/Floor';
import Lights from './Lights';
import DevHelpers from './DevHelpers';



const App = () => {
  return (
    <Canvas camera={{ position: [2.5, 3, 7] }}>
      <Environment preset="studio" background />

      <Lights />

      <Floor />

      <DevHelpers />
    </Canvas>
  );
};

export default App;