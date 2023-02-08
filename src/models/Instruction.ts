import Coordinates from "./Coordinates";
import { Direction } from "./GameState";

export type InstructionType = 'go' | 'turnLeft' | 'turnRight';

export default interface Instruction {
    type: InstructionType;
    target: {
        location: Coordinates
        direction: Direction
    }
}