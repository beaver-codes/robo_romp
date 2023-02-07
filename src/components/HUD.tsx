import React from 'react'
import { COLORS, INSTRUCTION_ICONS } from '../constants'
import { useGameState } from '../contexts/GameStateContext';
import Instruction, { InstructionType } from '../models/Instruction';

const instructionsToPick: InstructionType[] = ['turnLeft', 'go', 'turnRight'];

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
            forcedLocation: { ...gameState.level.pathTiles[0] },
            instructionPointer: 0,
        });
    }

    const addInstruction = (instructionType: InstructionType) => {
        const newInstruction: Instruction = {
            type: instructionType,

        }

        setGameState({
            ...gameState,
            instructions: [...gameState.instructions, newInstruction]
        });
    }


    return (
        <div className='hud ' style={{
            background: COLORS.PATH_COLOR,
            borderTop: `3px solid ${COLORS.BASE_COLOR}`,
        }}>
            <div className='hud-buttons rounded-end center' style={{
                background: COLORS.PATH_COLOR,
                border: `3px solid ${COLORS.BASE_COLOR}`,
            }}>

                <div className="p-2 rounded-end"
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
                <div className='p-2'>
                    <div className="btn-group">
                        {instructionsToPick.map(instructionType =>
                            <button className="btn btn-outline-primary"
                                key={instructionType}
                                onClick={() => addInstruction(instructionType)}
                            >
                                <i className={`bi ${INSTRUCTION_ICONS[instructionType]}`} />
                            </button>
                        )}
                    </div>
                </div>
            </div>


            <div className='p-3 pt-4'>

                {gameState.instructions.map((instruction, index) => {

                    return (<button key={index} className="mt-2 mx-1 btn btn-primary">
                        <i className={`bi ${INSTRUCTION_ICONS[instruction.type]}`} />
                    </button>)
                })}
                <button className='btn btn-outline-dark mt-2 mx-1' disabled={true}>
                    <i className={`bi bi-plus`} />
                </button>
            </div>
        </div >
    )
}
