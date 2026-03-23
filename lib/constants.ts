export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 720;

export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 70;
export const PLAYER_START_X = GAME_WIDTH / 2 - PLAYER_WIDTH / 2;
export const PLAYER_START_Y = GAME_HEIGHT - 120;
export const PLAYER_SPEED = 8;

export const ENEMY_WIDTH = 40;
export const ENEMY_HEIGHT = 70;
export const INITIAL_ENEMY_SPEED = 6;
export const ENEMY_SPAWN_INTERVAL = 1000; // ms
export const MAX_ENEMIES = 6;

export const ROAD_LINE_WIDTH = 6;
export const ROAD_LINE_HEIGHT = 40;
export const ROAD_LINE_GAP = 40;
export const NUM_ROAD_LINES = 5;

export const LANE_COUNT = 3;
export const LANE_WIDTH = GAME_WIDTH / LANE_COUNT;

export const SPEED_INCREMENT = 0.0015;
export const SCORE_PER_FRAME = 1;

export const ENEMY_COLORS = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#10B981", // green
  "#F59E0B", // amber
  "#06B6D4", // cyan
];
