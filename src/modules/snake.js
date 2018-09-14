import _merge from 'lodash/merge';
import {
  SNAKE_COLOR, SNAKE_HEAD_COLOR, DEFAULT_DIRECTION, SNAKE_MARKER,
} from '../constants';
import Board from './board';
import { getCurrentDirection, getNewSnakeHead } from '../helpers/snake';

/**
 * Weakmap for maintaining internal state.
 */
const privates = new WeakMap();

// TODO - generate this dynamically
const initialSnakeBody = [
  {
    x: 2,
    y: 2,
  },
  {
    x: 1,
    y: 2,
  },
  {
    x: 0,
    y: 2,
  },
];
const getInitialSnakeBody = () => initialSnakeBody;


/**
 * drawBody function to draw the body of the snake
 * @param {array} snakeBody - array containing the {x, y} coords
 */
function drawBody(snakeBody) {
  const { color, headColor } = privates.get(this);
  // draw only the body
  snakeBody.forEach((cell, idx) => {
    const drawColor = (idx === 0) ? headColor : color;
    Board.drawUnit(cell.x, cell.y, drawColor, SNAKE_MARKER);
  });
}

/**
 * clearTail function to clear the tail of the snake
 */
function clearTail() {
  const { tail } = privates.get(this);
  Board.clearUnit(tail.x, tail.y);
}

/**
 * draw function to draw the actual snake
 * @param {array} snakeBody - array containing the {x, y} coords
 * @param {boolean} isCaptureMove - true or false if the move was a food capture one
 */
function draw(snakeBody, isCaptureMove) {
  // 1st draw the body
  drawBody.call(this, snakeBody);

  // clear tail, only if non-capturing move
  if (!isCaptureMove) {
    clearTail.call(this);
  }
}

/**
 * init function to initialize the state for Snake
 * @param {object} options - config for board to be passed
 * @param {string} options.headColor - color of the head of the snake
 * @param {string} options.color - color of the snake
 */
function init(options) {
  const { color = SNAKE_COLOR, headColor = SNAKE_HEAD_COLOR } = options;
  privates.set(this, {
    color,
    headColor,
    snakeBody: getInitialSnakeBody(),
    tail: {
      x: null,
      y: null,
    },
    direction: DEFAULT_DIRECTION,
    score: 0,
  });
}


/**
 * create function to create a snake from the initial body
 */
function create() {
  const { snakeBody } = privates.get(this);
  // TODO - get some suitable position fron the board
  drawBody.call(this, snakeBody);
}

/**
 * destroy function to kill the snake which tells board to end
 */
function destroy() {
  Board.endBoard();
}


/**
 * move function to move the snake 1 unit next
 * @param {object} options - config for board to be passed
 * @param {boolean} options.isCaptureMove - if food was captured in the move
 */
function move({ isCaptureMove }) {
  const privateProperties = privates.get(this);
  const { snakeBody, direction } = privateProperties;
  let { score, tail } = privateProperties;

  const currentSnakeHead = snakeBody[0];
  const { x, y } = getNewSnakeHead(currentSnakeHead, direction);

  // insert the new coordinates to the 'head'
  snakeBody.unshift({ x, y });

  if (isCaptureMove) {
    // dont't remove the tail, increment score if it's a capture move
    console.log('Food captured....!!!');
    score += 1;
  } else {
    // remove the tail from the body and update the same in state
    tail = snakeBody.pop();
  }
  privates.set(this, _merge({}, privateProperties, { snakeBody, tail, score }));
  draw.call(this, snakeBody, isCaptureMove);
}


/**
 * setDirection function to set the direction of the snake
 * @param {number} vector - direction in terms of arrow key code
 */
function setDirection(vector) {
  const privateProperties = privates.get(this);
  const prevDirection = privateProperties.direction;
  const currentDirection = getCurrentDirection(prevDirection, vector);
  const newPrivateProperties = _merge({}, privateProperties, { direction: currentDirection });
  privates.set(this, newPrivateProperties);
}


/**
 * getHeadPosition function to get the current head position of the snake
 * @returns {object} coord x,y of snake
 */
function getHeadPosition() {
  const { snakeBody } = privates.get(this);
  return snakeBody[0];
}


/**
 * getScore function to get the current score of the snake
 * @returns {number} score of snake
 */
function getScore() {
  const { score } = privates.get(this);
  return score;
}


/**
 * isSuicidalMove function to detect self collision
 * @returns {boolean} true or false if collision happened
 */
function isSuicidalMove() {
  const { snakeBody, direction } = privates.get(this);
  const currentSnakeHead = snakeBody[0];
  const newSnakeHead = getNewSnakeHead(currentSnakeHead, direction);
  const matrixPositionStatus = Board.getMatrixPositionStatus(newSnakeHead.x, newSnakeHead.y);
  const isSuicidal = matrixPositionStatus === SNAKE_MARKER;
  return isSuicidal;
}


/**
 * isValidBoardMove function to detect if the move is a valid board move
 * @returns {boolean} true or false if collision happened
 */
function isValidBoardMove() {
  const { snakeBody, direction } = privates.get(this);
  const { x, y } = snakeBody[0];
  const isValidMove = Board.isValidBoardPosition(x, y, direction);
  return isValidMove;
}


const Snake = Object.freeze({
  init,
  create,
  destroy,
  move,
  setDirection,
  getHeadPosition,
  getScore,
  isSuicidalMove,
  isValidBoardMove,
});

export default Snake;
