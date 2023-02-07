import { useFrame } from '@react-three/fiber'
import React from 'react'
import { Mesh } from 'three'
import { useGameState } from '../contexts/GameStateContext'
import Coordinates from '../models/Coordinates'

interface Props {
    location: Coordinates
}

export default function Indicator(props: Props) {
    const { x, z } = props.location
    const { gameState } = useGameState();
    const isRunning = gameState.masterState === 'running';
    const startRef = React.useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (startRef.current && isRunning) {
            startRef.current.rotation.y += -3 * delta;
        }
    })

    return (
        <group position={[x - 0.25, 0.25, z]}>
            <mesh
                ref={startRef}
            >
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshPhongMaterial color={isRunning ? "orange" : 'green'} />
            </mesh>

        </group>
    )
}
