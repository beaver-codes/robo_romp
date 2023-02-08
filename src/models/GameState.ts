import Coordinates from "./Coordinates";
import Instruction from "./Instruction";
import Level from "./Level";


export type MasterState = 'ready' | 'running';

export type Direction = 'N' | 'E' | 'S' | 'W';

export default interface GameState {
    level: Level;
    forcedLocation: Coordinates;
    forcedDirection: Direction;
    masterState: MasterState;

    instructionPointer: number
    instructions: Instruction[];
}

