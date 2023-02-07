import { createContext, useContext, useState } from "react";
import Coordinates from "../models/Coordinates";
import GameState from "../models/GameState";

interface GameStateContext {
    gameState: GameState
    setGameState: (gameState: GameState) => void
}

const DEFAULT_PATH_TILES: Coordinates[] = [
    { x: 0, z: 2 },
    { x: 1, z: 2 },
    { x: 1, z: 1 },
    { x: 2, z: 1 },
    { x: 3, z: 1 },
    { x: 4, z: 1 },
]

const maxX = DEFAULT_PATH_TILES.reduce((max, tile) => Math.max(max, tile.x), 0);
const maxZ = DEFAULT_PATH_TILES.reduce((max, tile) => Math.max(max, tile.z), 0);

const DEFAULT_GAME_STATE: GameState = {
    level: {
        pathTiles: DEFAULT_PATH_TILES,
        maxX,
        maxZ,
    },
    forcedLocation: DEFAULT_PATH_TILES[0],
    masterState: 'ready',
    instructionPointer: 0,
    instructions: []
}

const gameStateContext = createContext<GameStateContext>({
    gameState: DEFAULT_GAME_STATE,
    setGameState: () => { },
});

export function useGameState() {
    return useContext(gameStateContext)
}

export function GameStateProvider({ children }: any) {
    const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE)

    const value: GameStateContext = {
        gameState,
        setGameState
    }

    return (
        <gameStateContext.Provider value={value} >
            {children}
        </gameStateContext.Provider>
    )
}