import Coordinates from "./Coordinates"
import { Direction } from "./GameState"

export interface InstructionTarget {
    location: Coordinates
    direction: Direction
    valid: boolean
}
