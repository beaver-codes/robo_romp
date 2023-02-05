import { Canvas } from '@react-three/fiber';
import "./App.css"
import { Environment, OrbitControls } from '@react-three/drei'
import Floor from './components/Floor';



const App = () => {
  return (
    <Canvas >
      <Environment preset="studio" background />

      <directionalLight position={[0, 10, 4]} intensity={1} />
      <ambientLight intensity={0.1} />

      <Floor />

      <OrbitControls />
      <gridHelper />
      <axesHelper />
    </Canvas>
  );
};

export default App;