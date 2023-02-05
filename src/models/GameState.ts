import Coordinates from "./Coordinates";

export default interface GameState {
    pathTiles: Coordinates[]
    maxX: number
    maxZ: number
}