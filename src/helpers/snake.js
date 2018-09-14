import {
  KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN,
} from '../constants';


/**
 * getCurrentDirection function to get the current direction
 * as per the key code passed
 * @param {number} prevDirection - what was the previous direction
 * @param {number} keyCode - which arrow key was pressed
 * @returns {number} currentDirection - currentDirection in keyCode
 */
export const getCurrentDirection = (prevDirection, keyCode) => {
  let currentDirection = prevDirection;
  if (keyCode === KEY_LEFT && prevDirection !== KEY_RIGHT) {
    currentDirection = KEY_LEFT;
  } else if (keyCode === KEY_UP && prevDirection !== KEY_DOWN) {
    currentDirection = KEY_UP;
  } else if (keyCode === KEY_RIGHT && prevDirection !== KEY_LEFT) {
    currentDirection = KEY_RIGHT;
  } else if (keyCode === KEY_DOWN && prevDirection !== KEY_UP) {
    currentDirection = KEY_DOWN;
  }
  return currentDirection;
};


/**
 * getNewSnakeHead function to get the current snake head coords
 * as per the key code passed
 * @param {object} snakeHead - coords x, y of the snake head
 * @param {number} direction - direction the snake head is pointing in keycode
 * @returns {object} newSnakeHead - new coords in x,y for the snake head
 */
export const getNewSnakeHead = (snakeHead, direction) => {
  const newSnakeHead = { ...snakeHead };

  // determine next head position
  if (direction === KEY_LEFT) {
    newSnakeHead.x -= 1;
  } else if (direction === KEY_UP) {
    newSnakeHead.y -= 1;
  } else if (direction === KEY_RIGHT) {
    newSnakeHead.x += 1;
  } else if (direction === KEY_DOWN) {
    newSnakeHead.y += 1;
  }
  return newSnakeHead;
};
