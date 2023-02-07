import Coordinates from "./Coordinates";

export type InstructionType = 'go' | 'turnLeft' | 'turnRight';

export default interface Instruction {
    type: InstructionType;
    target?: {
        location?: Coordinates
    }
}