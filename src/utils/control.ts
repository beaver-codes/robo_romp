import { Group } from "three";
import GameState, { Direction } from "../models/GameState";
import Instruction, { InstructionType } from "../models/Instruction";

const MOVEMENT_SPEED = 1;
const TURNING_SPEED = 1.5;
const TARGET_ROTATION: Record<Direction, number> = {
    E: 0,
    N: Math.PI * 0.5,
    S: Math.PI * 1.5,
    W: Math.PI
}


export const generateNewInstruction = (gameState: GameState, instructionType: InstructionType): Instruction => {
    const newInstruction: Instruction = {
        type: instructionType,
        target: {
            location: { x: 0, z: 0 },
            direction: 'N'
        }
    }

    let currentCoordinates = gameState.forcedLocation;
    let currentDirection = gameState.forcedDirection;
    if (gameState.instructions.length) {
        const lastInstruction = gameState.instructions[gameState.instructions.length - 1];
        currentCoordinates = lastInstruction.target?.location || currentCoordinates;
        currentDirection = lastInstruction.target?.direction || currentDirection;
    }

    switch (instructionType) {
        case 'go':
            newInstruction.target.location.x = currentCoordinates.x + (currentDirection === 'E' ? 1 : currentDirection === 'W' ? -1 : 0);
            newInstruction.target.location.z = currentCoordinates.z + (currentDirection === 'S' ? 1 : currentDirection === 'N' ? -1 : 0);
            newInstruction.target.direction = currentDirection;
            break;
        case 'turnLeft':
        case 'turnRight':
            newInstruction.target.location = { ...currentCoordinates };
            newInstruction.target.direction = instructionType === 'turnLeft' ? _turnLeft(currentDirection) : _turnRight(currentDirection);
            break;
        default:
            console.error(`Unknown instruction type: ${instructionType}`)

    }
    return newInstruction
}

const _turnLeft = (direction: Direction): Direction => {
    switch (direction) {
        case 'N':
            return 'W';
        case 'E':
            return 'N';
        case 'S':
            return 'E';
        case 'W':
            return 'S';
        default:
            console.error(`Unknown direction: ${direction}`)
            return 'N';
    }
}

const _turnRight = (direction: Direction): Direction => {
    switch (direction) {
        case 'N':
            return 'E';
        case 'E':
            return 'S';
        case 'S':
            return 'W';
        case 'W':
            return 'N';
        default:
            console.error(`Unknown direction: ${direction}`)
            return 'N';
    }
}

export const adjustRobot = (gameState: GameState, robotRef: Group, delta: number): boolean => {
    if (gameState.instructionPointer >= gameState.instructions.length) {
        return false;
    }
    const currentInstruction = gameState.instructions[gameState.instructionPointer];

    if (currentInstruction.type === 'go') {
        return adjustRobotGo(gameState, currentInstruction, robotRef, delta);
    } else if (currentInstruction.type === 'turnLeft' || currentInstruction.type === 'turnRight') {
        return adjustRobotTurn(gameState, currentInstruction, robotRef, delta);
    }

    console.error(`Unknown instruction type: ${currentInstruction.type}`)

    // groupRef.current.position.x += 0.4 * delta;
    return false;
}

export const adjustRobotGo = (gameState: GameState, currentInstruction: Instruction, robotRef: Group, delta: number): boolean => {
    const adjustment = MOVEMENT_SPEED * delta;
    let direction: Direction = gameState.forcedDirection;
    if (gameState.instructionPointer > 0) {
        direction = gameState.instructions[gameState.instructionPointer - 1].target.direction;
    }


    const relevantCoordinate = direction === 'N' || direction === 'S' ? 'z' : 'x';
    const currentCoordinates = robotRef.position[relevantCoordinate];
    const targetCoordinates = currentInstruction.target.location[relevantCoordinate];

    const distanceToTarget = Math.abs(targetCoordinates - currentCoordinates);
    if (distanceToTarget < adjustment) {
        robotRef.position[relevantCoordinate] = targetCoordinates;
        return true;
    } else {
        robotRef.position[relevantCoordinate] += adjustment * (targetCoordinates > currentCoordinates ? 1 : -1);
    }

    return false;
}

export const adjustRobotTurn = (gameState: GameState, currentInstruction: Instruction, robotRef: Group, delta: number): boolean => {


    const adjustment = TURNING_SPEED * delta * (currentInstruction.type === 'turnLeft' ? 1 : -1);

    const current = robotRef.rotation.y;
    const target = TARGET_ROTATION[currentInstruction.target.direction];

    const distanceToTarget = Math.abs(target - current);
    if (distanceToTarget < Math.abs(adjustment)) {
        robotRef.rotation.y = target;
        return true;
    }

    const newRotation = current + adjustment;
    if (newRotation < 0) {
        robotRef.rotation.y = Math.PI * 2 + newRotation;
    } else if (newRotation > Math.PI * 2) {
        robotRef.rotation.y = newRotation - Math.PI * 2;
    } else {
        robotRef.rotation.y = newRotation;
    }
    return false;
}
