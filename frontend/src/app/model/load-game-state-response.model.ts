export interface Position {
  x: number;
  y: number;
}

export enum TileType {
  WALL = 'WALL',
  FLOOR = 'FLOOR',
  GOAL = 'GOAL',
  UNKNOWN = 'UNKNOWN',
}

export interface Player {
  position: Position;
  hp: number;
}

export interface Monster {
  id: string;
  position: Position;
  type: string;
  isDead: boolean;
}

export enum GameStatus {
  PLAYING = 'PLAYING',
  WON = 'WON',
  GAME_OVER = 'GAME_OVER',
}

export interface GameState {
  width: number;
  height: number;
  status: GameStatus;
  grid: TileType[][];
  player: Player;
  monsters: Monster[];
}
