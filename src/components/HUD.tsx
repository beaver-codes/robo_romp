import React, { useEffect, useState } from 'react'
import { COLORS, INSTRUCTION_ICONS } from '../constants'
import { useGameState } from '../contexts/GameStateContext';
import GameState from '../models/GameState';
import { InstructionType } from '../models/Instruction';
import { generateNewInstruction, updateTargets } from '../utils/control';
import { playSound, stopSound } from '../utils/sounds';
import FinishModal from './FinishModal';

const instructionsToPick: InstructionType[] = ['turnLeft', 'go', 'turnRight'];

export default function HUD() {
    const { gameState, setGameState } = useGameState();
    const [showFinishModal, setShowFinishModal] = useState(false);
    const isRunning = gameState.masterState === 'running';
    const instructionPointer = gameState.instructionPointer;


    useEffect(() => {
        if (instructionPointer > 0) {
            const reachedLocation = gameState.instructions[instructionPointer - 1].target.location;
            const finish = gameState.level.pathTiles[gameState.level.pathTiles.length - 1];
            if (reachedLocation.x === finish.x && reachedLocation.z === finish.z) {
                setGameState({ ...gameState, masterState: 'finished' });
                playSound('obstacle', { volume: 0.4 })
                setShowFinishModal(true);
                return;
            }
        }
        if (!gameState.instructions.length) {
            return;
        }

        if (instructionPointer >= gameState.instructions.length) {
            setGameState({ ...gameState, masterState: 'stopped' });
            playSound('obstacle', { volume: 0.4 })
            return;
        }
        if (!gameState.instructions[instructionPointer].target.valid) {
            setGameState({ ...gameState, masterState: 'stopped' });
            playSound('obstacle', { volume: 0.4 })
            return;
        }

        // eslint-disable-next-line
    }, [instructionPointer])

    useEffect(() => {
        if (gameState.masterState === 'running') {
            playSound('move', { loop: true, volume: 0.6 });
        } else {
            stopSound('move');
        }
    }, [gameState.masterState]);


    const onFinished = () => {
        const newGameState = getRestartState();
        newGameState.instructions = [];
        setGameState(newGameState);

        setShowFinishModal(false);
    }

    const getRestartState = (): GameState => {
        return {
            ...gameState,
            masterState: 'ready',
            forcedLocation: { ...gameState.level.pathTiles[0] },
            forcedDirection: 'E',
            instructionPointer: 0,
        }
    }

    const handleStart = () => {
        if (gameState.instructions.length === 0) {
            return;
        }

        if (gameState.masterState === 'stopped' || gameState.masterState === 'finished') {
            const newGameState = getRestartState();
            setGameState(newGameState)
            return;
        }

        setGameState({ ...gameState, masterState: isRunning ? 'paused' : 'running' });
    }

    const handleRestart = () => {
        setGameState(getRestartState());
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

    const disbaleInstructionChange = gameState.masterState !== 'ready';

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
                        className={`btn btn-lg btn-${isRunning ? 'warning' : 'success'}`}
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
                            <button className="btn btn-primary btn-lg "
                                key={instructionType}
                                onClick={() => addInstruction(instructionType)}
                                disabled={disbaleInstructionChange}
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
                    let classes = 'mt-2 p-2';
                    if (processed) {
                        classes += ' bg-success';
                    }
                    if (index === gameState.instructionPointer) {
                        if (instruction.target.valid) {
                            classes += ' bg-warning';
                        } else {
                            classes += ' bg-danger';
                        }
                    }

                    return (
                        <div key={index} className={classes}>
                            <button className="btn btn-outline-primary"
                                onClick={() => removeInstruction(index)}
                                style={{ background: COLORS.PATH_COLOR }}
                                disabled={disbaleInstructionChange}
                            >
                                <i className={`bi ${INSTRUCTION_ICONS[instruction.type]}`} />
                            </button>
                        </div>)
                })}
                {gameState.instructions.length === 0 && <div className='mt-2 p-2'>

                    <button className='btn btn-outline-dark ' disabled={true}>
                        <i className={`bi bi-patch-question-fill`} />
                    </button>
                </div>}
            </div>

            <FinishModal show={showFinishModal} onHide={onFinished} />
        </div >
    )
}
