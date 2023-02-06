import Coordinates from "./Coordinates"

export default interface Level {
    pathTiles: Coordinates[]
    maxX: number
    maxZ: number
}