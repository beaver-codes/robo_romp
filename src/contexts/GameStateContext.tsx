import { createContext, useContext, useState } from "react";
import Coordinates from "../models/Coordinates";
import GameState from "../models/GameState";

interface GameStateContext {
    gameState: GameState
    setGameState: (gameState: GameState) => void
    changeLevel: (gameState: GameState) => void
}

const LEVELS: Coordinates[][] = [
    [
        { x: 0, z: 2 },
        { x: 1, z: 2 },
        { x: 1, z: 1 },
        { x: 2, z: 1 },
        { x: 3, z: 1 },
        { x: 4, z: 1 },
    ],
    [
        { x: 0, z: 2 },
        { x: 1, z: 2 },
        { x: 1, z: 1 },
        { x: 1, z: 3 },
        { x: 1, z: 4 },
        { x: 2, z: 4 },
        { x: 3, z: 4 },
        { x: 4, z: 4 },
        { x: 4, z: 3 },
        { x: 4, z: 2 },
        { x: 4, z: 1 },
        { x: 4, z: 0 },
    ],
    [
        { x: 0, z: 2 },
        { x: 1, z: 2 },
        { x: 1, z: 1 },
        { x: 1, z: 3 },
        { x: 1, z: 4 },
        { x: 2, z: 4 },
        { x: 3, z: 4 },
        { x: 4, z: 4 },
        { x: 4, z: 3 },
        { x: 4, z: 2 },
        { x: 4, z: 1 },
        { x: 3, z: 1 },
        { x: 2, z: 1 },
        { x: 4, z: 5 },
    ],
    [
        { x: 0, z: 1 },
        { x: 1, z: 1 },
        { x: 1, z: 1 },
        { x: 2, z: 1 },
        { x: 3, z: 1 },
        { x: 4, z: 1 },
        { x: 5, z: 1 },
        { x: 5, z: 2 },
        { x: 5, z: 3 },
        { x: 4, z: 3 },
        { x: 3, z: 3 },
        { x: 2, z: 3 },
        { x: 1, z: 3 },
        { x: 0, z: 3 },
    ],
]


const DEFAULT_PATH_TILES = LEVELS[0];

const maxX = DEFAULT_PATH_TILES.reduce((max, tile) => Math.max(max, tile.x), 0);
const maxZ = DEFAULT_PATH_TILES.reduce((max, tile) => Math.max(max, tile.z), 0);

const DEFAULT_GAME_STATE: GameState = {
    level: {
        pathTiles: DEFAULT_PATH_TILES,
        maxX,
        maxZ,
    },
    forcedLocation: DEFAULT_PATH_TILES[0],
    forcedDirection: 'E',
    masterState: 'ready',
    instructionPointer: 0,
    instructions: []
}

const gameStateContext = createContext<GameStateContext>({
    gameState: DEFAULT_GAME_STATE,
    setGameState: () => { },
    changeLevel: () => { }
});

export function useGameState() {
    return useContext(gameStateContext)
}

export function GameStateProvider({ children }: any) {
    const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE)

    const changeLevel = (newGameState: GameState) => {
        const randomIx = Math.floor(Math.random() * LEVELS.length);
        const pathTiles = LEVELS[randomIx];
        const maxX = pathTiles.reduce((max, tile) => Math.max(max, tile.x), 0);
        const maxZ = pathTiles.reduce((max, tile) => Math.max(max, tile.z), 0);
        setGameState({
            ...newGameState,
            level: {
                pathTiles,
                maxX,
                maxZ,
            },
            forcedLocation: { ...pathTiles[0] },
        });
    }

    const value: GameStateContext = {
        gameState,
        setGameState,
        changeLevel,
    }

    return (
        <gameStateContext.Provider value={value} >
            {children}
        </gameStateContext.Provider >
    )
}