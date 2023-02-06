import Level from "./Level";
import { RobotState } from "./RobotState";


export type MasterState = 'ready' | 'running';
export default interface GameState {
    level: Level;
    robot: RobotState;
    masterState: MasterState;
}

