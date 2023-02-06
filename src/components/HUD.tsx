import React from 'react'
import { COLORS } from '../constants'
import { useGameState } from '../contexts/GameStateContext';

export default function HUD() {

    const { gameState, setGameState } = useGameState();
    const isRunning = gameState.masterState === 'running';

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
        <div className='hud ' style={{
            background: COLORS.PATH_COLOR,
            borderTop: `3px solid ${COLORS.BASE_COLOR}`,
        }}>
            <div className="hud-buttons p-2 rounded-end"
                style={{
                    background: COLORS.BASE_COLOR,
                }}>
                <button
                    className={`btn btn-${isRunning ? 'warning' : 'success'}`}
                    onClick={handleStart}>
                    <i className={`bi ${isRunning ? 'bi-pause-fill' : 'bi-play-fill'}`} />
                </button>
                <button
                    className={`btn btn-danger ms-2`}
                    onClick={handleRestart}>
                    <i className={`bi  bi-backspace-fill`} />
                </button>
            </div>
            <div className='p-3 pt-4'>
                <button className="btn btn-success">
                    TODO
                </button>
            </div>
        </div>
    )
}
