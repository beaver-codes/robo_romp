import Coordinates from "./Coordinates";
import Instruction from "./Instruction";
import Level from "./Level";


export type MasterState = 'ready' | 'running';
export default interface GameState {
    level: Level;
    forcedLocation: Coordinates;
    masterState: MasterState;

    instructionPointer: number
    instructions: Instruction[];
}

