import {
  BOARD_WIDTH, BOARD_HEIGHT, BOARD_COLOR,
  BOARD_UNIT, FOOD_COLOR, SNAKE_COLOR, DEFAULT_DIRECTION,
} from './constants';

// config which acts as the initalizing options for the board
export const boardConfig = {
  width: BOARD_WIDTH,
  height: BOARD_HEIGHT,
  color: BOARD_COLOR,
  unit: BOARD_UNIT,
  direction: DEFAULT_DIRECTION,
};

// config which acts as the initalizing options for the food
export const foodConfig = {
  color: FOOD_COLOR,
};

// config which acts as the initalizing options for the snake
export const snakeConfig = {
  color: SNAKE_COLOR,
};
