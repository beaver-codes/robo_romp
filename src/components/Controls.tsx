import { useFrame } from '@react-three/fiber'
import React from 'react'
import { useGameState } from '../contexts/GameStateContext'
import Coordinates from '../models/Coordinates'

interface Props {
    location: Coordinates
}

export default function Controls(props: Props) {
    const { x, z } = props.location
    const { gameState, setGameState } = useGameState();
    const isRunning = gameState.masterState === 'running';
    const groupRef = React.useRef<THREE.Group>(null);

    console.log('s', isRunning)
    useFrame((_, delta) => {
        if (groupRef.current && isRunning) {
            groupRef.current.rotation.y += -3 * delta;
        }
    })

    const handleStart = () => {
        console.log('start')
        setGameState({ ...gameState, masterState: isRunning ? 'ready' : 'running' });
    }

    return (
        <group ref={groupRef} position={[x - 0.25, 0.25, z]}>
            <mesh
                onClick={handleStart}
            >
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshPhongMaterial color={isRunning ? "orange" : 'green'} />
            </mesh>
        </group>
    )
}
