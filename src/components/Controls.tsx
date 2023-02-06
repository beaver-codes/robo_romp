import { useFrame } from '@react-three/fiber'
import React from 'react'
import { Mesh } from 'three'
import { useGameState } from '../contexts/GameStateContext'
import Coordinates from '../models/Coordinates'

interface Props {
    location: Coordinates
}

export default function Controls(props: Props) {
    const { x, z } = props.location
    const { gameState, setGameState } = useGameState();
    const isRunning = gameState.masterState === 'running';
    const startRef = React.useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (startRef.current && isRunning) {
            startRef.current.rotation.y += -3 * delta;
        }
    })

    const handleStart = () => {
        setGameState({ ...gameState, masterState: isRunning ? 'ready' : 'running' });
    }

    const handleRestart = () => {
        setGameState({
            ...gameState,
            masterState: 'ready',
            robot: { forcedLocation: { ...gameState.level.pathTiles[0] } }
        });
    }

    return (
        <group position={[x - 0.25, 0.25, z]}>
            <mesh
                ref={startRef}
                onClick={handleStart}
            >
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshPhongMaterial color={isRunning ? "orange" : 'green'} />
            </mesh>
            <mesh
                position={[0.9, 0, 0]}
                onClick={handleRestart}
            >
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshPhongMaterial color={'red'} />
            </mesh>
        </group>
    )
}
