/// COLORS

import { InstructionType } from "./models/Instruction";


export enum COLORS {
    PATH_COLOR = '#D6FFB7',
    BASE_COLOR = '#080357',
    BASE_LUGHTER_COLOR = '#0d6efd',
    BOT_COLOR = '#FF9F1C',
    BOT_EYE_COLOR = 'red',
}

export const INSTRUCTION_ICONS: Record<InstructionType, string> = {
    go: 'bi-arrow-up',
    turnLeft: 'bi-arrow-counterclockwise',
    turnRight: 'bi-arrow-clockwise',
}

