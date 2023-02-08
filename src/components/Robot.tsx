import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import { COLORS } from '../constants';
import { useGameState } from '../contexts/GameStateContext';
import { adjustRobot } from '../utils/control';

const FLOOR_HEIGHT = 0.4;
const ROUND_HEIGHT = 0.5;


export default function Robot() {
    const { gameState, setGameState } = useGameState();
    const groupRef = useRef<THREE.Group>(null);
    const resetLocation = gameState.forcedLocation;

    useFrame((_, delta) => {
        if (groupRef.current && gameState.masterState === 'running') {
            const finished = adjustRobot(gameState, groupRef.current, delta);

            if (finished) {
                setGameState({ ...gameState, instructionPointer: gameState.instructionPointer + 1 });
            }
        }
    })

    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.position.x = resetLocation.x;
            groupRef.current.position.z = resetLocation.z;
        }
    }, [resetLocation]);


    return (
        <group position={[resetLocation.x, ROUND_HEIGHT + FLOOR_HEIGHT, resetLocation.z]} ref={groupRef}>

            <mesh castShadow={true}>
                <sphereGeometry args={[ROUND_HEIGHT]} />
                <meshPhongMaterial color={COLORS.BOT_COLOR} />
            </mesh>
            <mesh position={[0, 0.5, 0]} castShadow={true}>
                <sphereGeometry args={[ROUND_HEIGHT / 2]} />
                <meshPhongMaterial color={COLORS.BOT_COLOR} />
            </mesh>
            <mesh position={[0.2, 0.6, 0]} castShadow={true} rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[ROUND_HEIGHT / 7, ROUND_HEIGHT / 9, 0.2]} />
                <meshPhongMaterial color={COLORS.BOT_EYE_COLOR} />
            </mesh>
            <pointLight position={[0.4, 0.6, 0]} color={COLORS.BOT_EYE_COLOR} intensity={5} />
        </group>
    )
}
