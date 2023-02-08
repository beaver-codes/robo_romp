import { InstructionTarget } from "./InstructionTarget";

export type InstructionType = 'go' | 'turnLeft' | 'turnRight';

export default interface Instruction {
    type: InstructionType;
    target: InstructionTarget
}