import _merge from 'lodash/merge';
import {
  BOARD_WIDTH, BOARD_HEIGHT, BOARD_COLOR, END_BOARD_COLOR,
  BOARD_UNIT, BOARD_EMPTY_MARKER,
  KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN,
} from '../constants';
import {
  createBoard, initMatrix, getBoardPosition, getCanvasPixelPosition, getRandomCoordinates,
} from '../helpers/board';

/**
 * Weakmap for maintaining internal state.
 */
const privates = new WeakMap();

/**
 * init function to initialize the state for Board
 * @param {object} options - config for board to be passed
 * @param {number} options.width - width of the board in pixels
 * @param {number} options.height - height of the board in pixels
 * @param {string} options.color - color of the board
 * @param {number} options.unit - unit of the board in pixels
 * @param {dom elem} parentEl - dom element to append the board
 */
function init(options, parentEl) {
  const {
    width = BOARD_WIDTH,
    height = BOARD_HEIGHT,
    color = BOARD_COLOR,
    unit = BOARD_UNIT,
  } = options;

  const board = createBoard(width, height, color);
  parentEl.appendChild(board);
  const ctx = board.getContext('2d');

  const matrix = initMatrix(Math.floor(width / unit), Math.floor(height / unit));
  const { boardX, boardY } = getBoardPosition(width, height, unit);
  privates.set(this, {
    board,
    ctx,
    unit,
    width: boardX,
    height: boardY,
    matrix,
  });
  console.log('The Board is Set!');
}


/**
 * drawUnit function to draw an unit of board on the canvas
 * @param {number} x - x coord in terms of unit
 * @param {number} y - y coord in terms of unit
 * @param {string} color - color of the unit to be drawn
 * @param {string} marker - character to mark the matrix for which type is drawn
 */
function drawUnit(x, y, color, marker) {
  const privateProperties = privates.get(this);
  const { ctx, unit } = privateProperties;
  const { matrix } = privateProperties;

  // mark the matrix
  const { canvasX, canvasY } = getCanvasPixelPosition(x, y, unit);

  matrix[x][y] = marker;
  privates.set(this, _merge({}, privateProperties, { matrix }));

  ctx.fillStyle = color;
  ctx.fillRect(canvasX, canvasY, unit, unit);
}


/**
 * clearUnit function to clear an unit of board on the canvas
 * @param {number} x - x coord in terms of unit
 * @param {number} y - y coord in terms of unit
 */
function clearUnit(x, y) {
  const privateProperties = privates.get(this);
  const { ctx, unit } = privateProperties;
  const { matrix } = privateProperties;

  // mark the matrix
  const { canvasX, canvasY } = getCanvasPixelPosition(x, y, unit);
  matrix[x][y] = BOARD_EMPTY_MARKER;
  privates.set(this, _merge({}, privateProperties, { matrix }));

  ctx.clearRect(canvasX, canvasY, unit, unit);
}


/**
 * getMatrixPositionStatus function to get what is the status at the x,y coord
 * it can be a food cell, snake cell or an empty cell
 * @param {number} x - x coord in terms of unit
 * @param {number} y - y coord in terms of unit
 * @returns {string} status of the matrix position at x, y
 */
function getMatrixPositionStatus(x, y) {
  const { matrix } = privates.get(this);
  return matrix[x][y];
}

/**
 * getRandomEmptyPosition function to get any empty cell on the board
 * it can be a food cell, snake cell or an empty cell
 * @returns {string} coord x, y of the empty cell
 */
function getRandomEmptyPosition() {
  const { width, height, matrix } = privates.get(this);
  let coords;

  do {
    coords = getRandomCoordinates({
      xMin: 0, xMax: width, yMin: 0, yMax: height,
    });
  } while (matrix[coords.x][coords.y] !== BOARD_EMPTY_MARKER);

  return coords;
}


/**
 * isValidBoardPosition function to get if valid move on board or not
 * @param {number} x - x coord in terms of unit
 * @param {number} y - y coord in terms of unit
 * @param {number} vector - direction in terms of Arrow key code
 * @returns {boolean} true or false whether a valid move on board
 */
function isValidBoardPosition(x, y, vector) {
  const { width, height } = privates.get(this);
  let validity = true;

  if (vector === KEY_LEFT && x <= 0) {
    validity = false;
  } else if (vector === KEY_RIGHT && x >= width - 1) { // last cell is matrix[width-1][*]
    validity = false;
  } else if (vector === KEY_UP && y <= 0) {
    validity = false;
  } else if (vector === KEY_DOWN && y >= height - 1) { // last cell is matrix[*][height-1]
    validity = false;
  }

  return validity;
}

/**
 * endBoard function to clear out the board
 */
function endBoard() {
  const { ctx, width, height } = privates.get(this);
  ctx.fillStyle = END_BOARD_COLOR;
  ctx.fillRect(0, 0, width * BOARD_UNIT, height * BOARD_UNIT);
}

// Public API for Board
const Board = Object.freeze({
  init,
  drawUnit,
  clearUnit,
  getMatrixPositionStatus,
  getRandomEmptyPosition,
  isValidBoardPosition,
  endBoard,
});


export default Board;
