import Level from "./Level";
import { RobotState } from "./RobotState";

export default interface GameState {
    level: Level;
    robot: RobotState;
}

