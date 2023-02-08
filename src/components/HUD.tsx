import React from 'react'
import { COLORS, INSTRUCTION_ICONS } from '../constants'
import { useGameState } from '../contexts/GameStateContext';
import { InstructionType } from '../models/Instruction';
import { generateNewInstruction, updateTargets } from '../utils/control';

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
            forcedDirection: 'E',
            instructionPointer: 0,
        });
    }

    const addInstruction = (instructionType: InstructionType) => {
        setGameState({
            ...gameState,
            instructions: [...gameState.instructions, generateNewInstruction(gameState, instructionType)]
        });
    }

    const removeInstruction = (index: number) => {
        const newInstructions = [...gameState.instructions];
        newInstructions.splice(index, 1);

        updateTargets(gameState, newInstructions);

        setGameState({
            ...gameState,
            instructions: newInstructions
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


            <div className='p-3 pt-4 d-flex'>

                {gameState.instructions.map((instruction, index) => {
                    const processed = index < gameState.instructionPointer;
                    let classes = 'mt-2  p-2';
                    if (processed) {
                        classes += ' bg-success';
                    }
                    if (index === gameState.instructionPointer) {
                        classes += ' bg-warning';
                    }

                    return (
                        <div key={index} className={classes}>
                            <button className="btn btn-primary"
                                onClick={() => removeInstruction(index)}
                            >
                                <i className={`bi ${INSTRUCTION_ICONS[instruction.type]}`} />
                            </button>
                        </div>)
                })}
                <div className='mt-2 p-1'>

                    <button className='btn btn-outline-dark ' disabled={true}>
                        <i className={`bi bi-plus`} />
                    </button>
                </div>
            </div>
        </div >
    )
}
